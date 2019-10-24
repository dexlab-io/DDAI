pragma solidity >=0.4.21 <0.6.0;

contract ISynthetix {
    function exchange(
        bytes32 _sourceCurrencyKey,
        uint256 _sourceAmount,
        bytes32 _destinationCurrencyKey,
        address _destinationAddress
    ) external returns (bool);

    function synths(bytes32 _key) external view returns (address);
}