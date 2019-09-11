pragma solidity >=0.4.21 <0.6.0;

import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "openzeppelin-solidity/contracts/introspection/IERC1820Registry.sol";
import "openzeppelin-solidity/contracts/utils/Address.sol";

import "../interfaces/IDDAI.sol";
import "../interfaces/IKyberNetwork.sol";


contract BuyEthRecipe {

    using Address for address;

    IDDAI public token;
    IERC20 public underlying;
    IKyberNetwork public kyberNetwork;
    address constant internal ETH_TOKEN_ADDRESS = address(0x00eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee);
    bytes32 constant private TOKENS_RECIPIENT_INTERFACE_HASH = 0xb281fc8c12954d22544db45de3159a39272895b169a852b314f9cc762e44c53b;
    IERC1820Registry private _erc1820 = IERC1820Registry(0x1820a4B7618BdE71Dce8cdc73aAB6C95905faD24);


    constructor(address _token, address _underlying, address _kyberNetwork) public {
        token = IDDAI(_token);
        underlying = IERC20(_underlying);
        kyberNetwork = IKyberNetwork(_kyberNetwork);
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
        require(msg.sender == address(token), "BuyEthRecipe.tokensReceived: MSG_SENDER_NOT_TOKEN");
        // burn ddai
        token.burn(address(this), _amount);
        // approve underlying asset (dai)
        underlying.approve(address(kyberNetwork), _amount);
        // TODO getting min conversionrate from makerdao or kyber price oracle
        // TODO set walletID for fees
        // exchange and send eth to from address
        kyberNetwork.trade(address(underlying), _amount, ETH_TOKEN_ADDRESS, _from.toPayable(), uint256(-1), 0, address(0));
    }
}