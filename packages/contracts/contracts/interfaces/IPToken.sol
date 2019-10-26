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

    function transfer(
        address _to,
        uint256 _value)
    external
    returns (bool);
}