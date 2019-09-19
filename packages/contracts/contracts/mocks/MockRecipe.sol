pragma solidity >=0.4.21 <0.6.0;
import "../recipes/BaseRecipe.sol";

contract MockRecipe is BaseRecipe {

    address public operator;
    address public from;
    address public to;
    uint256 public amount;
    bytes public userData;
    bytes public operatorData;

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
        operator = _operator;
        from = _from;
        to = _to;
        amount = _amount;
        userData = _userData;
        operatorData = _operatorData;
    }
}