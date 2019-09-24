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

export type MockTokenEventArgs =
    | MockTokenTransferEventArgs
    | MockTokenApprovalEventArgs;

export enum MockTokenEvents {
    Transfer = 'Transfer',
    Approval = 'Approval',
}

export interface MockTokenTransferEventArgs extends DecodedLogArgs {
    from: string;
    to: string;
    value: BigNumber;
}

export interface MockTokenApprovalEventArgs extends DecodedLogArgs {
    owner: string;
    spender: string;
    value: BigNumber;
}


/* istanbul ignore next */
// tslint:disable:no-parameter-reassignment
// tslint:disable-next-line:class-name
export class MockTokenContract extends BaseContract {
    public approve = {
        async sendTransactionAsync(
            spender: string,
            amount: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as MockTokenContract;
            const encodedData = self._strictEncodeArguments('approve(address,uint256)', [spender,
    amount
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
                    amount
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            spender: string,
            amount: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as MockTokenContract;
            const encodedData = self._strictEncodeArguments('approve(address,uint256)', [spender,
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
            spender: string,
            amount: BigNumber,
        ): string {
            const self = this as any as MockTokenContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('approve(address,uint256)', [spender,
    amount
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            spender: string,
            amount: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<boolean
        > {
            const self = this as any as MockTokenContract;
            const encodedData = self._strictEncodeArguments('approve(address,uint256)', [spender,
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
            const self = this as any as MockTokenContract;
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
    public transferFrom = {
        async sendTransactionAsync(
            sender: string,
            recipient: string,
            amount: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as MockTokenContract;
            const encodedData = self._strictEncodeArguments('transferFrom(address,address,uint256)', [sender,
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
                    sender,
                    recipient,
                    amount
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            sender: string,
            recipient: string,
            amount: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as MockTokenContract;
            const encodedData = self._strictEncodeArguments('transferFrom(address,address,uint256)', [sender,
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
            sender: string,
            recipient: string,
            amount: BigNumber,
        ): string {
            const self = this as any as MockTokenContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('transferFrom(address,address,uint256)', [sender,
    recipient,
    amount
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            sender: string,
            recipient: string,
            amount: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<boolean
        > {
            const self = this as any as MockTokenContract;
            const encodedData = self._strictEncodeArguments('transferFrom(address,address,uint256)', [sender,
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
    public increaseAllowance = {
        async sendTransactionAsync(
            spender: string,
            addedValue: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as MockTokenContract;
            const encodedData = self._strictEncodeArguments('increaseAllowance(address,uint256)', [spender,
    addedValue
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.increaseAllowance.estimateGasAsync.bind(
                    self,
                    spender,
                    addedValue
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            spender: string,
            addedValue: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as MockTokenContract;
            const encodedData = self._strictEncodeArguments('increaseAllowance(address,uint256)', [spender,
    addedValue
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
            addedValue: BigNumber,
        ): string {
            const self = this as any as MockTokenContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('increaseAllowance(address,uint256)', [spender,
    addedValue
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            spender: string,
            addedValue: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<boolean
        > {
            const self = this as any as MockTokenContract;
            const encodedData = self._strictEncodeArguments('increaseAllowance(address,uint256)', [spender,
        addedValue
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
            const abiEncoder = self._lookupAbiEncoder('increaseAllowance(address,uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<boolean
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public mintTo = {
        async sendTransactionAsync(
            _receiver: string,
            _amount: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as MockTokenContract;
            const encodedData = self._strictEncodeArguments('mintTo(address,uint256)', [_receiver,
    _amount
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.mintTo.estimateGasAsync.bind(
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
            const self = this as any as MockTokenContract;
            const encodedData = self._strictEncodeArguments('mintTo(address,uint256)', [_receiver,
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
            const self = this as any as MockTokenContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('mintTo(address,uint256)', [_receiver,
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
            const self = this as any as MockTokenContract;
            const encodedData = self._strictEncodeArguments('mintTo(address,uint256)', [_receiver,
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
            const abiEncoder = self._lookupAbiEncoder('mintTo(address,uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public balanceOf = {
        async callAsync(
            account: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            const self = this as any as MockTokenContract;
            const encodedData = self._strictEncodeArguments('balanceOf(address)', [account
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
    public burnFrom = {
        async sendTransactionAsync(
            _from: string,
            _amount: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as MockTokenContract;
            const encodedData = self._strictEncodeArguments('burnFrom(address,uint256)', [_from,
    _amount
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.burnFrom.estimateGasAsync.bind(
                    self,
                    _from,
                    _amount
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            _from: string,
            _amount: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as MockTokenContract;
            const encodedData = self._strictEncodeArguments('burnFrom(address,uint256)', [_from,
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
            _from: string,
            _amount: BigNumber,
        ): string {
            const self = this as any as MockTokenContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('burnFrom(address,uint256)', [_from,
    _amount
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            _from: string,
            _amount: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as MockTokenContract;
            const encodedData = self._strictEncodeArguments('burnFrom(address,uint256)', [_from,
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
            const abiEncoder = self._lookupAbiEncoder('burnFrom(address,uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public decreaseAllowance = {
        async sendTransactionAsync(
            spender: string,
            subtractedValue: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as MockTokenContract;
            const encodedData = self._strictEncodeArguments('decreaseAllowance(address,uint256)', [spender,
    subtractedValue
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.decreaseAllowance.estimateGasAsync.bind(
                    self,
                    spender,
                    subtractedValue
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            spender: string,
            subtractedValue: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as MockTokenContract;
            const encodedData = self._strictEncodeArguments('decreaseAllowance(address,uint256)', [spender,
    subtractedValue
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
            subtractedValue: BigNumber,
        ): string {
            const self = this as any as MockTokenContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('decreaseAllowance(address,uint256)', [spender,
    subtractedValue
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            spender: string,
            subtractedValue: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<boolean
        > {
            const self = this as any as MockTokenContract;
            const encodedData = self._strictEncodeArguments('decreaseAllowance(address,uint256)', [spender,
        subtractedValue
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
            const abiEncoder = self._lookupAbiEncoder('decreaseAllowance(address,uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<boolean
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
            const self = this as any as MockTokenContract;
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
            const self = this as any as MockTokenContract;
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
            const self = this as any as MockTokenContract;
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
            const self = this as any as MockTokenContract;
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
    public allowance = {
        async callAsync(
            owner: string,
            spender: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            const self = this as any as MockTokenContract;
            const encodedData = self._strictEncodeArguments('allowance(address,address)', [owner,
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
    public static async deployFrom0xArtifactAsync(
        artifact: ContractArtifact | SimpleContractArtifact | any,
        provider: Provider,
        txDefaults: Partial<TxData>,
    ): Promise<MockTokenContract> {
        if (_.isUndefined(artifact.compilerOutput)) {
            throw new Error('Compiler output not found in the artifact file');
        }
        const bytecode = artifact.compilerOutput.evm.bytecode.object;
        const abi = artifact.compilerOutput.abi;
        return MockTokenContract.deployAsync(bytecode, abi, provider, txDefaults, );
    }
    public static async deployAsync(
        bytecode: string,
        abi: ContractAbi,
        provider: Provider,
        txDefaults: Partial<TxData>,
    ): Promise<MockTokenContract> {
        const constructorAbi = BaseContract._lookupConstructorAbi(abi);
        [] = BaseContract._formatABIDataItemList(
            constructorAbi.inputs,
            [],
            BaseContract._bigNumberToString,
        );
        const iface = new ethers.utils.Interface(abi);
        const deployInfo = iface.deployFunction;
        const txData = deployInfo.encode(bytecode, []);
        const web3Wrapper = new Web3Wrapper(provider);
        const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
            {data: txData},
            txDefaults,
            web3Wrapper.estimateGasAsync.bind(web3Wrapper),
        );
        const txHash = await web3Wrapper.sendTransactionAsync(txDataWithDefaults);
        const txReceipt = await web3Wrapper.awaitTransactionSuccessAsync(txHash);
        const contractInstance = new MockTokenContract(abi, txReceipt.contractAddress as string, provider, txDefaults);
        contractInstance.constructorArgs = [];
        return contractInstance;
    }
    constructor(abi: ContractAbi, address: string, provider: Provider, txDefaults?: Partial<TxData>) {
        super('MockToken', abi, address, provider, txDefaults);
        classUtils.bindAll(this, ['_abiEncoderByFunctionSignature', 'address', 'abi', '_web3Wrapper']);
    }
} // tslint:disable:max-file-line-count
// tslint:enable:no-unbound-method
