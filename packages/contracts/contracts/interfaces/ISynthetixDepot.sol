pragma solidity >=0.4.21 <0.6.0;

interface ISynthetixDepot {
    function exchangeEtherForSynths() external payable returns (uint256); // Returns the number of Synths (sUSD) received
}