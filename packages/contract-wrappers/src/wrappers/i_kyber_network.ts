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
export class IKyberNetworkContract extends BaseContract {
    public trade = {
        async sendTransactionAsync(
            src: string,
            srcAmount: BigNumber,
            dest: string,
            destAddress: string,
            maxDestAmount: BigNumber,
            minConversionRate: BigNumber,
            walletId: string,
            txData: Partial<TxDataPayable> = {},
        ): Promise<string> {
            const self = this as any as IKyberNetworkContract;
            const encodedData = self._strictEncodeArguments('trade(address,uint256,address,address,uint256,uint256,address)', [src,
    srcAmount,
    dest,
    destAddress,
    maxDestAmount,
    minConversionRate,
    walletId
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.trade.estimateGasAsync.bind(
                    self,
                    src,
                    srcAmount,
                    dest,
                    destAddress,
                    maxDestAmount,
                    minConversionRate,
                    walletId
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            src: string,
            srcAmount: BigNumber,
            dest: string,
            destAddress: string,
            maxDestAmount: BigNumber,
            minConversionRate: BigNumber,
            walletId: string,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as IKyberNetworkContract;
            const encodedData = self._strictEncodeArguments('trade(address,uint256,address,address,uint256,uint256,address)', [src,
    srcAmount,
    dest,
    destAddress,
    maxDestAmount,
    minConversionRate,
    walletId
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
            src: string,
            srcAmount: BigNumber,
            dest: string,
            destAddress: string,
            maxDestAmount: BigNumber,
            minConversionRate: BigNumber,
            walletId: string,
        ): string {
            const self = this as any as IKyberNetworkContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('trade(address,uint256,address,address,uint256,uint256,address)', [src,
    srcAmount,
    dest,
    destAddress,
    maxDestAmount,
    minConversionRate,
    walletId
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            src: string,
            srcAmount: BigNumber,
            dest: string,
            destAddress: string,
            maxDestAmount: BigNumber,
            minConversionRate: BigNumber,
            walletId: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            const self = this as any as IKyberNetworkContract;
            const encodedData = self._strictEncodeArguments('trade(address,uint256,address,address,uint256,uint256,address)', [src,
        srcAmount,
        dest,
        destAddress,
        maxDestAmount,
        minConversionRate,
        walletId
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
            const abiEncoder = self._lookupAbiEncoder('trade(address,uint256,address,address,uint256,uint256,address)');
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
    ): Promise<IKyberNetworkContract> {
        if (_.isUndefined(artifact.compilerOutput)) {
            throw new Error('Compiler output not found in the artifact file');
        }
        const bytecode = artifact.compilerOutput.evm.bytecode.object;
        const abi = artifact.compilerOutput.abi;
        return IKyberNetworkContract.deployAsync(bytecode, abi, provider, txDefaults, );
    }
    public static async deployAsync(
        bytecode: string,
        abi: ContractAbi,
        provider: Provider,
        txDefaults: Partial<TxData>,
    ): Promise<IKyberNetworkContract> {
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
        const contractInstance = new IKyberNetworkContract(abi, txReceipt.contractAddress as string, provider, txDefaults);
        contractInstance.constructorArgs = [];
        return contractInstance;
    }
    constructor(abi: ContractAbi, address: string, provider: Provider, txDefaults?: Partial<TxData>) {
        super('IKyberNetwork', abi, address, provider, txDefaults);
        classUtils.bindAll(this, ['_abiEncoderByFunctionSignature', 'address', 'abi', '_web3Wrapper']);
    }
} // tslint:disable:max-file-line-count
// tslint:enable:no-unbound-method
