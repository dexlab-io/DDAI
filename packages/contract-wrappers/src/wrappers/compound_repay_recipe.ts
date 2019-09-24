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
export class CompoundRepayRecipeContract extends BaseContract {
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
            const self = this as any as CompoundRepayRecipeContract;
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
            const self = this as any as CompoundRepayRecipeContract;
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
            const self = this as any as CompoundRepayRecipeContract;
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
            const self = this as any as CompoundRepayRecipeContract;
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
    public underlying = {
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<string
        > {
            const self = this as any as CompoundRepayRecipeContract;
            const encodedData = self._strictEncodeArguments('underlying()', []);
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
            const abiEncoder = self._lookupAbiEncoder('underlying()');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<string
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public kyberNetwork = {
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<string
        > {
            const self = this as any as CompoundRepayRecipeContract;
            const encodedData = self._strictEncodeArguments('kyberNetwork()', []);
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
            const abiEncoder = self._lookupAbiEncoder('kyberNetwork()');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<string
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
            const self = this as any as CompoundRepayRecipeContract;
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
    public static async deployFrom0xArtifactAsync(
        artifact: ContractArtifact | SimpleContractArtifact | any,
        provider: Provider,
        txDefaults: Partial<TxData>,
            _token: string,
            _underlying: string,
            _kyberNetwork: string,
    ): Promise<CompoundRepayRecipeContract> {
        if (_.isUndefined(artifact.compilerOutput)) {
            throw new Error('Compiler output not found in the artifact file');
        }
        const bytecode = artifact.compilerOutput.evm.bytecode.object;
        const abi = artifact.compilerOutput.abi;
        return CompoundRepayRecipeContract.deployAsync(bytecode, abi, provider, txDefaults, _token,
_underlying,
_kyberNetwork
);
    }
    public static async deployAsync(
        bytecode: string,
        abi: ContractAbi,
        provider: Provider,
        txDefaults: Partial<TxData>,
            _token: string,
            _underlying: string,
            _kyberNetwork: string,
    ): Promise<CompoundRepayRecipeContract> {
        const constructorAbi = BaseContract._lookupConstructorAbi(abi);
        [_token,
_underlying,
_kyberNetwork
] = BaseContract._formatABIDataItemList(
            constructorAbi.inputs,
            [_token,
_underlying,
_kyberNetwork
],
            BaseContract._bigNumberToString,
        );
        const iface = new ethers.utils.Interface(abi);
        const deployInfo = iface.deployFunction;
        const txData = deployInfo.encode(bytecode, [_token,
_underlying,
_kyberNetwork
]);
        const web3Wrapper = new Web3Wrapper(provider);
        const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
            {data: txData},
            txDefaults,
            web3Wrapper.estimateGasAsync.bind(web3Wrapper),
        );
        const txHash = await web3Wrapper.sendTransactionAsync(txDataWithDefaults);
        const txReceipt = await web3Wrapper.awaitTransactionSuccessAsync(txHash);
        const contractInstance = new CompoundRepayRecipeContract(abi, txReceipt.contractAddress as string, provider, txDefaults);
        contractInstance.constructorArgs = [_token,
_underlying,
_kyberNetwork
];
        return contractInstance;
    }
    constructor(abi: ContractAbi, address: string, provider: Provider, txDefaults?: Partial<TxData>) {
        super('CompoundRepayRecipe', abi, address, provider, txDefaults);
        classUtils.bindAll(this, ['_abiEncoderByFunctionSignature', 'address', 'abi', '_web3Wrapper']);
    }
} // tslint:disable:max-file-line-count
// tslint:enable:no-unbound-method
