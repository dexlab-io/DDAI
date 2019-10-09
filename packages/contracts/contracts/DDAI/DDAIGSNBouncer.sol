pragma solidity >=0.4.21 <0.6.0;
pragma experimental ABIEncoderV2;

import './DDAI.sol';
import '../interfaces/IPriceFeed.sol';
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/GSN/GSNRecipient.sol";

contract DDAIGSNBouncer is DDAI, Ownable, GSNRecipient  {
    using SafeMath for uint256;

    IPriceFeed public priceFeed;
    uint256 public constant FEE_DIVIDER = 1000;
    uint256 fee = 100; // 10% fee for using ddai in the gas station network

    constructor(
        address _moneyMarket,
        address _token,
        string memory _name,
        string memory _symbol,
        address[] memory _operators,
        address _priceFeed
    )
    public
    DDAI(_moneyMarket, _token, _name, _symbol, _operators) {
        priceFeed = IPriceFeed(_priceFeed);
    }

    function() external payable {
        if (msg.value != 0) {
            IRelayHub(getHubAddr()).depositFor.value(msg.value)(address(this));
            return;
        }
    }

    function withdrawEther(uint256 _amount) external onlyOwner {
        // withdraw ether to owner
        _withdrawDeposits(IRelayHub(getHubAddr()).balanceOf(address(this)).min(_amount), msg.sender);
    }

    // allows any token to be withdrawed including ddai gsn fees
    function withdrawToken(address _token) external {
        require(_token != address(moneyMarket), "DDAIGSNBouncer.withdrawToken: CANNOT_WITHDRAW_MONEY_MARKET_TOKEN");
        claimInterest(address(this));
        IERC20 token = IERC20(token);
        token.transfer(owner(), token.balanceOf(address(this)));
    }

    // function setPriceFeed(address _feed) external onlyOwner {
    //     priceFeed = IPriceFeed(_feed);
    // }

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
        uint256 tokenAmount = calcTokenAmount(_maxPossibleCharge);
        if(_balanceOf(_from) < tokenAmount) {
            return(1, "DDAI.acceptRelayedCall: NOT_ENOUGH_DDAI_BALANCE");
        }
        return(0, "");
    }

    // TODO implement these
    function _preRelayedCall(bytes memory context) internal returns (bytes32) {
        (address from, uint256 maxPossibleCharge) = abi.decode(context, (address, uint256));
        uint256 tokenAmount = calcTokenAmount(maxPossibleCharge);
        _move(address(this), from, address(this), tokenAmount, "", "");
        return(bytes32(0));
    }

    function _postRelayedCall(bytes memory context, bool success, uint actualCharge, bytes32 preRetVal) internal {
        (address from, uint256 maxPossibleCharge, uint256 transactionFee, uint256 gasPrice) = 
        abi.decode(context, (address, uint256, uint256, uint256));
        uint256 overestimation = _computeCharge(POST_RELAYED_CALL_MAX_GAS.sub(10000), gasPrice, transactionFee);
        uint256 totalCharged = actualCharge.sub(overestimation);
        _move(address(this), address(this), from, calcTokenAmount(maxPossibleCharge.sub(totalCharged)), "", "");
    }

    function calcTokenAmount(uint256 _ethAmount) public view returns(uint256) {
        uint256 ethPrice = getEthprice();
        return(_ethAmount.mul(ethPrice).div(10**18).mul(fee).div(FEE_DIVIDER));
    }

    function getEthprice() public view returns(uint256) {
        return uint256(priceFeed.read());
    }
}
