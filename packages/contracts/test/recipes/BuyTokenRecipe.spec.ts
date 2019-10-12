import chai, { expect, should, assert } from 'chai';
import { describe, before, beforeEach, after, it, setup, teardown } from 'mocha';
import chaiAsPromised from 'chai-as-promised';
import chaiBigNumber from 'chai-bignumber';
import {BigNumber} from '@0x/utils';
import { migrate } from '@ddai/migrations';
import * as wrappers from '@ddai/contract-wrappers';
import { getProvider, toWei, fromWei } from '@ddai/utils';
import * as abi from 'ethereumjs-abi';
import { Web3Wrapper } from '@0x/web3-wrapper';
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
const ETH_PRICE = 200;
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
        await mockKyberNetwork.setPairRate.sendTransactionAsync(mockDai.address, ETH_TOKEN_ADDRESS, toWei(1 / ETH_PRICE));
        txData = {
            from: user,
            gas: 8000000
        }
        await web3.sendTransactionAsync(
            {
                ...txData,
                to: mockKyberNetwork.address,
                value: toWei(100)
            }
        )
        
        snapshot = await web3.takeSnapshotAsync();
    })

    beforeEach(async () => {
        await web3.revertSnapshotAsync(snapshot);
        snapshot = await web3.takeSnapshotAsync();
    })

    after(async() => {
        pe.stop();
    })

    it.only("Buying ETH by sending ddai should work", async() => {
        const userData = "0x" + abi.rawEncode(["address", "address"], [ETH_TOKEN_ADDRESS, accounts[1]]).toString("hex");

        console.log(userData);
        
        const ethBalanceBefore = await web3.getBalanceInWeiAsync(accounts[1]);
        await ddai.send.sendTransactionAsync(buyTokenRecipe.address, toWei(ETH_PRICE), userData);
        const ethBalanceAfter = await web3.getBalanceInWeiAsync(accounts[1]);
        expect(ethBalanceAfter, "Should have bought 1 eth").to.bignumber.eq(ethBalanceBefore.plus(toWei(1)));
    })

    it("Buying ETH by distributing the stack should work", async() => {
        const userData = "0x" + abi.rawEncode(["address", "address"], [ETH_TOKEN_ADDRESS, accounts[1]]).toString("hex");

        const ddaiAmount = toWei(ETH_PRICE);
        
        await ddai.transfer.sendTransactionAsync(accounts[1], ddaiAmount);
        await ddai.addRecipe.sendTransactionAsync(buyTokenRecipe.address, toWei(1), userData, {from: accounts[1]});
        await ddai.setStack.sendTransactionAsync(accounts[1], ddaiAmount, {from: accounts[1]});

        const ethBalanceBefore = await web3.getBalanceInWeiAsync(accounts[1]);
        await ddai.distributeStack.sendTransactionAsync(accounts[1]);
        const ethBalanceAfter = await web3.getBalanceInWeiAsync(accounts[1]);

        expect(ethBalanceAfter, "Should have bought 1 eth").to.bignumber.eq(ethBalanceBefore.plus(toWei(1)));
    })
})

