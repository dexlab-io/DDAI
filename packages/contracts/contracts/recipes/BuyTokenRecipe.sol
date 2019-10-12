pragma solidity >=0.4.21 <0.6.0;

import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "./BaseRecipe.sol";
import "../interfaces/IDDAI.sol";
import "../interfaces/IKyberNetwork.sol";


contract BuyTokenRecipe is BaseRecipe {
    using Address for address;

    IKyberNetwork public kyberNetwork;
    address constant internal ETH_TOKEN_ADDRESS = address(0x00eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee);
    
    constructor(address _token, address _underlying, address _kyberNetwork) BaseRecipe(_token, _underlying) public {
        kyberNetwork = IKyberNetwork(_kyberNetwork);
    }

    function tokensReceived(
        address _operator,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _userData,
        bytes calldata _operatorData
    ) external {
        _tokensReceived(_to);
        // burn ddai
        token.redeem(address(this), _amount);
        // approve underlying asset (dai)
        underlying.approve(address(kyberNetwork), _amount);
        // TODO getting min conversionrate from makerdao or kyber price oracle
        // TODO set walletID for fees
        uint256 minRate = 0;
        address walletID = address(0);
        (address outputToken, address receiver) = abi.decode(_userData, (address, address));
        // exchange and send eth to from address
        kyberNetwork.trade(address(underlying), underlying.balanceOf(address(this)), outputToken, receiver.toPayable(), uint256(-1), minRate, walletID);
    }

}