pragma solidity >=0.4.21 <0.6.0;
pragma experimental ABIEncoderV2;

import "../interfaces/IDDAI.sol";
import "../interfaces/IMoneyMarket.sol";
import "openzeppelin-solidity/contracts/token/ERC777/ERC777.sol";
import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/math/Math.sol";

// TODO Implement user pushing/pulling funds from stack
// TODO Allow user to allow address to modify stack
// TODO Allow user to receive funds to stack

contract DDAI is IDDAI, ERC777 {

    using SafeMath for uint256;
    using Math for uint256;

    IERC20 public token;
    IMoneyMarket public moneyMarket;

    mapping(address => AccountData) public accountDataOf;
    mapping (address => mapping (address => bool)) stackPushAllowed;

    event DDAIMinted(address indexed _receiver, uint256 _amount, address indexed _operator);
    event DDAIRedeemed(address indexed _receiver, uint256 _amount, address indexed _operator);
    event RecipeAdded(address indexed _account, address indexed _receiver, uint256 _ratio, bytes _data, uint256 _index);
    event RecipeRemoved(address indexed _account, address indexed _receiver, uint256 _ratio, bytes _data, uint256 _index);
    event InterestClaimed(address indexed _receiver, uint256 _interestEarned);
    event StackDistributed(address indexed _receiver, uint256 _amount);

    struct AccountData {
        uint256 lastTokenPrice; // Last token price on which interest was claimed
        uint256 stack; // balance available for recipes
        Recipe[] recipes;
        uint256 totalRatio;
    }

    struct Recipe {
        address receiver;
        uint256 ratio;
        bytes data;
    }

    constructor(
        address _moneyMarket,
        address _token,
        string memory _name,
        string memory _symbol,
        address[] memory _operators
    )
    public
    ERC777(_name, _symbol, _operators) {
        token = IERC20(_token);
        moneyMarket = IMoneyMarket(_moneyMarket);
    }

    function mint(address _receiver, uint256 _amount) external {
        claimInterest(_receiver);
        // Pull underlying token
        require(token.transferFrom(_msgSender(), address(this), _amount), "DDAI.mint: TRANSFER_FAILED");
        // Approve money market to pull tokens
        token.approve(address(moneyMarket), _amount);
        // Mint money market tokens
        moneyMarket.mint(address(this), _amount);
        // Mint DDAI
        _mint(_msgSender(), _receiver, _amount, "", "");
        emit DDAIMinted(_receiver, _amount, _msgSender());
    }

    function redeem(address _receiver, uint256 _amount) external returns(uint256) {
        claimInterest(_msgSender());

        uint256 redeemAmount = _amount.min(_balanceOf(_msgSender()));
        _burn(_msgSender(), _msgSender(), redeemAmount, "", "");

        uint256 burnAmount = redeemAmount.mul(10**18).div(moneyMarket.tokenPrice());
        require(moneyMarket.burn(_receiver, burnAmount) >= redeemAmount - 1, "DDAI.redeem: MONEY_MARKET_NOT_LIQUID");

        emit DDAIRedeemed(_receiver, redeemAmount, _msgSender());

        return redeemAmount;
    }

    function addRecipe(address _receiver, uint256 _ratio, bytes memory _data) public returns(bool) {
        AccountData storage accountData = accountDataOf[_msgSender()];

        accountData.recipes.push(Recipe({
            receiver: _receiver,
            ratio: _ratio,
            data: _data
        }));

        accountData.totalRatio = accountData.totalRatio.add(_ratio);
        emit RecipeAdded(_msgSender(), _receiver, _ratio, _data, accountData.recipes.length - 1);
    }

    function removeRecipe(uint256 _index) external returns(bool) {
        AccountData storage accountData = accountDataOf[_msgSender()];

        Recipe storage recipe = accountData.recipes[_index];

        // Emit now data is still available
        emit RecipeRemoved(_msgSender(), recipe.receiver, recipe.ratio, recipe.data, _index);

        // Substract ratio of recipe from total recipe
        accountData.totalRatio = accountData.totalRatio.sub(accountData.recipes[_index].ratio);
        // Remove recipe from recipes array
        if(_index != accountData.recipes.length - 1 ) {
            accountData.recipes[_index] = accountData.recipes[accountData.recipes.length - 1];
        }

        accountData.recipes.length --;

        // If there are no recipes anymore set stack to zero
        if(accountData.recipes.length == 0) {
            accountData.stack = 0;
        }
    }

    function clearRecipes() public {
        AccountData storage accountData = accountDataOf[_msgSender()];
        accountData.recipes.length = 0;
        accountData.totalRatio = 0;
    }

    function setRecipes(address[] memory _receivers, uint256[] memory _ratios, bytes[] memory _data) public {
        clearRecipes();
        for(uint256 i = 0; i < _receivers.length; i ++) {
            addRecipe(_receivers[i], _ratios[i], _data[i]);
        }
    }

    function claimInterest(address _receiver) public {
        AccountData storage accountData = accountDataOf[_receiver];
        uint256 currentTokenPrice = moneyMarket.tokenPrice();
        uint256 interestEarned = getOutStandingInterest(_receiver);
        // If any recipe is set push interest to the stack
        if(accountData.recipes.length != 0) {
            accountData.stack = accountData.stack.add(interestEarned);
        }
        _mint(address(this), _receiver, interestEarned, "", "");
        accountData.lastTokenPrice = currentTokenPrice;

        emit InterestClaimed(_receiver, interestEarned);
    }

    // Claim interest move interest to DDAI token balance and pay the interest to the attached recipes
    function distributeStack(address _account) public {
        claimInterest(_account);
        AccountData storage accountData = accountDataOf[_account];
        emit StackDistributed(_account, accountData.stack);
        _payToRecipes(_account, accountData.stack);
    }

    function setStack(address _account, uint256 _amount) public {
        require(_msgSender() == _account || stackPushAllowed[_account][_msgSender()], "DDAI.pushToStack: NOT_ALLOWED");
        AccountData storage accountData = accountDataOf[_account];
        accountData.stack = _amount;
    }

    function setStackApproved(address _account, bool _allowed) external {
        stackPushAllowed[_msgSender()][_account] = true;
    }

    function _payToRecipes(address _account, uint256 _amount) internal returns(bool) {
        AccountData storage accountData = accountDataOf[_account];
        accountData.stack = accountData.stack.sub(_amount);
        if(accountData.recipes.length == 0) {
            return true;
        }

        for(uint256 i = 0;  i < accountData.recipes.length; i ++) {
            Recipe memory recipe = accountData.recipes[i];
            uint256 recipeAmount = _amount * recipe.ratio / accountData.totalRatio;
            _send(address(this), _account, recipe.receiver, recipeAmount, recipe.data, "", false);
        }

        return true;
    }

    function getRecipesOf(address _account) public view returns(Recipe[] memory recipes, uint256 totalRatio) {
        AccountData storage accountData = accountDataOf[_account];
        recipes = accountData.recipes;
        totalRatio = accountData.totalRatio;
    }

    function balanceOf(address _account) public view returns(uint256) {
        AccountData storage accountData = accountDataOf[_account];
        uint256 balance = _balanceOf(_account);
        if(accountData.stack >= balance) {
            return 0;
        }
        return (_balanceOf(_account) - accountDataOf[_account].stack);
    }

    function getTotalBalance(address _account) public view returns(uint256) {
        return _balanceOf(_account);
    }

    function getStack(address _account) public view returns(uint256) {
        return accountDataOf[_account].stack;
    }

    function getOutStandingInterest(address _account) public view returns(uint256) {
        AccountData storage accountData = accountDataOf[_account];
        return _balanceOf(_account).mul(moneyMarket.tokenPrice() - accountData.lastTokenPrice).div(10 ** 18);
    }

    function _balanceOf(address _account) internal view returns(uint256) {
        return super.balanceOf(_account);
    }

    function _move(
        address _operator,
        address _from,
        address _to,
        uint256 _amount,
        bytes memory _userData,
        bytes memory _operatorData
    )
        internal
    {
        claimInterest(_from);
        claimInterest(_to);
        super._move(_operator, _from, _to, _amount, _userData, _operatorData);
    }
}