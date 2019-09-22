// tslint:disable:no-consecutive-blank-lines ordered-imports align trailing-comma whitespace class-name
// tslint:disable:no-unused-variable
// tslint:disable:no-unbound-method
import { BaseContract } from '@0x/base-contract';
import { BlockParam, BlockParamLiteral, CallData, ContractAbi, ContractArtifact, DecodedLogArgs, MethodAbi, Provider, TxData, TxDataPayable } from 'ethereum-types';
import { BigNumber, classUtils, logUtils } from '@0x/utils';
import { SimpleContractArtifact } from '@0x/types';
import { Web3Wrapper } from '@0x/web3-wrapper';
import * as ethers from 'ethers';
import * as _ from 'lodash';
// tslint:enable:no-unused-variable

export type DDAIGSNBouncerEventArgs =
    | DDAIGSNBouncerTransferEventArgs
    | DDAIGSNBouncerApprovalEventArgs
    | DDAIGSNBouncerSentEventArgs
    | DDAIGSNBouncerMintedEventArgs
    | DDAIGSNBouncerBurnedEventArgs
    | DDAIGSNBouncerAuthorizedOperatorEventArgs
    | DDAIGSNBouncerRevokedOperatorEventArgs
    | DDAIGSNBouncerRelayHubChangedEventArgs
    | DDAIGSNBouncerDDAIMintedEventArgs
    | DDAIGSNBouncerDDAIRedeemedEventArgs
    | DDAIGSNBouncerRecipeAddedEventArgs
    | DDAIGSNBouncerRecipeRemovedEventArgs
    | DDAIGSNBouncerInterestClaimedEventArgs
    | DDAIGSNBouncerStackDistributedEventArgs;

export enum DDAIGSNBouncerEvents {
    Transfer = 'Transfer',
    Approval = 'Approval',
    Sent = 'Sent',
    Minted = 'Minted',
    Burned = 'Burned',
    AuthorizedOperator = 'AuthorizedOperator',
    RevokedOperator = 'RevokedOperator',
    RelayHubChanged = 'RelayHubChanged',
    DDAIMinted = 'DDAIMinted',
    DDAIRedeemed = 'DDAIRedeemed',
    RecipeAdded = 'RecipeAdded',
    RecipeRemoved = 'RecipeRemoved',
    InterestClaimed = 'InterestClaimed',
    StackDistributed = 'StackDistributed',
}

export interface DDAIGSNBouncerTransferEventArgs extends DecodedLogArgs {
    from: string;
    to: string;
    value: BigNumber;
}

export interface DDAIGSNBouncerApprovalEventArgs extends DecodedLogArgs {
    owner: string;
    spender: string;
    value: BigNumber;
}

export interface DDAIGSNBouncerSentEventArgs extends DecodedLogArgs {
    operator: string;
    from: string;
    to: string;
    amount: BigNumber;
    data: string;
    operatorData: string;
}

export interface DDAIGSNBouncerMintedEventArgs extends DecodedLogArgs {
    operator: string;
    to: string;
    amount: BigNumber;
    data: string;
    operatorData: string;
}

export interface DDAIGSNBouncerBurnedEventArgs extends DecodedLogArgs {
    operator: string;
    from: string;
    amount: BigNumber;
    data: string;
    operatorData: string;
}

export interface DDAIGSNBouncerAuthorizedOperatorEventArgs extends DecodedLogArgs {
    operator: string;
    tokenHolder: string;
}

export interface DDAIGSNBouncerRevokedOperatorEventArgs extends DecodedLogArgs {
    operator: string;
    tokenHolder: string;
}

export interface DDAIGSNBouncerRelayHubChangedEventArgs extends DecodedLogArgs {
    oldRelayHub: string;
    newRelayHub: string;
}

export interface DDAIGSNBouncerDDAIMintedEventArgs extends DecodedLogArgs {
    _receiver: string;
    _amount: BigNumber;
    _operator: string;
}

export interface DDAIGSNBouncerDDAIRedeemedEventArgs extends DecodedLogArgs {
    _receiver: string;
    _amount: BigNumber;
    _operator: string;
}

export interface DDAIGSNBouncerRecipeAddedEventArgs extends DecodedLogArgs {
    _account: string;
    _receiver: string;
    _ratio: BigNumber;
    _data: string;
    _index: BigNumber;
}

export interface DDAIGSNBouncerRecipeRemovedEventArgs extends DecodedLogArgs {
    _account: string;
    _receiver: string;
    _ratio: BigNumber;
    _data: string;
    _index: BigNumber;
}

export interface DDAIGSNBouncerInterestClaimedEventArgs extends DecodedLogArgs {
    _receiver: string;
    _interestEarned: BigNumber;
}

export interface DDAIGSNBouncerStackDistributedEventArgs extends DecodedLogArgs {
    _receiver: string;
    _amount: BigNumber;
}


/* istanbul ignore next */
// tslint:disable:no-parameter-reassignment
// tslint:disable-next-line:class-name
export class DDAIGSNBouncerContract extends BaseContract {
    public defaultOperators = {
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<string[]
        > {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('defaultOperators()', []);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('defaultOperators()');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<string[]
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public name = {
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<string
        > {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('name()', []);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('name()');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<string
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public approve = {
        async sendTransactionAsync(
            spender: string,
            value: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('approve(address,uint256)', [spender,
    value
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.approve.estimateGasAsync.bind(
                    self,
                    spender,
                    value
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            spender: string,
            value: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('approve(address,uint256)', [spender,
    value
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            spender: string,
            value: BigNumber,
        ): string {
            const self = this as any as DDAIGSNBouncerContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('approve(address,uint256)', [spender,
    value
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            spender: string,
            value: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<boolean
        > {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('approve(address,uint256)', [spender,
        value
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('approve(address,uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<boolean
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public totalSupply = {
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('totalSupply()', []);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('totalSupply()');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<BigNumber
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public clearRecipes = {
        async sendTransactionAsync(
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('clearRecipes()', []);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.clearRecipes.estimateGasAsync.bind(
                    self,
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('clearRecipes()', []);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
        ): string {
            const self = this as any as DDAIGSNBouncerContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('clearRecipes()', []);
            return abiEncodedTransactionData;
        },
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('clearRecipes()', []);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('clearRecipes()');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public redeem = {
        async sendTransactionAsync(
            _receiver: string,
            _amount: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('redeem(address,uint256)', [_receiver,
    _amount
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.redeem.estimateGasAsync.bind(
                    self,
                    _receiver,
                    _amount
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            _receiver: string,
            _amount: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('redeem(address,uint256)', [_receiver,
    _amount
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            _receiver: string,
            _amount: BigNumber,
        ): string {
            const self = this as any as DDAIGSNBouncerContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('redeem(address,uint256)', [_receiver,
    _amount
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            _receiver: string,
            _amount: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('redeem(address,uint256)', [_receiver,
        _amount
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('redeem(address,uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<BigNumber
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public distributeStack = {
        async sendTransactionAsync(
            _account: string,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('distributeStack(address)', [_account
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.distributeStack.estimateGasAsync.bind(
                    self,
                    _account
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            _account: string,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('distributeStack(address)', [_account
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            _account: string,
        ): string {
            const self = this as any as DDAIGSNBouncerContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('distributeStack(address)', [_account
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            _account: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('distributeStack(address)', [_account
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('distributeStack(address)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public transferFrom = {
        async sendTransactionAsync(
            holder: string,
            recipient: string,
            amount: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('transferFrom(address,address,uint256)', [holder,
    recipient,
    amount
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.transferFrom.estimateGasAsync.bind(
                    self,
                    holder,
                    recipient,
                    amount
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            holder: string,
            recipient: string,
            amount: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('transferFrom(address,address,uint256)', [holder,
    recipient,
    amount
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            holder: string,
            recipient: string,
            amount: BigNumber,
        ): string {
            const self = this as any as DDAIGSNBouncerContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('transferFrom(address,address,uint256)', [holder,
    recipient,
    amount
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            holder: string,
            recipient: string,
            amount: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<boolean
        > {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('transferFrom(address,address,uint256)', [holder,
        recipient,
        amount
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('transferFrom(address,address,uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<boolean
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public getStack = {
        async callAsync(
            _account: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('getStack(address)', [_account
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('getStack(address)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<BigNumber
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public decimals = {
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('decimals()', []);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('decimals()');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<BigNumber
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public setStackApproved = {
        async sendTransactionAsync(
            _account: string,
            _allowed: boolean,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('setStackApproved(address,bool)', [_account,
    _allowed
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.setStackApproved.estimateGasAsync.bind(
                    self,
                    _account,
                    _allowed
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            _account: string,
            _allowed: boolean,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('setStackApproved(address,bool)', [_account,
    _allowed
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            _account: string,
            _allowed: boolean,
        ): string {
            const self = this as any as DDAIGSNBouncerContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('setStackApproved(address,bool)', [_account,
    _allowed
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            _account: string,
            _allowed: boolean,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('setStackApproved(address,bool)', [_account,
        _allowed
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('setStackApproved(address,bool)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public mint = {
        async sendTransactionAsync(
            _receiver: string,
            _amount: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('mint(address,uint256)', [_receiver,
    _amount
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.mint.estimateGasAsync.bind(
                    self,
                    _receiver,
                    _amount
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            _receiver: string,
            _amount: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('mint(address,uint256)', [_receiver,
    _amount
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            _receiver: string,
            _amount: BigNumber,
        ): string {
            const self = this as any as DDAIGSNBouncerContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('mint(address,uint256)', [_receiver,
    _amount
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            _receiver: string,
            _amount: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('mint(address,uint256)', [_receiver,
        _amount
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('mint(address,uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public granularity = {
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('granularity()', []);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('granularity()');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<BigNumber
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public addRecipe = {
        async sendTransactionAsync(
            _receiver: string,
            _ratio: BigNumber,
            _data: string,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('addRecipe(address,uint256,bytes)', [_receiver,
    _ratio,
    _data
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.addRecipe.estimateGasAsync.bind(
                    self,
                    _receiver,
                    _ratio,
                    _data
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            _receiver: string,
            _ratio: BigNumber,
            _data: string,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('addRecipe(address,uint256,bytes)', [_receiver,
    _ratio,
    _data
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            _receiver: string,
            _ratio: BigNumber,
            _data: string,
        ): string {
            const self = this as any as DDAIGSNBouncerContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('addRecipe(address,uint256,bytes)', [_receiver,
    _ratio,
    _data
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            _receiver: string,
            _ratio: BigNumber,
            _data: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<boolean
        > {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('addRecipe(address,uint256,bytes)', [_receiver,
        _ratio,
        _data
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('addRecipe(address,uint256,bytes)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<boolean
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public operatorSend = {
        async sendTransactionAsync(
            sender: string,
            recipient: string,
            amount: BigNumber,
            data: string,
            operatorData: string,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('operatorSend(address,address,uint256,bytes,bytes)', [sender,
    recipient,
    amount,
    data,
    operatorData
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.operatorSend.estimateGasAsync.bind(
                    self,
                    sender,
                    recipient,
                    amount,
                    data,
                    operatorData
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            sender: string,
            recipient: string,
            amount: BigNumber,
            data: string,
            operatorData: string,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('operatorSend(address,address,uint256,bytes,bytes)', [sender,
    recipient,
    amount,
    data,
    operatorData
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            sender: string,
            recipient: string,
            amount: BigNumber,
            data: string,
            operatorData: string,
        ): string {
            const self = this as any as DDAIGSNBouncerContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('operatorSend(address,address,uint256,bytes,bytes)', [sender,
    recipient,
    amount,
    data,
    operatorData
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            sender: string,
            recipient: string,
            amount: BigNumber,
            data: string,
            operatorData: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('operatorSend(address,address,uint256,bytes,bytes)', [sender,
        recipient,
        amount,
        data,
        operatorData
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('operatorSend(address,address,uint256,bytes,bytes)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public getEthprice = {
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('getEthprice()', []);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('getEthprice()');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<BigNumber
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public balanceOf = {
        async callAsync(
            _account: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('balanceOf(address)', [_account
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('balanceOf(address)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<BigNumber
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public priceFeed = {
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<string
        > {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('priceFeed()', []);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('priceFeed()');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<string
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public getHubAddr = {
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<string
        > {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('getHubAddr()', []);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('getHubAddr()');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<string
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public accountDataOf = {
        async callAsync(
            index_0: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<[BigNumber, BigNumber, BigNumber]
        > {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('accountDataOf(address)', [index_0
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('accountDataOf(address)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<[BigNumber, BigNumber, BigNumber]
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public calcTokenAmount = {
        async callAsync(
            _ethAmount: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('calcTokenAmount(uint256)', [_ethAmount
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('calcTokenAmount(uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<BigNumber
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public preRelayedCall = {
        async sendTransactionAsync(
            context: string,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('preRelayedCall(bytes)', [context
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.preRelayedCall.estimateGasAsync.bind(
                    self,
                    context
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            context: string,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('preRelayedCall(bytes)', [context
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            context: string,
        ): string {
            const self = this as any as DDAIGSNBouncerContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('preRelayedCall(bytes)', [context
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            context: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<string
        > {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('preRelayedCall(bytes)', [context
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('preRelayedCall(bytes)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<string
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public removeRecipe = {
        async sendTransactionAsync(
            _index: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('removeRecipe(uint256)', [_index
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.removeRecipe.estimateGasAsync.bind(
                    self,
                    _index
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            _index: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('removeRecipe(uint256)', [_index
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            _index: BigNumber,
        ): string {
            const self = this as any as DDAIGSNBouncerContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('removeRecipe(uint256)', [_index
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            _index: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<boolean
        > {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('removeRecipe(uint256)', [_index
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('removeRecipe(uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<boolean
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public acceptRelayedCall = {
        async callAsync(
            _relay: string,
            _from: string,
            _encodedFunction: string,
            _transactionFee: BigNumber,
            _gasPrice: BigNumber,
            _gasLimit: BigNumber,
            _nonce: BigNumber,
            _approvalData: string,
            _maxPossibleCharge: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<[BigNumber, string]
        > {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('acceptRelayedCall(address,address,bytes,uint256,uint256,uint256,uint256,bytes,uint256)', [_relay,
        _from,
        _encodedFunction,
        _transactionFee,
        _gasPrice,
        _gasLimit,
        _nonce,
        _approvalData,
        _maxPossibleCharge
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('acceptRelayedCall(address,address,bytes,uint256,uint256,uint256,uint256,bytes,uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<[BigNumber, string]
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public claimInterest = {
        async sendTransactionAsync(
            _receiver: string,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('claimInterest(address)', [_receiver
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.claimInterest.estimateGasAsync.bind(
                    self,
                    _receiver
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            _receiver: string,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('claimInterest(address)', [_receiver
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            _receiver: string,
        ): string {
            const self = this as any as DDAIGSNBouncerContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('claimInterest(address)', [_receiver
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            _receiver: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('claimInterest(address)', [_receiver
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('claimInterest(address)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public setStack = {
        async sendTransactionAsync(
            _account: string,
            _amount: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('setStack(address,uint256)', [_account,
    _amount
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.setStack.estimateGasAsync.bind(
                    self,
                    _account,
                    _amount
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            _account: string,
            _amount: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('setStack(address,uint256)', [_account,
    _amount
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            _account: string,
            _amount: BigNumber,
        ): string {
            const self = this as any as DDAIGSNBouncerContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('setStack(address,uint256)', [_account,
    _amount
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            _account: string,
            _amount: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('setStack(address,uint256)', [_account,
        _amount
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('setStack(address,uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public getOutStandingInterest = {
        async callAsync(
            _account: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('getOutStandingInterest(address)', [_account
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('getOutStandingInterest(address)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<BigNumber
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public authorizeOperator = {
        async sendTransactionAsync(
            operator: string,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('authorizeOperator(address)', [operator
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.authorizeOperator.estimateGasAsync.bind(
                    self,
                    operator
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            operator: string,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('authorizeOperator(address)', [operator
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            operator: string,
        ): string {
            const self = this as any as DDAIGSNBouncerContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('authorizeOperator(address)', [operator
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            operator: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('authorizeOperator(address)', [operator
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('authorizeOperator(address)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public symbol = {
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<string
        > {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('symbol()', []);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('symbol()');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<string
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public send = {
        async sendTransactionAsync(
            recipient: string,
            amount: BigNumber,
            data: string,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('send(address,uint256,bytes)', [recipient,
    amount,
    data
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.send.estimateGasAsync.bind(
                    self,
                    recipient,
                    amount,
                    data
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            recipient: string,
            amount: BigNumber,
            data: string,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('send(address,uint256,bytes)', [recipient,
    amount,
    data
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            recipient: string,
            amount: BigNumber,
            data: string,
        ): string {
            const self = this as any as DDAIGSNBouncerContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('send(address,uint256,bytes)', [recipient,
    amount,
    data
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            recipient: string,
            amount: BigNumber,
            data: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('send(address,uint256,bytes)', [recipient,
        amount,
        data
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('send(address,uint256,bytes)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public setRecipes = {
        async sendTransactionAsync(
            _receivers: string[],
            _ratios: BigNumber[],
            _data: string[],
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('setRecipes(address[],uint256[],bytes[])', [_receivers,
    _ratios,
    _data
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.setRecipes.estimateGasAsync.bind(
                    self,
                    _receivers,
                    _ratios,
                    _data
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            _receivers: string[],
            _ratios: BigNumber[],
            _data: string[],
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('setRecipes(address[],uint256[],bytes[])', [_receivers,
    _ratios,
    _data
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            _receivers: string[],
            _ratios: BigNumber[],
            _data: string[],
        ): string {
            const self = this as any as DDAIGSNBouncerContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('setRecipes(address[],uint256[],bytes[])', [_receivers,
    _ratios,
    _data
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            _receivers: string[],
            _ratios: BigNumber[],
            _data: string[],
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('setRecipes(address[],uint256[],bytes[])', [_receivers,
        _ratios,
        _data
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('setRecipes(address[],uint256[],bytes[])');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public transfer = {
        async sendTransactionAsync(
            recipient: string,
            amount: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('transfer(address,uint256)', [recipient,
    amount
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.transfer.estimateGasAsync.bind(
                    self,
                    recipient,
                    amount
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            recipient: string,
            amount: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('transfer(address,uint256)', [recipient,
    amount
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            recipient: string,
            amount: BigNumber,
        ): string {
            const self = this as any as DDAIGSNBouncerContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('transfer(address,uint256)', [recipient,
    amount
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            recipient: string,
            amount: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<boolean
        > {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('transfer(address,uint256)', [recipient,
        amount
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('transfer(address,uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<boolean
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public relayHubVersion = {
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<string
        > {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('relayHubVersion()', []);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('relayHubVersion()');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<string
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public getRecipesOf = {
        async callAsync(
            _account: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<[Array<{receiver: string;ratio: BigNumber;data: string}>, BigNumber]
        > {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('getRecipesOf(address)', [_account
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('getRecipesOf(address)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<[Array<{receiver: string;ratio: BigNumber;data: string}>, BigNumber]
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public getTotalBalance = {
        async callAsync(
            _account: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('getTotalBalance(address)', [_account
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('getTotalBalance(address)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<BigNumber
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public moneyMarket = {
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<string
        > {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('moneyMarket()', []);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('moneyMarket()');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<string
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public isOperatorFor = {
        async callAsync(
            operator: string,
            tokenHolder: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<boolean
        > {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('isOperatorFor(address,address)', [operator,
        tokenHolder
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('isOperatorFor(address,address)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<boolean
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public allowance = {
        async callAsync(
            holder: string,
            spender: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('allowance(address,address)', [holder,
        spender
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('allowance(address,address)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<BigNumber
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public postRelayedCall = {
        async sendTransactionAsync(
            context: string,
            success: boolean,
            actualCharge: BigNumber,
            preRetVal: string,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('postRelayedCall(bytes,bool,uint256,bytes32)', [context,
    success,
    actualCharge,
    preRetVal
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.postRelayedCall.estimateGasAsync.bind(
                    self,
                    context,
                    success,
                    actualCharge,
                    preRetVal
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            context: string,
            success: boolean,
            actualCharge: BigNumber,
            preRetVal: string,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('postRelayedCall(bytes,bool,uint256,bytes32)', [context,
    success,
    actualCharge,
    preRetVal
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            context: string,
            success: boolean,
            actualCharge: BigNumber,
            preRetVal: string,
        ): string {
            const self = this as any as DDAIGSNBouncerContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('postRelayedCall(bytes,bool,uint256,bytes32)', [context,
    success,
    actualCharge,
    preRetVal
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            context: string,
            success: boolean,
            actualCharge: BigNumber,
            preRetVal: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('postRelayedCall(bytes,bool,uint256,bytes32)', [context,
        success,
        actualCharge,
        preRetVal
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('postRelayedCall(bytes,bool,uint256,bytes32)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public revokeOperator = {
        async sendTransactionAsync(
            operator: string,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('revokeOperator(address)', [operator
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.revokeOperator.estimateGasAsync.bind(
                    self,
                    operator
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            operator: string,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('revokeOperator(address)', [operator
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            operator: string,
        ): string {
            const self = this as any as DDAIGSNBouncerContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('revokeOperator(address)', [operator
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            operator: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('revokeOperator(address)', [operator
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('revokeOperator(address)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public token = {
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<string
        > {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('token()', []);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('token()');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<string
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public operatorBurn = {
        async sendTransactionAsync(
            account: string,
            amount: BigNumber,
            data: string,
            operatorData: string,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('operatorBurn(address,uint256,bytes,bytes)', [account,
    amount,
    data,
    operatorData
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.operatorBurn.estimateGasAsync.bind(
                    self,
                    account,
                    amount,
                    data,
                    operatorData
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            account: string,
            amount: BigNumber,
            data: string,
            operatorData: string,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('operatorBurn(address,uint256,bytes,bytes)', [account,
    amount,
    data,
    operatorData
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            account: string,
            amount: BigNumber,
            data: string,
            operatorData: string,
        ): string {
            const self = this as any as DDAIGSNBouncerContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('operatorBurn(address,uint256,bytes,bytes)', [account,
    amount,
    data,
    operatorData
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            account: string,
            amount: BigNumber,
            data: string,
            operatorData: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('operatorBurn(address,uint256,bytes,bytes)', [account,
        amount,
        data,
        operatorData
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('operatorBurn(address,uint256,bytes,bytes)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public burn = {
        async sendTransactionAsync(
            amount: BigNumber,
            data: string,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('burn(uint256,bytes)', [amount,
    data
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.burn.estimateGasAsync.bind(
                    self,
                    amount,
                    data
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            amount: BigNumber,
            data: string,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('burn(uint256,bytes)', [amount,
    data
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            amount: BigNumber,
            data: string,
        ): string {
            const self = this as any as DDAIGSNBouncerContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('burn(uint256,bytes)', [amount,
    data
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            amount: BigNumber,
            data: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as DDAIGSNBouncerContract;
            const encodedData = self._strictEncodeArguments('burn(uint256,bytes)', [amount,
        data
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('burn(uint256,bytes)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public static async deployFrom0xArtifactAsync(
        artifact: ContractArtifact | SimpleContractArtifact | any,
        provider: Provider,
        txDefaults: Partial<TxData>,
            _moneyMarket: string,
            _token: string,
            _name: string,
            _symbol: string,
            _operators: string[],
            _priceFeed: string,
    ): Promise<DDAIGSNBouncerContract> {
        if (_.isUndefined(artifact.compilerOutput)) {
            throw new Error('Compiler output not found in the artifact file');
        }
        const bytecode = artifact.compilerOutput.evm.bytecode.object;
        const abi = artifact.compilerOutput.abi;
        return DDAIGSNBouncerContract.deployAsync(bytecode, abi, provider, txDefaults, _moneyMarket,
_token,
_name,
_symbol,
_operators,
_priceFeed
);
    }
    public static async deployAsync(
        bytecode: string,
        abi: ContractAbi,
        provider: Provider,
        txDefaults: Partial<TxData>,
            _moneyMarket: string,
            _token: string,
            _name: string,
            _symbol: string,
            _operators: string[],
            _priceFeed: string,
    ): Promise<DDAIGSNBouncerContract> {
        const constructorAbi = BaseContract._lookupConstructorAbi(abi);
        [_moneyMarket,
_token,
_name,
_symbol,
_operators,
_priceFeed
] = BaseContract._formatABIDataItemList(
            constructorAbi.inputs,
            [_moneyMarket,
_token,
_name,
_symbol,
_operators,
_priceFeed
],
            BaseContract._bigNumberToString,
        );
        const iface = new ethers.utils.Interface(abi);
        const deployInfo = iface.deployFunction;
        const txData = deployInfo.encode(bytecode, [_moneyMarket,
_token,
_name,
_symbol,
_operators,
_priceFeed
]);
        const web3Wrapper = new Web3Wrapper(provider);
        const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
            {data: txData},
            txDefaults,
            web3Wrapper.estimateGasAsync.bind(web3Wrapper),
        );
        const txHash = await web3Wrapper.sendTransactionAsync(txDataWithDefaults);
        const txReceipt = await web3Wrapper.awaitTransactionSuccessAsync(txHash);
        const contractInstance = new DDAIGSNBouncerContract(abi, txReceipt.contractAddress as string, provider, txDefaults);
        contractInstance.constructorArgs = [_moneyMarket,
_token,
_name,
_symbol,
_operators,
_priceFeed
];
        return contractInstance;
    }
    constructor(abi: ContractAbi, address: string, provider: Provider, txDefaults?: Partial<TxData>) {
        super('DDAIGSNBouncer', abi, address, provider, txDefaults);
        classUtils.bindAll(this, ['_abiEncoderByFunctionSignature', 'address', 'abi', '_web3Wrapper']);
    }
} // tslint:disable:max-file-line-count
// tslint:enable:no-unbound-method
