import * as wrappers from '@ddai/contract-wrappers';
import * as artifacts from '@ddai/contract-artifacts';
import { getProvider, toWei, getDeployArgs } from '@ddai/utils';
import { Web3Wrapper } from '@0x/web3-wrapper';
import { BigNumber, Web3ProviderEngine } from '0x.js';
import Web3 from 'web3';
import * as abi from 'ethereumjs-abi';

process.env.USE_CONFIG && require('dotenv').config();

export const migrate = async () => {
    const { pe, web3 } = await getProvider(false);
    const accounts = await web3.getAvailableAddressesAsync();
    const txDefaults = {
        from: accounts[0],
        gas: 8000000,
    }
    console.log("Starting Migrations");

    const instance = await wrappers.BuyTokenRecipeContract.deployFrom0xArtifactAsync(
        ...getDeployArgs("BuyTokenRecipe", pe, txDefaults),
        // @ts-ignore
        process.env.DDAI,
        process.env.DAI,
        process.env.KYBER_NETWORK
    )

    console.log("Recipe: ", instance.address);
    console.log("DDAI: ", process.env.DDAI);
    pe.stop();

}

migrate();