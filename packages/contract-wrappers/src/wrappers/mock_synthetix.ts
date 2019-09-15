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
export class MockSynthetixContract extends BaseContract {
    public setPrice = {
        async sendTransactionAsync(
            _currencyKey: string,
            _price: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as MockSynthetixContract;
            const encodedData = self._strictEncodeArguments('setPrice(bytes4,uint256)', [_currencyKey,
    _price
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.setPrice.estimateGasAsync.bind(
                    self,
                    _currencyKey,
                    _price
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            _currencyKey: string,
            _price: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as MockSynthetixContract;
            const encodedData = self._strictEncodeArguments('setPrice(bytes4,uint256)', [_currencyKey,
    _price
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
            _currencyKey: string,
            _price: BigNumber,
        ): string {
            const self = this as any as MockSynthetixContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('setPrice(bytes4,uint256)', [_currencyKey,
    _price
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            _currencyKey: string,
            _price: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as MockSynthetixContract;
            const encodedData = self._strictEncodeArguments('setPrice(bytes4,uint256)', [_currencyKey,
        _price
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
            const abiEncoder = self._lookupAbiEncoder('setPrice(bytes4,uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public exchange = {
        async sendTransactionAsync(
            _sourceCurrencyKey: string,
            _sourceAmount: BigNumber,
            _destinationCurrencyKey: string,
            _destinationAddress: string,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as MockSynthetixContract;
            const encodedData = self._strictEncodeArguments('exchange(bytes4,uint256,bytes4,address)', [_sourceCurrencyKey,
    _sourceAmount,
    _destinationCurrencyKey,
    _destinationAddress
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.exchange.estimateGasAsync.bind(
                    self,
                    _sourceCurrencyKey,
                    _sourceAmount,
                    _destinationCurrencyKey,
                    _destinationAddress
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            _sourceCurrencyKey: string,
            _sourceAmount: BigNumber,
            _destinationCurrencyKey: string,
            _destinationAddress: string,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as MockSynthetixContract;
            const encodedData = self._strictEncodeArguments('exchange(bytes4,uint256,bytes4,address)', [_sourceCurrencyKey,
    _sourceAmount,
    _destinationCurrencyKey,
    _destinationAddress
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
            _sourceCurrencyKey: string,
            _sourceAmount: BigNumber,
            _destinationCurrencyKey: string,
            _destinationAddress: string,
        ): string {
            const self = this as any as MockSynthetixContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('exchange(bytes4,uint256,bytes4,address)', [_sourceCurrencyKey,
    _sourceAmount,
    _destinationCurrencyKey,
    _destinationAddress
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            _sourceCurrencyKey: string,
            _sourceAmount: BigNumber,
            _destinationCurrencyKey: string,
            _destinationAddress: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<boolean
        > {
            const self = this as any as MockSynthetixContract;
            const encodedData = self._strictEncodeArguments('exchange(bytes4,uint256,bytes4,address)', [_sourceCurrencyKey,
        _sourceAmount,
        _destinationCurrencyKey,
        _destinationAddress
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
            const abiEncoder = self._lookupAbiEncoder('exchange(bytes4,uint256,bytes4,address)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<boolean
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public tokenPrice = {
        async callAsync(
            index_0: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            const self = this as any as MockSynthetixContract;
            const encodedData = self._strictEncodeArguments('tokenPrice(bytes4)', [index_0
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
            const abiEncoder = self._lookupAbiEncoder('tokenPrice(bytes4)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<BigNumber
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public keyToToken = {
        async callAsync(
            index_0: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<string
        > {
            const self = this as any as MockSynthetixContract;
            const encodedData = self._strictEncodeArguments('keyToToken(bytes4)', [index_0
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
            const abiEncoder = self._lookupAbiEncoder('keyToToken(bytes4)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<string
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public COLLATERAL_RATIO = {
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            const self = this as any as MockSynthetixContract;
            const encodedData = self._strictEncodeArguments('COLLATERAL_RATIO()', []);
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
            const abiEncoder = self._lookupAbiEncoder('COLLATERAL_RATIO()');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<BigNumber
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public snx = {
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<string
        > {
            const self = this as any as MockSynthetixContract;
            const encodedData = self._strictEncodeArguments('snx()', []);
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
            const abiEncoder = self._lookupAbiEncoder('snx()');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<string
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public static async deployFrom0xArtifactAsync(
        artifact: ContractArtifact | SimpleContractArtifact | any,
        provider: Provider,
        txDefaults: Partial<TxData>,
            _snx: string,
    ): Promise<MockSynthetixContract> {
        if (_.isUndefined(artifact.compilerOutput)) {
            throw new Error('Compiler output not found in the artifact file');
        }
        const bytecode = artifact.compilerOutput.evm.bytecode.object;
        const abi = artifact.compilerOutput.abi;
        return MockSynthetixContract.deployAsync(bytecode, abi, provider, txDefaults, _snx
);
    }
    public static async deployAsync(
        bytecode: string,
        abi: ContractAbi,
        provider: Provider,
        txDefaults: Partial<TxData>,
            _snx: string,
    ): Promise<MockSynthetixContract> {
        const constructorAbi = BaseContract._lookupConstructorAbi(abi);
        [_snx
] = BaseContract._formatABIDataItemList(
            constructorAbi.inputs,
            [_snx
],
            BaseContract._bigNumberToString,
        );
        const iface = new ethers.utils.Interface(abi);
        const deployInfo = iface.deployFunction;
        const txData = deployInfo.encode(bytecode, [_snx
]);
        const web3Wrapper = new Web3Wrapper(provider);
        const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
            {data: txData},
            txDefaults,
            web3Wrapper.estimateGasAsync.bind(web3Wrapper),
        );
        const txHash = await web3Wrapper.sendTransactionAsync(txDataWithDefaults);
        const txReceipt = await web3Wrapper.awaitTransactionSuccessAsync(txHash);
        const contractInstance = new MockSynthetixContract(abi, txReceipt.contractAddress as string, provider, txDefaults);
        contractInstance.constructorArgs = [_snx
];
        return contractInstance;
    }
    constructor(abi: ContractAbi, address: string, provider: Provider, txDefaults?: Partial<TxData>) {
        super('MockSynthetix', abi, address, provider, txDefaults);
        classUtils.bindAll(this, ['_abiEncoderByFunctionSignature', 'address', 'abi', '_web3Wrapper']);
    }
} // tslint:disable:max-file-line-count
// tslint:enable:no-unbound-method
