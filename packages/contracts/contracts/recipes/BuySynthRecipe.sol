pragma solidity >=0.4.21 <0.6.0;

import "openzeppelin-solidity/contracts/utils/Address.sol";
import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "./BaseRecipe.sol";
import "../interfaces/IDDAI.sol";
import "../interfaces/IKyberNetwork.sol";
// import "../interfaces/ISynthetixDepot.sol";
import "../interfaces/ISynthetix.sol";
import "../interfaces/IUniswap.sol";


contract BuySynthRecipe is BaseRecipe {
    using Address for address;

    IKyberNetwork public kyberNetwork;
    IUniswap public uniswapExchange;
    ISynthetix public synthetix;
    // TODO replace this constant with the actual susd currency key
    bytes32 constant public S_ETH_KEY = 0x7345544800000000000000000000000000000000000000000000000000000000;
    address constant internal ETH_TOKEN_ADDRESS = address(0x00eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee);

    constructor(
        address _token,
        address _underlying,
        address _kyberNetwork,
        address _uniswapExchange,
        address _synthetix
    ) BaseRecipe(_token, _underlying) public {
        kyberNetwork = IKyberNetwork(_kyberNetwork);
        uniswapExchange = IUniswap(_uniswapExchange);
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

        // Exchange dai to eth
        kyberNetwork.trade(address(underlying), underlying.balanceOf(address(this)), ETH_TOKEN_ADDRESS, address(this), uint256(-1), minRate, walletID);
        // exchange eth to susd

        uint256 sourceSynthAmount = uniswapExchange.ethToTokenSwapInput.value(address(this).balance)(1, block.timestamp + 1);

        // uint256 sourceSynthAmount = synthDepot.exchangeEtherForSynths.value(address(this).balance)();

        // exchange susd for other synth if susd is not the target asset
        if(targetSynth != S_ETH_KEY) {
            require(synthetix.exchange(S_ETH_KEY, sourceSynthAmount, targetSynth, receiver), "BuySynthRecipe.tokensReceived: SYNTH_EXCHANGE_FAILED");
        } else {
            require(IERC20(synthetix.synths(S_ETH_KEY)).transfer(_from, sourceSynthAmount), "BuySynthRecipe.tokensReceived: TRANSFER_FAILED");
        }
    }

    function() external payable {

    }
}