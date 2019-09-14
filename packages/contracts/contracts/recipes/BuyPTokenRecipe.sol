pragma solidity >=0.4.21 <0.6.0;

import "../interfaces/IPToken.sol";
import "./BaseRecipe.sol";

contract BuyPTokenRecipe is BaseRecipe {
    constructor(address _token, address _underlying) BaseRecipe(_token, _underlying) public {

    }

    function tokensReceived(
        address _operator,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _userData,
        bytes calldata _operatorData
    ) external {
        _tokensReceived();
        token.redeem(address(this), _amount);
        address pTokenAddress = abi.decode(_userData, (address));
        underlying.approve(pTokenAddress, _amount);
        IPToken pToken = IPToken(pTokenAddress);
        // TODO consider getting max price from some oracle
        pToken.mintWithToken(_from, address(underlying),  _amount, 0);
    }
}