import chai, { expect, should, assert } from 'chai';
import { describe, before, beforeEach, after, it, setup, teardown } from 'mocha';
import chaiAsPromised from 'chai-as-promised';
import chaiBigNumber from 'chai-bignumber';
import {BigNumber} from '@0x/utils';
import { migrate } from '@ddai/migrations';
import * as wrappers from '@ddai/contract-wrappers';
import { getProvider, toWei } from '@ddai/utils';

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
let {pe, web3, coverageSubProvider} = getProvider(false, false);

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
        ({mockDai, mockIToken, mockKyberNetwork, ddai, buyTokenRecipe, buyPTokenRecipe, mockRecipe} = (await migrate()).contractInstances);
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
        // await coverageSubProvider.writeCoverageAsync();
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

    it("Minting and setting recipes in one transaction should work", async() => {
        const mintAmount = toWei(10);
        await mockDai.approve.sendTransactionAsync(ddai.address, mintAmount);

        const {addresses, ratios, data} = getRecipeParams(3);
        await ddai.mintAndSetRecipes.sendTransactionAsync(mintAmount, addresses, ratios, data);

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

    it("Claiming interest with no active recipes should work", async() => {
        const mintAmount = toWei(222.338);
        const newTokenPrice = toWei(2.349);
        await mintDDAI(mintAmount, accounts[1]);

        await mockIToken.setTokenPrice.sendTransactionAsync(newTokenPrice);
        await ddai.claimInterest.sendTransactionAsync(accounts[1]);

        const ddaiBalance = await ddai.balanceOf.callAsync(accounts[1]);
        const totalSupply = await ddai.balanceOf.callAsync(accounts[1]);

        const expectedAmount = mintAmount.times(newTokenPrice).div(10 ** 18);
        const stackSize = await ddai.getStack.callAsync(user);
        expect(ddaiBalance, "DDAI balance incorrect").to.bignumber.eq(expectedAmount);
        expect(totalSupply, "DDAI supply incorrect").to.bignumber.eq(expectedAmount);
        expect(stackSize, "Stack should be zero").to.bignumber.eq(0);
    })

    it("Claiming interest with an active recipe should push it to stack", async() => {
        const mintAmount = toWei(23.33993);
        const newTokenPrice = toWei(7.2);
        await mintDDAI(mintAmount);

        await setRecipes(1);
        await mockIToken.setTokenPrice.sendTransactionAsync(newTokenPrice);
        await ddai.claimInterest.sendTransactionAsync(user);

        const ddaiBalance = await ddai.balanceOf.callAsync(user);
        const stackSize = await ddai.getStack.callAsync(user);
        const totalSupply = await ddai.totalSupply.callAsync();
        const expectedAmount = mintAmount.times(newTokenPrice).div(10 ** 18);

        expect(ddaiBalance, "DDAI balance incorrect").to.bignumber.eq(mintAmount); 
        expect(stackSize, "Stacksize incorrect").to.bignumber.eq(expectedAmount.minus(mintAmount));
        expect(totalSupply, "DDAI supply incorrect").to.bignumber.eq(expectedAmount);
    })
    
    it("Distributing stack to non smart contract addresses should work", async() => {
        const mintAmount = toWei(14.39448);
        const newTokenPrice = toWei(4.348453);
        const recipe1 = mockRecipes[0];
        const recipe2 = mockRecipes[1];
        const recipe3 = mockRecipes[2];
        await mintDDAI(mintAmount);

        await setRecipes(3);
        await mockIToken.setTokenPrice.sendTransactionAsync(newTokenPrice);
        await ddai.distributeStack.sendTransactionAsync(user);

        const ddaiBalance = await ddai.balanceOf.callAsync(user);
        const stackSize = await ddai.getStack.callAsync(user);
        const totalSupply = await ddai.totalSupply.callAsync();
        const expectedAmount = mintAmount.times(newTokenPrice).div(10 ** 18);
        const distributedStack = expectedAmount.minus(mintAmount);

        const recipe1Balance = await ddai.balanceOf.callAsync(recipe1.address);
        const recipe2Balance = await ddai.balanceOf.callAsync(recipe2.address);
        const recipe3Balance = await ddai.balanceOf.callAsync(recipe3.address);

        const totalRatio = recipe1.ratio.plus(recipe2.ratio).plus(recipe3.ratio);
        // TODO check if these rounding errors are a problem or not
        // 2 off because of rounding
        expect(ddaiBalance, "DDAI balance incorrect").to.bignumber.eq(mintAmount.plus(2));
        expect(stackSize, "Stack size incorrect").to.bignumber.eq(0);
        expect(totalSupply, "Total supply incorrect").to.bignumber.eq(expectedAmount);
        expect(recipe1Balance, "Recipe 1 balance incorrect").to.bignumber.eq(distributedStack.times(recipe1.ratio).div(totalRatio).integerValue(BigNumber.ROUND_DOWN));
        expect(recipe2Balance, "Recipe 2 balance incorrect").to.bignumber.eq(distributedStack.times(recipe2.ratio).div(totalRatio).integerValue(BigNumber.ROUND_DOWN));
        expect(recipe3Balance, "Recipe 3 balance incorrect").to.bignumber.eq(distributedStack.times(recipe3.ratio).div(totalRatio).integerValue(BigNumber.ROUND_DOWN));
    })

    it("Distributing the stack to a smart contract address which registered a callback should work", async() => {
        const mintAmount = toWei(100);
        const newTokenPrice = toWei(2.43);
        const ratio = new BigNumber(100);
        const data = "0x1337dede"

        const expectedAmount = mintAmount.times(newTokenPrice).div(10 ** 18);
        const stackAmount = expectedAmount.minus(mintAmount);
        
        await ddai.addRecipe.sendTransactionAsync(mockRecipe.address, ratio, data);
        await mintDDAI(mintAmount);
        await mockIToken.setTokenPrice.sendTransactionAsync(newTokenPrice);
        await ddai.distributeStack.sendTransactionAsync(user);

        const recipeBalance = await ddai.balanceOf.callAsync(mockRecipe.address);
    
        const operator = await mockRecipe.operator.callAsync();
        const from = await mockRecipe.from.callAsync();
        const to = await mockRecipe.to.callAsync();
        const amount = await mockRecipe.amount.callAsync();
        const userData = await mockRecipe.userData.callAsync();
        const operatorData = await mockRecipe.operatorData.callAsync();

        expect(operator, "Operator incorrect").to.eq(ddai.address);
        expect(from, "From incorrect").to.eq(user);
        expect(to, "To incorrect").to.eq(mockRecipe.address);
        expect(amount, "Amount incorrect").to.bignumber.eq(stackAmount);
        expect(userData, "UserData incorrect").to.eq(data);
        expect(operatorData, "OperatorData incorrect").to.eq("0x");
        expect(recipeBalance).to.bignumber.eq(stackAmount);
    })

    it("Setting stack from same address should work", async() => {
        const stackAmount = toWei(100);
        await ddai.setStack.sendTransactionAsync(user, stackAmount);

        const stackSize = await ddai.getStack.callAsync(user);
        expect(stackSize, "Stack size incorrect").to.bignumber.eq(stackAmount);
    })

    it("Setting stack for another address when not allowed should fail", async() => {
        const stackAmount = toWei(100);
        const promise = ddai.setStack.sendTransactionAsync(accounts[1], stackAmount);
        return assert.isRejected(promise);
    })

    it("Setting stack for another address when allowed should work", async() => {
        const stackAmount = toWei(100);
        await ddai.setStackApproved.sendTransactionAsync(user, true, {from: accounts[1]});
        await ddai.setStack.sendTransactionAsync(accounts[1], stackAmount);

        const stackSize = await ddai.getStack.callAsync(accounts[1]);
        expect(stackSize, "Stack size invalid").to.bignumber.eq(stackAmount);
    })

    // Zero transfer should always work as this allows for calling other contracts from ddai paying gas in ddai
    // Possibly doing smart contract wallet functionality
    it("Tranferring zero should work", async() => {
        await mintDDAI(toWei(10));
        await ddai.transfer.sendTransactionAsync(accounts[1], toWei(0));
    })

    it("Setting receive to stack should work", async() => {
        const receiveToStackBefore = (await ddai.accountDataOf.callAsync(user))[3];
        await ddai.setReceiveToStack.sendTransactionAsync(true);
        const receiveToStackBetween = (await ddai.accountDataOf.callAsync(user))[3];
        await ddai.setReceiveToStack.sendTransactionAsync(false);
        const receiveToStackAfter = (await ddai.accountDataOf.callAsync(user))[3];

        expect(receiveToStackBefore, "receiveToStackBefore should be false").to.eq(false);
        expect(receiveToStackBetween, "receiveToStackBetween should be false").to.eq(true);
        expect(receiveToStackAfter, "receiveToStackAfter should be false").to.eq(false);
    })

    it("Receiving ddai when receive to stack is false should not add it to the stack", async() => {
        const mintAmount = toWei(10)
        await mintDDAI(mintAmount);

        ddai.transfer.sendTransactionAsync(accounts[1], mintAmount);
        const stackSize = await ddai.getStack.callAsync(accounts[1]);
        const balance = await ddai.balanceOf.callAsync(accounts[1]);

        expect(stackSize, "Stack invalid").to.bignumber.eq(0);
        expect(balance, "Balance invalid").to.bignumber.eq(mintAmount);
    })

    it("Receiving ddai to stack when receive to stack is set should work", async() => {
        const mintAmount = toWei(100.92929);
        await mintDDAI(mintAmount);
        await ddai.setReceiveToStack.sendTransactionAsync(true, {from: accounts[1]});

        await ddai.transfer.sendTransactionAsync(accounts[1], mintAmount);
        const stackSize = await ddai.getStack.callAsync(accounts[1]);
        const balance = await ddai.balanceOf.callAsync(accounts[1]);

        expect(stackSize, "Stack invalid").to.bignumber.eq(mintAmount);
        expect(balance, "Balance invalid").to.bignumber.eq(0);
    })

    it("Getting interest rate should work", async() => {
        const supplyInterestRateDDAI = await ddai.supplyInterestRate.callAsync();
        const interestRateSupplyMoneyMarket = await mockIToken.supplyInterestRate.callAsync();

        expect(supplyInterestRateDDAI, "Interest rate mismatch").to.bignumber.eq(interestRateSupplyMoneyMarket);
    })
})

function getRecipeParams(count:number) {
    const addresses:string[] = [];
    const ratios:BigNumber[] = [];
    const data:string[] = [];

    for(let i = 0; i < count; i ++) {
        addresses.push(mockRecipes[i].address);
        ratios.push(mockRecipes[i].ratio);
        data.push(mockRecipes[i].data);
    }
    return({addresses, ratios, data});
}

async function setRecipes(count: number) {
    const {addresses, ratios, data} = getRecipeParams(count);
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