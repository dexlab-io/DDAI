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
        _tokensReceived(_to);
        token.redeem(address(this), token.balanceOf(address(this)));
        uint256 underlyingAmount = underlying.balanceOf(address(this));
        address pTokenAddress = abi.decode(_userData, (address));
        underlying.approve(pTokenAddress, underlyingAmount);
        IPToken pToken = IPToken(pTokenAddress);
        // TODO consider getting max price from some oracle
        pToken.mintWithToken(_from, address(underlying), underlyingAmount, 0);
    }

    function() external payable {}
}