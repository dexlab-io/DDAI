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
let mockRep: wrappers.MockTokenContract;
let mockCDai: wrappers.MockCTokenContract;
let mockCEth: wrappers.MockCTokenContract;
let mockCRep: wrappers.MockCTokenContract;
let mockKyberNetwork: wrappers.MockKyberNetworkContract;
let ddai: wrappers.DDAIContract;
let compoundRepayRecipe: wrappers.CompoundRepayRecipeContract;
let snapshot: number;
let accounts: string[];
let user: string;
let txData;

// TODO fix sol-trace and sol-coverage
let {pe, web3, coverageSubProvider} = getProvider(true, false);

const initialDaiAmount = toWei(1000);
const ETH_PRICE = 200;
const ETH_TOKEN_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE".toLowerCase();

describe("CompoundRepayRecipe", function(){
    this.timeout(30000);

    before(async () => {
        ({mockDai, mockKyberNetwork, ddai, compoundRepayRecipe, mockCDai, mockCEth, mockCRep, mockRep} = (await migrate()).contractInstances);
        accounts = await web3.getAvailableAddressesAsync();
        user = accounts[0];
        await mockDai.mintTo.sendTransactionAsync(user, initialDaiAmount);
        await mockDai.approve.sendTransactionAsync(ddai.address, initialDaiAmount);
        await ddai.mint.sendTransactionAsync(user, initialDaiAmount);
        await mockKyberNetwork.setPairRate.sendTransactionAsync(mockDai.address, ETH_TOKEN_ADDRESS, toWei(1 / ETH_PRICE));
        await mockKyberNetwork.setPairRate.sendTransactionAsync(mockDai.address, mockRep.address, toWei(8));
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

    it("Paying of a debt in dai by sending should work", async() => {
        const userData = "0x" + abi.rawEncode(["address", "address"], [mockCDai.address, user]).toString("hex");
        await mockCDai.borrow.sendTransactionAsync(toWei(10));
        await ddai.send.sendTransactionAsync(compoundRepayRecipe.address, toWei(100), userData);
        // TODO expects
    })

    it("Paying of a debt in dai by distributing the stack should work", async() => {
        const userData = "0x" + abi.rawEncode(["address", "address"], [mockCDai.address, user]).toString("hex");
        await mockCDai.borrow.sendTransactionAsync(toWei(10));
        await ddai.addRecipe.sendTransactionAsync(compoundRepayRecipe.address, toWei(1), userData);
        await ddai.setStack.sendTransactionAsync(user, initialDaiAmount);
        await ddai.distributeStack.sendTransactionAsync(user);
        // TODO expects
    })

    it("Paying of a debt in eth by sending should work", async() => {
        const userData = "0x" + abi.rawEncode(["address", "address"], [mockCEth.address, user]).toString("hex");
        await mockCEth.borrow.sendTransactionAsync(toWei(1));
        const borrowBalanceBefore = await mockCEth.borrowBalanceCurrent.callAsync(user);
        await ddai.send.sendTransactionAsync(compoundRepayRecipe.address, toWei(1000), userData);
        const borrowBalanceAfter = await mockCEth.borrowBalanceCurrent.callAsync(user);

        // TODO clean this up and do proper expects

        // console.log(fromWei(borrowBalanceBefore).toString(), fromWei(borrowBalanceAfter).toString());
        // console.log(await web3.getBalanceInWeiAsync(compoundRepayRecipe.address));

    })

    it("Paying of a debt in eth by distributing the stack should work", async() => {
        const userData = "0x" + abi.rawEncode(["address", "address"], [mockCEth.address, user]).toString("hex");
        await mockCEth.borrow.sendTransactionAsync(toWei(10));
        await ddai.addRecipe.sendTransactionAsync(compoundRepayRecipe.address, toWei(1), userData);
        await ddai.setStack.sendTransactionAsync(user, initialDaiAmount);
        await ddai.distributeStack.sendTransactionAsync(user);
        // TODO expects
    })

    it("Paying of a debt in another token by sending should work", async() => {
        const userData = "0x" + abi.rawEncode(["address", "address"], [mockCRep.address, user]).toString("hex");
        await mockCRep.borrow.sendTransactionAsync(toWei(10));
        await ddai.send.sendTransactionAsync(compoundRepayRecipe.address, toWei(100), userData);
        // TODO expects
    })

    it("Paying of a debt in another token by distributing the stack should work", async() => {
        const userData = "0x" + abi.rawEncode(["address", "address"], [mockCRep.address, user]).toString("hex");
        await mockCRep.borrow.sendTransactionAsync(toWei(10));
        await ddai.addRecipe.sendTransactionAsync(compoundRepayRecipe.address, toWei(1), userData);
        await ddai.setStack.sendTransactionAsync(user, initialDaiAmount);
        await ddai.distributeStack.sendTransactionAsync(user);
        // TODO expects
    })    
})


