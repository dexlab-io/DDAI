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


/* istanbul ignore next */
// tslint:disable:no-parameter-reassignment
// tslint:disable-next-line:class-name
export class DCAContract extends BaseContract {
    public dataOf = {
        async callAsync(
            index_0: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<[BigNumber, BigNumber, BigNumber, BigNumber, BigNumber]
        > {
            const self = this as any as DCAContract;
            const encodedData = self._strictEncodeArguments('dataOf(address)', [index_0
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
            const abiEncoder = self._lookupAbiEncoder('dataOf(address)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<[BigNumber, BigNumber, BigNumber, BigNumber, BigNumber]
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public ddai = {
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<string
        > {
            const self = this as any as DCAContract;
            const encodedData = self._strictEncodeArguments('ddai()', []);
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
            const abiEncoder = self._lookupAbiEncoder('ddai()');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<string
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public poke = {
        async sendTransactionAsync(
            _account: string,
            _minFee: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as DCAContract;
            const encodedData = self._strictEncodeArguments('poke(address,uint256)', [_account,
    _minFee
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.poke.estimateGasAsync.bind(
                    self,
                    _account,
                    _minFee
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            _account: string,
            _minFee: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as DCAContract;
            const encodedData = self._strictEncodeArguments('poke(address,uint256)', [_account,
    _minFee
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
            _minFee: BigNumber,
        ): string {
            const self = this as any as DCAContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('poke(address,uint256)', [_account,
    _minFee
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            _account: string,
            _minFee: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<boolean
        > {
            const self = this as any as DCAContract;
            const encodedData = self._strictEncodeArguments('poke(address,uint256)', [_account,
        _minFee
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
            const abiEncoder = self._lookupAbiEncoder('poke(address,uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<boolean
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public pokeBatch = {
        async sendTransactionAsync(
            _accounts: string[],
            _minFee: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as DCAContract;
            const encodedData = self._strictEncodeArguments('pokeBatch(address[],uint256)', [_accounts,
    _minFee
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.pokeBatch.estimateGasAsync.bind(
                    self,
                    _accounts,
                    _minFee
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            _accounts: string[],
            _minFee: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as DCAContract;
            const encodedData = self._strictEncodeArguments('pokeBatch(address[],uint256)', [_accounts,
    _minFee
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
            _accounts: string[],
            _minFee: BigNumber,
        ): string {
            const self = this as any as DCAContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('pokeBatch(address[],uint256)', [_accounts,
    _minFee
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            _accounts: string[],
            _minFee: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as DCAContract;
            const encodedData = self._strictEncodeArguments('pokeBatch(address[],uint256)', [_accounts,
        _minFee
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
            const abiEncoder = self._lookupAbiEncoder('pokeBatch(address[],uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public set = {
        async sendTransactionAsync(
            _amount: BigNumber,
            _next: BigNumber,
            _interval: BigNumber,
            _totalAmount: BigNumber,
            _feePerInterval: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as DCAContract;
            const encodedData = self._strictEncodeArguments('set(uint256,uint256,uint256,uint256,uint256)', [_amount,
    _next,
    _interval,
    _totalAmount,
    _feePerInterval
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.set.estimateGasAsync.bind(
                    self,
                    _amount,
                    _next,
                    _interval,
                    _totalAmount,
                    _feePerInterval
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            _amount: BigNumber,
            _next: BigNumber,
            _interval: BigNumber,
            _totalAmount: BigNumber,
            _feePerInterval: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as DCAContract;
            const encodedData = self._strictEncodeArguments('set(uint256,uint256,uint256,uint256,uint256)', [_amount,
    _next,
    _interval,
    _totalAmount,
    _feePerInterval
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
            _amount: BigNumber,
            _next: BigNumber,
            _interval: BigNumber,
            _totalAmount: BigNumber,
            _feePerInterval: BigNumber,
        ): string {
            const self = this as any as DCAContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('set(uint256,uint256,uint256,uint256,uint256)', [_amount,
    _next,
    _interval,
    _totalAmount,
    _feePerInterval
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            _amount: BigNumber,
            _next: BigNumber,
            _interval: BigNumber,
            _totalAmount: BigNumber,
            _feePerInterval: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as DCAContract;
            const encodedData = self._strictEncodeArguments('set(uint256,uint256,uint256,uint256,uint256)', [_amount,
        _next,
        _interval,
        _totalAmount,
        _feePerInterval
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
            const abiEncoder = self._lookupAbiEncoder('set(uint256,uint256,uint256,uint256,uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public tokensReceived = {
        async sendTransactionAsync(
            _operator: string,
            _from: string,
            _to: string,
            _amount: BigNumber,
            _userData: string,
            _operatorData: string,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as DCAContract;
            const encodedData = self._strictEncodeArguments('tokensReceived(address,address,address,uint256,bytes,bytes)', [_operator,
    _from,
    _to,
    _amount,
    _userData,
    _operatorData
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.tokensReceived.estimateGasAsync.bind(
                    self,
                    _operator,
                    _from,
                    _to,
                    _amount,
                    _userData,
                    _operatorData
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            _operator: string,
            _from: string,
            _to: string,
            _amount: BigNumber,
            _userData: string,
            _operatorData: string,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as DCAContract;
            const encodedData = self._strictEncodeArguments('tokensReceived(address,address,address,uint256,bytes,bytes)', [_operator,
    _from,
    _to,
    _amount,
    _userData,
    _operatorData
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
            _operator: string,
            _from: string,
            _to: string,
            _amount: BigNumber,
            _userData: string,
            _operatorData: string,
        ): string {
            const self = this as any as DCAContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('tokensReceived(address,address,address,uint256,bytes,bytes)', [_operator,
    _from,
    _to,
    _amount,
    _userData,
    _operatorData
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            _operator: string,
            _from: string,
            _to: string,
            _amount: BigNumber,
            _userData: string,
            _operatorData: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as DCAContract;
            const encodedData = self._strictEncodeArguments('tokensReceived(address,address,address,uint256,bytes,bytes)', [_operator,
        _from,
        _to,
        _amount,
        _userData,
        _operatorData
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
            const abiEncoder = self._lookupAbiEncoder('tokensReceived(address,address,address,uint256,bytes,bytes)');
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
            _ddai: string,
    ): Promise<DCAContract> {
        if (_.isUndefined(artifact.compilerOutput)) {
            throw new Error('Compiler output not found in the artifact file');
        }
        const bytecode = artifact.compilerOutput.evm.bytecode.object;
        const abi = artifact.compilerOutput.abi;
        return DCAContract.deployAsync(bytecode, abi, provider, txDefaults, _ddai
);
    }
    public static async deployAsync(
        bytecode: string,
        abi: ContractAbi,
        provider: Provider,
        txDefaults: Partial<TxData>,
            _ddai: string,
    ): Promise<DCAContract> {
        const constructorAbi = BaseContract._lookupConstructorAbi(abi);
        [_ddai
] = BaseContract._formatABIDataItemList(
            constructorAbi.inputs,
            [_ddai
],
            BaseContract._bigNumberToString,
        );
        const iface = new ethers.utils.Interface(abi);
        const deployInfo = iface.deployFunction;
        const txData = deployInfo.encode(bytecode, [_ddai
]);
        const web3Wrapper = new Web3Wrapper(provider);
        const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
            {data: txData},
            txDefaults,
            web3Wrapper.estimateGasAsync.bind(web3Wrapper),
        );
        const txHash = await web3Wrapper.sendTransactionAsync(txDataWithDefaults);
        const txReceipt = await web3Wrapper.awaitTransactionSuccessAsync(txHash);
        const contractInstance = new DCAContract(abi, txReceipt.contractAddress as string, provider, txDefaults);
        contractInstance.constructorArgs = [_ddai
];
        return contractInstance;
    }
    constructor(abi: ContractAbi, address: string, provider: Provider, txDefaults?: Partial<TxData>) {
        super('DCA', abi, address, provider, txDefaults);
        classUtils.bindAll(this, ['_abiEncoderByFunctionSignature', 'address', 'abi', '_web3Wrapper']);
    }
} // tslint:disable:max-file-line-count
// tslint:enable:no-unbound-method
