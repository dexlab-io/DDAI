pragma solidity >=0.4.21 <0.6.0;

import "../interfaces/IDDAI.sol";
import "openzeppelin-solidity/contracts/introspection/IERC1820Registry.sol";
import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "openzeppelin-solidity/contracts/introspection/IERC1820Registry.sol";
import "openzeppelin-solidity/contracts/utils/Address.sol";

contract BaseRecipe {
    IDDAI public token;
    IERC20 public underlying;
    bytes32 constant private TOKENS_RECIPIENT_INTERFACE_HASH = 0xb281fc8c12954d22544db45de3159a39272895b169a852b314f9cc762e44c53b;
    IERC1820Registry private _erc1820 = IERC1820Registry(0x1820a4B7618BdE71Dce8cdc73aAB6C95905faD24);

    constructor(address _token, address _underlying) public {
        token = IDDAI(_token);
        underlying = IERC20(_underlying);
        _erc1820.setInterfaceImplementer(address(this), TOKENS_RECIPIENT_INTERFACE_HASH, address(this));
    }

    function _tokensReceived(address _to) internal view {
        require(msg.sender == address(token), "BaseRecipe.tokensReceived: MSG_SENDER_NOT_TOKEN");
        // To Must be this contract as tokens should be received here
        require(_to == address(this), "BaseRecipe.tokensReceived: TO_SHOULD_BE_THIS");
    }
}