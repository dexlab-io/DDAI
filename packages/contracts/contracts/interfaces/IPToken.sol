pragma solidity >=0.4.21 <0.6.0;

interface IPToken {

    function mintWithToken(
        address _receiver,
        address _depositTokenAddress,
        uint256 _depositAmount,
        uint256 _maxPriceAllowed
    )
    external
    returns (uint256);

}