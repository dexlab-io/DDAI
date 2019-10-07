import chai, { expect, should, assert } from 'chai';
import { describe, before, beforeEach, after, it, setup, teardown } from 'mocha';
import chaiAsPromised from 'chai-as-promised';
import chaiBigNumber from 'chai-bignumber';
import {BigNumber} from '@0x/utils';
import { migrate } from '@ddai/migrations';
import * as wrappers from '@ddai/contract-wrappers';
import { getProvider, toWei } from '@ddai/utils';
import * as abi from 'ethereumjs-abi';
chai.use(chaiAsPromised);
chai.use(chaiBigNumber(BigNumber));

let mockDai: wrappers.MockDaiContract;
let mockIToken: wrappers.MockITokenContract;
let mockKyberNetwork: wrappers.MockKyberNetworkContract;
let ddai: wrappers.DDAIContract;
let buyTokenRecipe: wrappers.BuyTokenRecipeContract;
let buyPTokenRecipe: wrappers.BuyPTokenRecipeContract;
let mockRecipe: wrappers.MockRecipeContract;
let snapshot: number;
let accounts: string[];
let user: string;
let txData;

// TODO fix sol-trace and sol-coverage
let {pe, web3, coverageSubProvider} = getProvider(true, false);

const initialDaiAmount = toWei(1000);
const ETH_TOKEN_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE".toLowerCase();

describe("BuyTokenRecipe", function(){
    this.timeout(30000);

    before(async () => {
        ({mockDai, mockIToken, mockKyberNetwork, ddai, buyTokenRecipe, buyPTokenRecipe, mockRecipe} = (await migrate()).contractInstances);
        accounts = await web3.getAvailableAddressesAsync();
        user = accounts[0];
        await mockDai.mintTo.sendTransactionAsync(user, initialDaiAmount);
        await mockDai.approve.sendTransactionAsync(ddai.address, initialDaiAmount);
        await ddai.mint.sendTransactionAsync(user, initialDaiAmount);
        
        txData = {
            from: user,
            gas: 8000000
        }
        snapshot = await web3.takeSnapshotAsync();
    })

    beforeEach(async () => {
        await web3.revertSnapshotAsync(snapshot);
        snapshot = await web3.takeSnapshotAsync();
    })

    after(async() => {
        pe.stop();
    })


    // it.only("Sending ddai should not cause issues", async() => {
    //     await ddai.redeem.sendTransactionAsync(accounts[1], toWei(100));
    // })

    it("Buying ETH by sending ddai should work", async() => {
        const userData = "0x" + abi.rawEncode(["address", "address"], [ETH_TOKEN_ADDRESS, user]).toString("hex");
        console.log(userData);
        await ddai.send.sendTransactionAsync(buyTokenRecipe.address, toWei(10), userData);
        // await ddai.addRecipe.sendTransactionAsync(buyTokenRecipe.address, new BigNumber(100), );
    })
})

