pragma solidity >=0.4.21 <0.6.0;

// ICE ICE BABY Seperated this from ICToken to allow for repayBorrowBehalf.value()() without compiling errors
interface ICEToken {
    function repayBorrowBehalf(address _borrower) external payable;
}