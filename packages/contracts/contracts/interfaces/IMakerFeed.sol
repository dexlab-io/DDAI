pragma solidity >=0.4.21 <0.6.0;
pragma experimental ABIEncoderV2;

interface IMakerFeed {
    function read() external view returns(bytes32);
}