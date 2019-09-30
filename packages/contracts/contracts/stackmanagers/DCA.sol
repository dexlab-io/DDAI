pragma solidity >=0.4.21 <0.6.0;
import "openzeppelin-solidity/contracts/introspection/IERC1820Registry.sol";
import "openzeppelin-solidity/contracts/utils/Address.sol";
import "../interfaces/IDDAI.sol";

// Dollar cost averaging manager
// Account should be operator and stack manager

contract DCA {
    using Address for address;

    address public ddai;
    bytes32 constant private TOKENS_RECIPIENT_INTERFACE_HASH = 0xb281fc8c12954d22544db45de3159a39272895b169a852b314f9cc762e44c53b;
    IERC1820Registry private _erc1820 = IERC1820Registry(0x1820a4B7618BdE71Dce8cdc73aAB6C95905faD24);
    address payable internal msgSender;

    struct UserData {
        uint256 amount;
        uint256 next;
        uint256 interval;
        uint256 amountLeft;
        uint256 feePerInterval;
    }

    mapping(address => UserData) public dataOf;
    
    constructor(address _ddai) public {
        ddai = _ddai;
        _erc1820.setInterfaceImplementer(address(this), TOKENS_RECIPIENT_INTERFACE_HASH, address(this));
    }

    function set(uint256 _amount, uint256 _next, uint256 _interval, uint256 _totalAmount, uint256 _feePerInterval) external {
        dataOf[_msgSender()] = UserData({
            amount: _amount,
            next: _next,
            interval: _interval,
            amountLeft: _totalAmount,
            feePerInterval: _feePerInterval
        });

        if(_next < block.timestamp) {
            poke(_msgSender(), 0);
        }
    }

    function poke(address _account, uint256 _minFee) public returns(bool) {
        UserData storage userData = dataOf[_account];
        // If its not yet time to do dollar cost averaging or fee is too low do nothing
        // Not reverting to not break batches
        if(userData.next > block.timestamp) {
            return false;
        }

        uint256 intervalsAmount = 1;
        // Check if we should do more than one buy interval
        if(userData.next < block.timestamp) {
            intervalsAmount += (block.timestamp - userData.next) / userData.interval;
        }

        uint256 totalFee = userData.feePerInterval * intervalsAmount;

        if(_minFee > totalFee) {
            return false;
        }

        IDDAI ddaiContract = IDDAI(ddai);

        uint256 dcaAmount = userData.amount * intervalsAmount;
        ddaiContract.setStack(_account, dcaAmount);
        ddaiContract.distributeStack(_account);

        // transfer fee
        if(_account != _msgSender()){
            ddaiContract.operatorSend(_account, _msgSender(), totalFee, "", "");
        }

        return true;
    }

    function pokeBatch(address[] calldata _accounts, uint256 _minFee) external {
        for(uint256 i = 0; i < _accounts.length; i ++) {
            poke(_accounts[i], _minFee);
        }
    }

    function tokensReceived(
        address _operator,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _userData,
        bytes calldata _operatorData
    ) external {
        require(msg.sender == ddai, "DCA.tokensReceived: MSG_SENDER_INVALID");
        require(_amount == 0, "DCA.tokensReceived: AMOUNT_SHOULD_BE_ZERO");
        require(_to == address(this), "DCA.tokensReceived: TO_SHOULD_BE_THIS");

        msgSender = _from.toPayable();
        address(this).call(_userData);
        delete(msgSender);
    }

    function _msgSender() internal returns (address payable) {
        // if being called from self msgSender is saved in storage
        if(msg.sender != address(this)) {
            return msgSender;
        }
        return msg.sender;
    }

}