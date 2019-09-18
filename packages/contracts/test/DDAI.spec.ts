import chai, { expect, should, assert } from 'chai';
import { describe, before, beforeEach, after, it, setup, teardown } from 'mocha';
import chaiAsPromised from 'chai-as-promised';
import chaiBigNumber from 'chai-bignumber';
import {BigNumber} from '@0x/utils';
import { migrate } from '@ddai/migrations';
import * as wrappers from '@ddai/contract-wrappers';
import { getProvider, toWei } from '@ddai/utils';
import { Web3Wrapper } from '@0x/web3-wrapper';
import { AssertionError } from 'assert';
import { isRejected } from 'q';


chai.use(chaiAsPromised);
chai.use(chaiBigNumber(BigNumber));

let mockDai: wrappers.MockDaiContract;
let mockIToken: wrappers.MockITokenContract;
let mockKyberNetwork: wrappers.MockKyberNetworkContract;
let ddai: wrappers.DDAIContract;
let buyEthRecipe: wrappers.BuyEthRecipeContract;
let buyPTokenRecipe: wrappers.BuyPTokenRecipeContract;
let snapshot: number;
let accounts: string[];
let user: string;
let txData;

// TODO fix sol-trace
let {pe, web3} = getProvider(false);

const initialDaiAmount = toWei(1000);

const mockRecipes = [
    {
        address: "0x0000000000000000000000000000000000000001",
        ratio: new BigNumber(1000),
        data: "0x1337"
    },
    {
        address: "0x0000000000000000000000000000000000000002",
        ratio: new BigNumber(100),
        data: "0x42"
    },
    {
        address: "0x0000000000000000000000000000000000000003",
        ratio: new BigNumber(1000),
        data: "0xdede"
    },
]


describe("DDAI", function( ){
    this.timeout(30000);

    before(async () => {
        ({mockDai, mockIToken, mockKyberNetwork, ddai, buyEthRecipe, buyPTokenRecipe} = (await migrate()).contractInstances);
        accounts = await web3.getAvailableAddressesAsync();
        user = accounts[0];
        await mockDai.mintTo.sendTransactionAsync(user, initialDaiAmount);

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

    after(async () => {
        pe.stop();
    })

    it("Minting DDAI should work", async() => {
        const mintAmount = toWei(1);
        await mintDDAI(mintAmount);

        const userDaiBalance = await mockDai.balanceOf.callAsync(user);
        const userDdaiBalance = await ddai.balanceOf.callAsync(user);
        const ddaiSupply = await ddai.totalSupply.callAsync();
        const moneyMarketDaiBalance = await mockDai.balanceOf.callAsync(mockIToken.address);
        const ddaiITokenBalance = await mockIToken.balanceOf.callAsync(ddai.address);
        
        expect(userDaiBalance, "User dai balance invalid").to.bignumber.eq(initialDaiAmount.minus(mintAmount));
        expect(userDdaiBalance, "User ddai balance invalid").to.bignumber.eq(mintAmount);
        expect(ddaiSupply, "Ddai supply invalid").to.bignumber.eq(mintAmount);
        expect(moneyMarketDaiBalance, "Money market dai balance invalid").to.bignumber.eq(mintAmount);
        expect(ddaiITokenBalance, "Ddai money market balance invalid").to.bignumber.eq(mintAmount);
    })

    it("Minting to other address should work", async() => {
        const mintAmount = toWei(1);
        await mintDDAI(mintAmount, accounts[1]);

        const userDaiBalance = await mockDai.balanceOf.callAsync(user);
        const userDdaiBalance = await ddai.balanceOf.callAsync(user);
        const receiverDdaiBalance = await ddai.balanceOf.callAsync(accounts[1]);
        const ddaiSupply = await ddai.totalSupply.callAsync();
        const moneyMarketDaiBalance = await mockDai.balanceOf.callAsync(mockIToken.address);
        const ddaiITokenBalance = await mockIToken.balanceOf.callAsync(ddai.address);

        expect(userDaiBalance, "User dai balance invalid").to.bignumber.eq(initialDaiAmount.minus(mintAmount));
        expect(receiverDdaiBalance, "Receiver ddai balance invalid").to.bignumber.eq(mintAmount);
        expect(userDdaiBalance, "User ddai balance invalid").to.bignumber.eq(0);
        expect(ddaiSupply, "Ddai supply invalid").to.bignumber.eq(mintAmount);
        expect(moneyMarketDaiBalance, "Money market dai balance invalid").to.bignumber.eq(mintAmount);
        expect(ddaiITokenBalance, "Ddai money market balance invalid").to.bignumber.eq(mintAmount);
    });

    it("Minting without approval or insufficient balance should fail", async() => {
        const mintAmount = toWei(2);

        const daiBalance = await mockDai.balanceOf.callAsync(user);
        await mockDai.transfer.sendTransactionAsync(
            accounts[1],
            daiBalance.minus(toWei(1))
        )
        
        await mockDai.approve.sendTransactionAsync(ddai.address, mintAmount);

        // User account now has 1 dai but needs 2 to mint so it should fail
        const promise = ddai.mint.sendTransactionAsync(user, mintAmount);
        return assert.isRejected(promise)
    });
    
    it("Redeeming DDAI should work", async() => {
        const mintAmount = toWei(1);
        await mintDDAI(mintAmount);
   
        // Simulate 10% interest
        await mockIToken.setTokenPrice.sendTransactionAsync(toWei(1.1));
        await ddai.redeem.sendTransactionAsync(user, mintAmount);
        
        const userDdaiBalance = await ddai.balanceOf.callAsync(user);
        const userDaiBalance = await mockDai.balanceOf.callAsync(user);
        const ddaiSupply = await ddai.totalSupply.callAsync();

        expect(userDdaiBalance, "User ddai balance should be only interest").to.bignumber.eq(toWei(0.1));
        // There is a 1 wei rounding error
        expect(userDaiBalance, "Dai balance invalid").to.bignumber.eq(initialDaiAmount.minus(1));
        expect(ddaiSupply, "Total ddai supply should be only interest").to.bignumber.eq(toWei(0.1));
    })

    it("Redeeming to other address should work", async() => {
        const mintAmount = toWei(1);
        await mintDDAI(mintAmount);

        await ddai.redeem.sendTransactionAsync(accounts[1], mintAmount);

        const userDdaiBalance = await ddai.balanceOf.callAsync(user);
        const userDaiBalance = await mockDai.balanceOf.callAsync(user);
        const receiverDaiBalance = await mockDai.balanceOf.callAsync(accounts[1])
        const ddaiSupply = await ddai.totalSupply.callAsync();

        expect(userDdaiBalance, "User ddai balance should be only interest").to.bignumber.eq(0);
        expect(userDaiBalance, "Dai balance invalid").to.bignumber.eq(initialDaiAmount.minus(mintAmount));
        expect(receiverDaiBalance, "Receiever dai balance invalid").to.bignumber.eq(mintAmount);
        expect(ddaiSupply, "Total ddai supply should be only interest").to.bignumber.eq(0);
    })

    it("Redeeming more than balance should redeem the full balance", async() => {
        const mintAmount = toWei(1);
        await mintDDAI(mintAmount);

        await ddai.redeem.sendTransactionAsync(user, mintAmount.times(1000));

        const userDdaiBalance = await ddai.balanceOf.callAsync(user);
        const userDaiBalance = await mockDai.balanceOf.callAsync(user);
        const ddaiSupply = await ddai.totalSupply.callAsync();

        expect(userDdaiBalance, "User ddai balance should be zero").to.bignumber.eq(0);
        expect(userDaiBalance, "User dai balance should be back to the initial dai balance").to.bignumber.eq(initialDaiAmount);
        expect(ddaiSupply, "Ddai supply should be zero").to.bignumber.eq(0)
    })

    it("Redeeming while there is not enough liquidity in the market should fail", async() => {
        const mintAmount = toWei(1);
        await mintDDAI(mintAmount);
        await mockIToken.setLiquidity.sendTransactionAsync(mintAmount.minus(2));
        const promise = ddai.redeem.sendTransactionAsync(user, mintAmount);

        return assert.isRejected(promise);
    })

    it("Calculating outstanding interest should work", async() => {
        const mintAmount = toWei(1);
        const interestAmount = toWei(0.2398932489);
        await mintDDAI(mintAmount);

        await mockIToken.setTokenPrice.sendTransactionAsync(mintAmount.plus(interestAmount));
        const outstandingInterest = await ddai.getOutStandingInterest.callAsync(user);
        expect(outstandingInterest, "Outstanding interest amount incorrect", interestAmount);
    })

    it("Adding a recipe when there are no recipes should work", async() => {
        const recipe = mockRecipes[0];
        await ddai.addRecipe.sendTransactionAsync(recipe.address, recipe.ratio, recipe.data);

        const recipes = await ddai.getRecipesOf.callAsync(user);
        expect(recipes[0][0].receiver, "Receiver incorrect").to.eq(recipe.address);
        expect(recipes[0][0].ratio, "Ratio incorrect").to.bignumber.eq(recipe.ratio);
        expect(recipes[0][0].data, "Data incorrect").to.eq(recipe.data);
        expect(recipes[1], "Total ratio incorrect").to.bignumber.eq(recipe.ratio);
    })

    it("Adding a recipe when there is already a recipe should work", async() => {
        const recipe1 = mockRecipes[0];
        const recipe2 = mockRecipes[1];

        await ddai.addRecipe.sendTransactionAsync(recipe1.address, recipe1.ratio, recipe1.data);
        await ddai.addRecipe.sendTransactionAsync(recipe2.address, recipe2.ratio, recipe2.data);

        const recipes = await ddai.getRecipesOf.callAsync(user);
        expect(recipes[0][0].receiver, "Receiver incorrect").to.eq(recipe1.address);
        expect(recipes[0][0].ratio, "Ratio incorrect").to.bignumber.eq(recipe1.ratio);
        expect(recipes[0][0].data, "Data incorrect").to.eq(recipe1.data);

        expect(recipes[0][1].receiver, "Receiver incorrect").to.eq(recipe2.address);
        expect(recipes[0][1].ratio, "Ratio incorrect").to.bignumber.eq(recipe2.ratio);
        expect(recipes[0][1].data, "Data incorrect").to.eq(recipe2.data);
        expect(recipes[1], "Total ratio incorrect").to.bignumber.eq(recipe1.ratio.plus(recipe2.ratio));
    })

    it("Removing a recipe when there is only one should work", async() => {
        const recipe = mockRecipes[0];
       
        await ddai.addRecipe.sendTransactionAsync(recipe.address, recipe.ratio, recipe.data);
        await ddai.removeRecipe.sendTransactionAsync(new BigNumber(0));

        const recipes = await ddai.getRecipesOf.callAsync(user);
        expect(recipes[0].length, "Recipes length should be zero").to.eq(0);
        expect(recipes[1], "Total ratio should be zero").to.bignumber.eq(0);
    })

    it("Removing a recipe from a other position than the end should work", async() => {
        const recipe1 = mockRecipes[0];
        const recipe2 = mockRecipes[1];
        const recipe3 = mockRecipes[2];

        await ddai.addRecipe.sendTransactionAsync(recipe1.address, recipe1.ratio, recipe1.data);
        await ddai.addRecipe.sendTransactionAsync(recipe2.address, recipe2.ratio, recipe2.data);
        await ddai.addRecipe.sendTransactionAsync(recipe3.address, recipe3.ratio, recipe3.data);

        await ddai.removeRecipe.sendTransactionAsync(new BigNumber(1));

        const recipes = await ddai.getRecipesOf.callAsync(user);
        expect(recipes[0].length, "There should now be 2 recipes").to.equal(2);
        
        expect(recipes[0][0].receiver, "Receiver incorrect").to.eq(recipe1.address);
        expect(recipes[0][0].ratio, "Ratio incorrect").to.bignumber.eq(recipe1.ratio);
        expect(recipes[0][0].data, "Data incorrect").to.eq(recipe1.data);

        expect(recipes[0][1].receiver, "Receiver incorrect").to.eq(recipe3.address);
        expect(recipes[0][1].ratio, "Ratio incorrect").to.bignumber.eq(recipe3.ratio);
        expect(recipes[0][1].data, "Data incorrect").to.eq(recipe3.data);

        expect(recipes[1]).to.bignumber.eq(recipe1.ratio.plus(recipe3.ratio));
    })

    it("Removing a recipe from the end should work", async() => {
        const recipe1 = mockRecipes[0];
        const recipe2 = mockRecipes[1];
        const recipe3 = mockRecipes[2];

        await ddai.addRecipe.sendTransactionAsync(recipe1.address, recipe1.ratio, recipe1.data);
        await ddai.addRecipe.sendTransactionAsync(recipe2.address, recipe2.ratio, recipe2.data);
        await ddai.addRecipe.sendTransactionAsync(recipe3.address, recipe3.ratio, recipe3.data);

        await ddai.removeRecipe.sendTransactionAsync(new BigNumber(1));

        const recipes = await ddai.getRecipesOf.callAsync(user);
        expect(recipes[0].length, "There should now be 2 recipes").to.equal(2);
        
        expect(recipes[0][0].receiver, "Receiver incorrect").to.eq(recipe1.address);
        expect(recipes[0][0].ratio, "Ratio incorrect").to.bignumber.eq(recipe1.ratio);
        expect(recipes[0][0].data, "Data incorrect").to.eq(recipe1.data);

        expect(recipes[0][1].receiver, "Receiver incorrect").to.eq(recipe3.address);
        expect(recipes[0][1].ratio, "Ratio incorrect").to.bignumber.eq(recipe3.ratio);
        expect(recipes[0][1].data, "Data incorrect").to.eq(recipe3.data);

        expect(recipes[1]).to.bignumber.eq(recipe1.ratio.plus(recipe3.ratio));
    })
    
    it("Setting multiple recipes at once should work", async() => {
        await setRecipes(3);

        const recipe1 = mockRecipes[0];
        const recipe2 = mockRecipes[1];
        const recipe3 = mockRecipes[2];

        const recipes = await ddai.getRecipesOf.callAsync(user);
        expect(recipes[0].length, "There should be 3 recipes").to.eq(3);
        
        expect(recipes[0][0].receiver, "Receiver incorrect").to.eq(recipe1.address);
        expect(recipes[0][0].ratio, "Ratio incorrect").to.bignumber.eq(recipe1.ratio);
        expect(recipes[0][0].data, "Data incorrect").to.eq(recipe1.data);

        expect(recipes[0][1].receiver, "Receiver incorrect").to.eq(recipe2.address);
        expect(recipes[0][1].ratio, "Ratio incorrect").to.bignumber.eq(recipe2.ratio);
        expect(recipes[0][1].data, "Data incorrect").to.eq(recipe2.data);

        expect(recipes[0][2].receiver, "Receiver incorrect").to.eq(recipe3.address);
        expect(recipes[0][2].ratio, "Ratio incorrect").to.bignumber.eq(recipe3.ratio);
        expect(recipes[0][2].data, "Data incorrect").to.eq(recipe3.data);

        expect(recipes[1]).to.bignumber.eq(recipe1.ratio.plus(recipe3.ratio).plus(recipe2.ratio));
    })

    it("Removing all recipes at once should work", async() => {
        await setRecipes(3);
        await ddai.clearRecipes.sendTransactionAsync();

        const recipes = await ddai.getRecipesOf.callAsync(user);

        expect(recipes[0].length, "Recipes length should be zero").to.eq(0);
        expect(recipes[1], "Total ratio should be zero").to.bignumber.eq(0);
    })
})

async function setRecipes(count: number) {

    const addresses:string[] = [];
    const ratios:BigNumber[] = [];
    const data:string[] = [];

    for(let i = 0; i < count; i ++) {
        addresses.push(mockRecipes[i].address);
        ratios.push(mockRecipes[i].ratio);
        data.push(mockRecipes[i].data);
    }

    await ddai.setRecipes.sendTransactionAsync(addresses, ratios, data);
}

async function mintDDAI(amount: number | BigNumber | string, receiver: string = user ) {
    const mintAmount = new BigNumber(amount);
    await mockDai.approve.sendTransactionAsync(ddai.address, mintAmount);
    await ddai.mint.sendTransactionAsync(
        receiver,
        mintAmount
    );
}