pragma solidity >=0.4.21 <0.6.0;
pragma experimental ABIEncoderV2;

interface IPriceFeed {
    function read() external view returns(bytes32);
}