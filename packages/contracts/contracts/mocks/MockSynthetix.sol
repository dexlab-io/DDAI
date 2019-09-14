pragma solidity >=0.4.21 <0.6.0;

import "./MockToken.sol";
import "./MockSnx.sol";

contract MockSynthetix {

    mapping(bytes4 => MockToken) public keyToToken;
    mapping(bytes4 => uint256) public tokenPrice;

    MockSnx public snx;

    constructor(address _snx) public {
        snx = MockSnx(_snx);
    }

    function issueMaxSynths(bytes4 _currencyKey) external {
        MockToken token = _getOrSetToken(_currencyKey);
        // TODO
        // Pull snx tokens
        // Calc price
        // Transfer synth asset back
    }

    function setPrice(bytes4 _currencyKey, uint256 _price) external {
        tokenPrice[_currencyKey] = _price;
    }

    function _getOrSetToken(bytes4 _currencyKey) internal returns(MockToken) {
        if(address(keyToToken[_currencyKey]) == address(0)) {
            keyToToken[_currencyKey] = new MockToken();
            tokenPrice[_currencyKey] = 1 ether;
        }

        return keyToToken[_currencyKey];
    }
}