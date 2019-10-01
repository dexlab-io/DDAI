pragma solidity >=0.4.21 <0.6.0;

contract ISynthetix {
    function exchange(
        bytes4 _sourceCurrencyKey,
        uint256 _sourceAmount,
        bytes4 _destinationCurrencyKey,
        address _destinationAddress
    ) external returns (bool);
}