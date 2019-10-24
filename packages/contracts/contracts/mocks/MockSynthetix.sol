pragma solidity >=0.4.21 <0.6.0;

import "./MockToken.sol";
import "./MockSnx.sol";

// WORK IN PROGRESS

contract MockSynthetix {

    mapping(bytes4 => MockToken) public keyToToken;
    mapping(bytes4 => uint256) public tokenPrice;
    uint256 constant public COLLATERAL_RATIO = 750;

    MockSnx public snx;

    constructor(address _snx) public {
        snx = MockSnx(_snx);
    }

    function exchange(
        bytes4 _sourceCurrencyKey,
        uint256 _sourceAmount,
        bytes4 _destinationCurrencyKey,
        address _destinationAddress
    ) external returns (bool) {
        
    }

    // function issueMaxSynths(bytes4 _currencyKey) external {
    //     MockToken token = _getOrSetToken(_currencyKey);
    //     // Pull snx tokens
    //     snx.burnFrom(msg.sender, snx.balanceOf(msg.sender));
    //     // Calc price
    //     uint256

    //     // Transfer synth asset back
    // }

    function setPrice(bytes4 _currencyKey, uint256 _price) external {
        _getOrSetToken(_currencyKey);
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