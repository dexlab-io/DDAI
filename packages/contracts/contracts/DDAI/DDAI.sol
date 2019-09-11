pragma solidity >=0.4.21 <0.6.0;

import "../interfaces/IDDAI.sol";
import "../interfaces/IMoneyMarket.sol";
import "openzeppelin-solidity/contracts/token/ERC777/ERC777.sol";
import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "openzeppelin-solidity/contracts/GSN/GSNRecipient.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

// TODO Implement user pushing/pulling funds from stack
// TODO Allow user to allow address to modify stack
// TODO Allow user to receive funds to stack

contract DDAI is GSNRecipient, ERC777 {

    using SafeMath for uint256;

    IERC20 public token;
    IMoneyMarket public moneyMarket;

    mapping(address => AccountData) accountDataOf;

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
        // Pull underlying token
        require(token.transferFrom(_msgSender(), address(this), _amount), "DDAI.mint: TRANSFER_FAILED");
        // Approve money market to pull tokens
        token.approve(address(moneyMarket), _amount);
        // Mint money market tokens
        moneyMarket.mint(_receiver, _amount);
        // Mint DDAI
        _mint(_msgSender(), _receiver, _amount, "", "");
    }

    function burn(address _receiver, uint256 _amount) external {
        claimInterest(_receiver);
        // Burn DDAI token
        _burn(_msgSender(), _msgSender(), _amount, "", "");
        // TODO ask if this calculation makes sense
        uint256 burnAmount = _amount.mul(10**18).div(moneyMarket.tokenPrice());
        require(moneyMarket.burn(_receiver, burnAmount) >= _amount, "DDAI.burn: BURN_FAILED");
    }

    function addRecipe(address _receiver, uint256 _ratio, bytes calldata _data) external returns(bool) {
        AccountData storage accountData = accountDataOf[_msgSender()];

        accountData.recipes.push(Recipe({
            receiver: _receiver,
            ratio: _ratio,
            data: _data
        }));

        accountData.totalRatio.add(_ratio);
    }

    function removeRecipe(uint256 _index) external returns(bool) {
        AccountData storage accountData = accountDataOf[_msgSender()];
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
    }

    // Claim interest move interest to DDAI token balance and pay the interest to the attached recipes
    function payInterest(address _account) public {
        claimInterest(_account);
        AccountData storage accountData = accountDataOf[_account];
        _payToRecipes(_account, accountData.stack);
    }

    // GSN FUNCTIONALITY should be in a seperate file
    function acceptRelayedCall(
        address _relay,
        address _from,
        bytes calldata _encodedFunction,
        uint256 _transactionFee,
        uint256 _gasPrice,
        uint256 _gasLimit,
        uint256 _nonce,
        bytes calldata _approvalData,
        uint256 _maxPossibleCharge
    ) external view returns (uint256, bytes memory) {

        if(_balanceOf(_from) < _maxPossibleCharge) {
            return(1, "DDAI.acceptRelayedCall: NOT_ENOUGH_DDAI_BALANCE");
        }
        // TODO implement check maxPossibleCharge is enough to buy the eth to pay for the tx plus some extra margin
        return(0, "");
    }

    // TODO implement these
    function _preRelayedCall(bytes memory context) internal returns (bytes32) {
        return(bytes32(0));
    }
    function _postRelayedCall(bytes memory context, bool success, uint actualCharge, bytes32 preRetVal) internal {

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
            _send(_msgSender(), _account, recipe.receiver, recipeAmount, recipe.data, "", false);
        }

        return true;
    }

    function balanceOf(address _account) public view returns(uint256) {
        // return balance minus what is reserved for recipes(stack)
        return _balanceOf(_account).sub(accountDataOf[_account].stack);
    }

    function getTotalBalance(address _account) public view returns(uint256) {
        return _balanceOf(_account);
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