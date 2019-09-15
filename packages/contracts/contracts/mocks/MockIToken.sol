pragma solidity >=0.4.21 <0.6.0;

import "../interfaces/IMoneyMarket.sol";
import "./MockDai.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/math/Math.sol";

contract MockIToken is IMoneyMarket, ERC20 {
    using Math for uint256;

    uint256 currentTokenPrice = 1 ether;
    MockDai public token;
    uint256 public liquidity = uint256(-1);

    constructor(address _mockToken) public {
        token = MockDai(_mockToken);
    }

    function mint(address _receiver, uint256 _depositAmount) external returns (uint256 mintAmount) {
        require(token.transferFrom(msg.sender, address(this), _depositAmount), "MockIToken.mint: TRANSFER_FROM_FAILED");
        _mint(_receiver, _depositAmount.mul(10**18).div(currentTokenPrice));
    }

    function burn(address _receiver, uint256 _burnAmount) external returns (uint256 loanAmountPaid) {
        // TODO consider not burning the full burn amount. If it matters for testing purposes
        _burn(msg.sender, _burnAmount);
        loanAmountPaid = _burnAmount.mul(currentTokenPrice).div(10**18).min(liquidity);
        token.mintTo(_receiver, loanAmountPaid);
        return loanAmountPaid;
        // TODO implement incomplete loan payment
    }

    function claimLoanToken() external returns (uint256 claimedAmount) {
        // We dont care about this yet
        return 42;
    }

    function assetBalanceOf(address _owner) external view returns (uint256) {
        return balanceOf(_owner).mul(currentTokenPrice).div(10**18);
    }

    function setLiquidity(uint256 _amount) external {
        liquidity = _amount;
    }

    function setTokenPrice(uint256 _tokenPrice) external {
        currentTokenPrice = _tokenPrice;
    }

    function tokenPrice() external view returns (uint256 price) {
        return currentTokenPrice;
    }
}
