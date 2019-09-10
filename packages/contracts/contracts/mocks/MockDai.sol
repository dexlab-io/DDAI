pragma solidity >=0.4.21 <0.6.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract MockDai is ERC20 {
    function mintTo(address _receiver, uint256 _amount) external {
        _mint(_receiver, _amount);
    }
}