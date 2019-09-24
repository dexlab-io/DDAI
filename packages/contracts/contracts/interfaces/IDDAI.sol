pragma solidity >=0.4.21 <0.6.0;

interface IDDAI {
    function mint(
        address _receiver,
        uint256 _amount
    )
    external;

    function redeem(
        address _receiver,
        uint256 _amount
    )
    external
    returns (uint256);

    // function addRecipe(
    //     address _receiver,
    //     uint256 _ratio,
    //     bytes _data
    // )
    // external
    // returns(bool);

    function removeRecipe(
        uint256 index
    )
    external
    returns(bool);

    function balanceOf(address _acount) external view returns(uint256);

    event DDAIMinted(address indexed _receiver, uint256 _amount, address indexed _operator);
    event DDAIRedeemed(address indexed _receiver, uint256 _amount, address indexed _operator);
    event RecipeAdded(address indexed _account, address indexed _receiver, uint256 _ratio, bytes _data, uint256 _index);
    event RecipeRemoved(address indexed _account, address indexed _receiver, uint256 _ratio, bytes _data, uint256 _index);
    event InterestClaimed(address indexed _receiver, uint256 _interestEarned);
    event StackDistributed(address indexed _receiver, uint256 _amount);
}