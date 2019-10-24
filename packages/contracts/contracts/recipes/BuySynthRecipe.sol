pragma solidity >=0.4.21 <0.6.0;

import "openzeppelin-solidity/contracts/utils/Address.sol";
import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "./BaseRecipe.sol";
import "../interfaces/IDDAI.sol";
import "../interfaces/IKyberNetwork.sol";
import "../interfaces/ISynthetixDepot.sol";
import "../interfaces/ISynthetix.sol";


contract BuySynthRecipe is BaseRecipe {
    using Address for address;

    IKyberNetwork public kyberNetwork;
    ISynthetixDepot public synthDepot;
    ISynthetix public synthetix;
    // TODO replace this constant with the actual susd currency key
    bytes32 constant public S_USD_KEY = 0x7355534400000000000000000000000000000000000000000000000000000000;
    address constant internal ETH_TOKEN_ADDRESS = address(0x00eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee);

    constructor(
        address _token,
        address _underlying,
        address _kyberNetwork,
        address _synthDepot,
        address _synthetix
    ) BaseRecipe(_token, _underlying) public {
        kyberNetwork = IKyberNetwork(_kyberNetwork);
        synthDepot = ISynthetixDepot(_synthDepot);
        synthetix = ISynthetix(_synthetix);
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
        // burn ddai
        token.redeem(address(this), _amount);
        // approve underlying asset (dai)
        underlying.approve(address(kyberNetwork), _amount);
        // TODO getting min conversionrate from makerdao or kyber price oracle
        // TODO set walletID for fees
        uint256 minRate = 0;
        address walletID = address(0);

        (bytes32 targetSynth, address receiver) = abi.decode(_userData, (bytes32, address));

        address payable selfPayable = address(this).toPayable();

        // Exchange dai to eth
        kyberNetwork.trade(address(underlying), _amount, ETH_TOKEN_ADDRESS, selfPayable, uint256(-1), minRate, walletID);
        // exchange eth to susd
        uint256 sourceSynthAmount = synthDepot.exchangeEtherForSynths.value(selfPayable.balance)();

        // exchange susd for other synth if susd is not the target asset
        if(targetSynth != S_USD_KEY) {
            require(synthetix.exchange(S_USD_KEY, sourceSynthAmount, targetSynth, receiver), "BuySynthRecipe.tokensReceived: SYNTH_EXCHANGE_FAILED");
        } else {
            require(IERC20(synthetix.synths(S_USD_KEY)).transfer(_from, sourceSynthAmount), "BuySynthRecipe.tokensReceived: TRANSFER_FAILED");
        }
    }
}