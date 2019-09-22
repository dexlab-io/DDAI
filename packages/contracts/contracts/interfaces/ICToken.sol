
pragma solidity >=0.4.21 <0.6.0;

interface ICToken {
    function repayBorrowBehalf(address _borrower, uint _repayAmount) external returns(uint256);
    function underlying() external view returns(address);
    function borrowBalanceCurrent(address _account) external view returns(uint256);
}