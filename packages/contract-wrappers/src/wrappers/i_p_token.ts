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
export class IPTokenContract extends BaseContract {
    public mintWithToken = {
        async sendTransactionAsync(
            _receiver: string,
            _depositTokenAddress: string,
            _depositAmount: BigNumber,
            _maxPriceAllowed: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as IPTokenContract;
            const encodedData = self._strictEncodeArguments('mintWithToken(address,address,uint256,uint256)', [_receiver,
    _depositTokenAddress,
    _depositAmount,
    _maxPriceAllowed
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.mintWithToken.estimateGasAsync.bind(
                    self,
                    _receiver,
                    _depositTokenAddress,
                    _depositAmount,
                    _maxPriceAllowed
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            _receiver: string,
            _depositTokenAddress: string,
            _depositAmount: BigNumber,
            _maxPriceAllowed: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as IPTokenContract;
            const encodedData = self._strictEncodeArguments('mintWithToken(address,address,uint256,uint256)', [_receiver,
    _depositTokenAddress,
    _depositAmount,
    _maxPriceAllowed
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
            _depositTokenAddress: string,
            _depositAmount: BigNumber,
            _maxPriceAllowed: BigNumber,
        ): string {
            const self = this as any as IPTokenContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('mintWithToken(address,address,uint256,uint256)', [_receiver,
    _depositTokenAddress,
    _depositAmount,
    _maxPriceAllowed
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            _receiver: string,
            _depositTokenAddress: string,
            _depositAmount: BigNumber,
            _maxPriceAllowed: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            const self = this as any as IPTokenContract;
            const encodedData = self._strictEncodeArguments('mintWithToken(address,address,uint256,uint256)', [_receiver,
        _depositTokenAddress,
        _depositAmount,
        _maxPriceAllowed
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
            const abiEncoder = self._lookupAbiEncoder('mintWithToken(address,address,uint256,uint256)');
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
    ): Promise<IPTokenContract> {
        if (_.isUndefined(artifact.compilerOutput)) {
            throw new Error('Compiler output not found in the artifact file');
        }
        const bytecode = artifact.compilerOutput.evm.bytecode.object;
        const abi = artifact.compilerOutput.abi;
        return IPTokenContract.deployAsync(bytecode, abi, provider, txDefaults, );
    }
    public static async deployAsync(
        bytecode: string,
        abi: ContractAbi,
        provider: Provider,
        txDefaults: Partial<TxData>,
    ): Promise<IPTokenContract> {
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
        const contractInstance = new IPTokenContract(abi, txReceipt.contractAddress as string, provider, txDefaults);
        contractInstance.constructorArgs = [];
        return contractInstance;
    }
    constructor(abi: ContractAbi, address: string, provider: Provider, txDefaults?: Partial<TxData>) {
        super('IPToken', abi, address, provider, txDefaults);
        classUtils.bindAll(this, ['_abiEncoderByFunctionSignature', 'address', 'abi', '_web3Wrapper']);
    }
} // tslint:disable:max-file-line-count
// tslint:enable:no-unbound-method
