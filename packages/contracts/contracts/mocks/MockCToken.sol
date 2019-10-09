pragma solidity >=0.4.21 <0.6.0;

import "../interfaces/ICToken.sol";
import "./MockDai.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/math/Math.sol";


// Contract has overflow but it's just a mock used for testing

contract MockCToken is ICToken, ERC20 {

    MockDai public token;
    uint256 public exchangeRate = 1 ether;
    uint256 public errorCode;
    mapping(address => uint256) internal borrowBalances;

    constructor(address _token) public {
        token = MockDai(_token);
    }

    function borrow(uint _borrowAmount) public returns (uint256) {
        borrowBalances[msg.sender] += _borrowAmount;
        return(errorCode);
    }

    function repayBorrowBehalf(address, uint _repayAmount) public returns (uint256) {
        require(token.transferFrom(msg.sender, address(this), _repayAmount), "MockCToken.repayBorrowBehalf: TRANSFER_FROM_FAILED");
        borrowBalances[msg.sender] -= _repayAmount;
        return errorCode;
    }

    function repayBorrow(uint _repayAmount) external returns (uint256) {
        return repayBorrowBehalf(msg.sender, _repayAmount);
    }

    function repayBorrowBehalf(address) public payable {
        borrowBalances[msg.sender] -= msg.value;
        require(errorCode == 0, "MockCToken.repayBorrowBehalf: ERROR_CODE_INVALID");
    }

    function repayBorrow() external payable {
        repayBorrowBehalf(msg.sender);
    }

    function borrowBalanceCurrent(address _account) public view returns (uint256) {
        return borrowBalances[_account];
    }

    function setExchangeRate(uint256 _newRate) external {
        exchangeRate = _newRate;
    }

    function exchangeRateCurrent() external view returns (uint256) {
        return exchangeRate;
    }

    function setErrorCode(uint256 _value) public {
        errorCode = _value;
    }

    function underlying() external view returns(address) {
        return address(token);
    }
}