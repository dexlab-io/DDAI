pragma solidity >=0.4.21 <0.6.0;
import "openzeppelin-solidity/contracts/introspection/IERC1820Registry.sol";
import "openzeppelin-solidity/contracts/utils/Address.sol";
// dollar cost averaging stack manager
contract DCA {
    using Address for address;

    address public ddai;
    bytes32 constant private TOKENS_RECIPIENT_INTERFACE_HASH = 0xb281fc8c12954d22544db45de3159a39272895b169a852b314f9cc762e44c53b;
    IERC1820Registry private _erc1820 = IERC1820Registry(0x1820a4B7618BdE71Dce8cdc73aAB6C95905faD24);
    address payable internal msgSender;

    constructor(address _ddai) public {
        ddai = _ddai;
        _erc1820.setInterfaceImplementer(address(this), TOKENS_RECIPIENT_INTERFACE_HASH, address(this));
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
        msgSender = address(0);
    }

    function _msgSender() internal returns (address payable) {
        // if being called from self msgSender is saved in storage
        if(msg.sender != address(this)) {
            return msgSender;
        }
        return msg.sender;
    }


}