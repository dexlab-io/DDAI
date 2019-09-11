pragma solidity >=0.4.21 <0.6.0;

interface IKyberNetwork {

    function trade(
        address src,
        uint srcAmount,
        address dest,
        address payable destAddress,
        uint maxDestAmount,
        uint minConversionRate,
        address walletId
    ) external payable returns(uint256);
}