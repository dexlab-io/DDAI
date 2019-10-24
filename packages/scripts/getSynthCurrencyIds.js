'use strict';

const { SynthetixJs } = require('synthetix-js');

(async function() {
  const snxjs = new SynthetixJs({
    networkId: 42
  }); //uses default ContractSettings - ethers.js default provider, mainnet
  const snxPrice = snxjs.utils.formatEther(await snxjs.utils.getSynthetixPrice());
  console.log('-------------------');
  console.log(`SNX price: ${snxPrice}`);
  console.log('-------------------');
  console.log('SYNTH SUPPLY');
  console.log('-------------------');
  const { synths } = snxjs.contractSettings;

  synths.forEach(async ({ name, sign, desc }) => {
    const totalAmount = await snxjs[name].totalSupply();
    const totalSupply = snxjs.utils.formatEther(totalAmount);
    console.log(`${desc} (${name}) ${SynthetixJs.utils.formatBytes32String(name)} ${sign}${totalSupply}`);
  });
})();