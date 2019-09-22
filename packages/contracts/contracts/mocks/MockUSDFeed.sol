pragma solidity >=0.4.21 <0.6.0;
pragma experimental ABIEncoderV2;

import '../interfaces/IMakerFeed.sol';

contract MockUSDFeed is IMakerFeed {

    uint256 public price;

    constructor(uint256 _price) public {
        write(_price);
    }

    function write(uint256 _price) public {
        price = _price;
    }

    function read() external view returns(bytes32) {
        return bytes32(price);
    }
}