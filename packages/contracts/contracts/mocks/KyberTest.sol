pragma solidity >=0.4.21 <0.6.0;


import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "../interfaces/IDDAI.sol";
import "../interfaces/IKyberNetwork.sol";

contract KyberTest {

    function test(uint256 _amount) external {
        address dai = address(0xC4375B7De8af5a38a93548eb8453a498222C4fF2);
        address _kyber = 0x692f391bCc85cefCe8C237C01e1f636BbD70EA4D;
        IERC20(dai).approve(address(_kyber), _amount);
        IKyberNetwork kyberNetwork = IKyberNetwork(_kyber);
        kyberNetwork.trade(dai, _amount, address(0x00eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee), msg.sender, uint256(-1), 1, address(0));
    }

}