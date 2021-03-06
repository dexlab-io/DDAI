pragma solidity >=0.4.21 <0.6.0;

import "./BaseRecipe.sol";
import "../interfaces/ICToken.sol";
import "../interfaces/ICEToken.sol";
import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "../interfaces/IKyberNetwork.sol";
import "openzeppelin-solidity/contracts/math/Math.sol";
import "openzeppelin-solidity/contracts/utils/Address.sol";


contract CompoundRepayRecipe is BaseRecipe {
    using Math for uint256;
    using Address for address;

    IKyberNetwork public kyberNetwork;
    address constant internal ETH_TOKEN_ADDRESS = address(0x00eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee);

    constructor(address _token, address _underlying, address _kyberNetwork) BaseRecipe(_token, _underlying) public {
        kyberNetwork = IKyberNetwork(_kyberNetwork);
    }

    function tokensReceived(
        address _operator,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _userData,
        bytes calldata _operatorData
    ) external {
        _tokensReceived(_to);
        // redeem dai from ddai;
        token.redeem(address(this), _amount);

        (address iTokenAddress, address borrower) = abi.decode(_userData, (address, address));

        ICToken iToken = ICToken(iTokenAddress);
        IERC20 compoundUnderlying = IERC20(iToken.underlying());

        uint256 underlyingAmount = _amount;

        // If borrowed is not dai swap to borrowed on kyber
        if(address(compoundUnderlying) != address(underlying)) {
            // address walletID = address(0);
            // // TODO getting min conversionrate from makerdao or kyber price oracle
            // // TODO set walletID for fees
            // uint256 minRate = 0;
            if(address(compoundUnderlying) == address(0)) {
                compoundUnderlying = IERC20(ETH_TOKEN_ADDRESS);
            }
            // split out because stack to deep error
            buyUnderlying(_amount, compoundUnderlying, address(this));
        }

        uint256 borrowedBalance = iToken.borrowBalanceCurrent(borrower);
        // cannot repay more than borrowed
        uint256 payoffAmount = underlyingAmount.min(borrowedBalance);

        if(address(compoundUnderlying) != ETH_TOKEN_ADDRESS) {
            compoundUnderlying.approve(address(iToken), payoffAmount);
            iToken.repayBorrowBehalf(borrower, payoffAmount);
            // If any tokens left return them to the user
            if(payoffAmount < underlyingAmount) {
                compoundUnderlying.transfer(_from, underlyingAmount - payoffAmount);
            }
        } else {
            // //compound underlying is eth
            ICEToken iceToken = ICEToken(iTokenAddress);
            iceToken.repayBorrowBehalf.value(payoffAmount)(borrower);

            if(address(this).balance > 0) {
                _from.toPayable().transfer(address(this).balance);
            }
        }

    }

    function() external payable {
        // NIENTE
    }

    function buyUnderlying(uint256 _amount, IERC20 _compoundUnderlying, address _from) internal returns(uint256) {
        underlying.approve(address(kyberNetwork), _amount);
        return kyberNetwork.trade(address(underlying), _amount, address(_compoundUnderlying), _from.toPayable(), uint256(-1), 0, address(0));
    }
}