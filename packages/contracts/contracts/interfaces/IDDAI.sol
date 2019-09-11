pragma solidity >=0.4.21 <0.6.0;

interface IDDAI {
    function mint(
        address _receiver,
        uint256 _amount
    )
    external
    returns (uint256);

    function burn(
        address _receiver,
        uint256 _amount
    )
    external
    returns (uint256);

    function addRecipe(
        address _receiver,
        uint256 _ratio,
        bytes calldata _data
    )
    external
    returns(bool);

    function removeRecipe(
        uint256 index
    )
    external
    returns(bool);

    function balanceOf(address _acount) external returns(uint256);
}