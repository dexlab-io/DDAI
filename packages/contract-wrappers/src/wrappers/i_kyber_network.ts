// tslint:disable:no-consecutive-blank-lines ordered-imports align trailing-comma
// tslint:disable:whitespace no-unbound-method no-trailing-whitespace
// tslint:disable:no-unused-variable
import { BaseContract,PromiseWithTransactionHash } from '@0x/base-contract';
import { schemas } from '@0x/json-schemas';
import {
    BlockParam,
    BlockParamLiteral,
    BlockRange,
    CallData,
    ContractAbi,
    ContractArtifact,
    DecodedLogArgs,
    MethodAbi,
    TransactionReceiptWithDecodedLogs,
    TxData,
    TxDataPayable,
    SupportedProvider,
} from 'ethereum-types';
import { BigNumber, classUtils, logUtils, providerUtils } from '@0x/utils';
import { SimpleContractArtifact } from '@0x/types';
import { Web3Wrapper } from '@0x/web3-wrapper';
import { assert } from '@0x/assert';
import * as ethers from 'ethers';
// tslint:enable:no-unused-variable


/* istanbul ignore next */
// tslint:disable:no-parameter-reassignment
// tslint:disable-next-line:class-name
export class IKyberNetworkContract extends BaseContract {
    public trade = {
        /**
         * Sends an Ethereum transaction executing this method with the supplied parameters. This is a read/write
         * Ethereum operation and will cost gas.
         * @param txData Additional data for transaction
         * @returns The hash of the transaction
         */
        async sendTransactionAsync(
            src: string,
            srcAmount: BigNumber,
            dest: string,
            destAddress: string,
            maxDestAmount: BigNumber,
            minConversionRate: BigNumber,
            walletId: string,
        txData?: Partial<TxData> | undefined,
        ): Promise<string> {
            assert.isString('src', src);
            assert.isBigNumber('srcAmount', srcAmount);
            assert.isString('dest', dest);
            assert.isString('destAddress', destAddress);
            assert.isBigNumber('maxDestAmount', maxDestAmount);
            assert.isBigNumber('minConversionRate', minConversionRate);
            assert.isString('walletId', walletId);
            const self = this as any as IKyberNetworkContract;
            const encodedData = self._strictEncodeArguments('trade(address,uint256,address,address,uint256,uint256,address)', [src.toLowerCase(),
        srcAmount,
        dest.toLowerCase(),
        destAddress.toLowerCase(),
        maxDestAmount,
        minConversionRate,
        walletId.toLowerCase()
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
                    src.toLowerCase(),
                    srcAmount,
                    dest.toLowerCase(),
                    destAddress.toLowerCase(),
                    maxDestAmount,
                    minConversionRate,
                    walletId.toLowerCase()
                ),
            );
            if (txDataWithDefaults.from !== undefined) {
                txDataWithDefaults.from = txDataWithDefaults.from.toLowerCase();
            }
        
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        /**
         * Sends an Ethereum transaction and waits until the transaction has been successfully mined without reverting.
         * If the transaction was mined, but reverted, an error is thrown.
         * @param txData Additional data for transaction
         * @param pollingIntervalMs Interval at which to poll for success
         * @returns A promise that resolves when the transaction is successful
         */
        awaitTransactionSuccessAsync(
            src: string,
            srcAmount: BigNumber,
            dest: string,
            destAddress: string,
            maxDestAmount: BigNumber,
            minConversionRate: BigNumber,
            walletId: string,
            txData?: Partial<TxData>,
            pollingIntervalMs?: number,
            timeoutMs?: number,
        ): PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs> {
            assert.isString('src', src);
            assert.isBigNumber('srcAmount', srcAmount);
            assert.isString('dest', dest);
            assert.isString('destAddress', destAddress);
            assert.isBigNumber('maxDestAmount', maxDestAmount);
            assert.isBigNumber('minConversionRate', minConversionRate);
            assert.isString('walletId', walletId);
            const self = this as any as IKyberNetworkContract;
            const txHashPromise = self.trade.sendTransactionAsync(src.toLowerCase(),
        srcAmount,
        dest.toLowerCase(),
        destAddress.toLowerCase(),
        maxDestAmount,
        minConversionRate,
        walletId.toLowerCase()
        , txData);
            return new PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>(
                txHashPromise,
                (async (): Promise<TransactionReceiptWithDecodedLogs> => {
                    // When the transaction hash resolves, wait for it to be mined.
                    return self._web3Wrapper.awaitTransactionSuccessAsync(
                        await txHashPromise,
                        pollingIntervalMs,
                        timeoutMs,
                    );
                })(),
            );
        },
        /**
         * Estimates the gas cost of sending an Ethereum transaction calling this method with these arguments.
         * @param txData Additional data for transaction
         * @returns The hash of the transaction
         */
        async estimateGasAsync(
            src: string,
            srcAmount: BigNumber,
            dest: string,
            destAddress: string,
            maxDestAmount: BigNumber,
            minConversionRate: BigNumber,
            walletId: string,
            txData?: Partial<TxData> | undefined,
        ): Promise<number> {
            assert.isString('src', src);
            assert.isBigNumber('srcAmount', srcAmount);
            assert.isString('dest', dest);
            assert.isString('destAddress', destAddress);
            assert.isBigNumber('maxDestAmount', maxDestAmount);
            assert.isBigNumber('minConversionRate', minConversionRate);
            assert.isString('walletId', walletId);
            const self = this as any as IKyberNetworkContract;
            const encodedData = self._strictEncodeArguments('trade(address,uint256,address,address,uint256,uint256,address)', [src.toLowerCase(),
        srcAmount,
        dest.toLowerCase(),
        destAddress.toLowerCase(),
        maxDestAmount,
        minConversionRate,
        walletId.toLowerCase()
        ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            if (txDataWithDefaults.from !== undefined) {
                txDataWithDefaults.from = txDataWithDefaults.from.toLowerCase();
            }
        
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        async validateAndSendTransactionAsync(
                src: string,
                srcAmount: BigNumber,
                dest: string,
                destAddress: string,
                maxDestAmount: BigNumber,
                minConversionRate: BigNumber,
                walletId: string,
            txData?: Partial<TxData> | undefined,
            ): Promise<string> {
            await (this as any).trade.callAsync(
        src,
        srcAmount,
        dest,
        destAddress,
        maxDestAmount,
        minConversionRate,
        walletId,
        txData,
            );
            const txHash =  await (this as any).trade.sendTransactionAsync(
        src,
        srcAmount,
        dest,
        destAddress,
        maxDestAmount,
        minConversionRate,
        walletId,
        txData,
            ); 
            return txHash;
        },
        /**
         * Sends a read-only call to the contract method. Returns the result that would happen if one were to send an 
         * Ethereum transaction to this method, given the current state of the blockchain. Calls do not cost gas
         * since they don't modify state.
         */
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
            assert.isString('src', src);
            assert.isBigNumber('srcAmount', srcAmount);
            assert.isString('dest', dest);
            assert.isString('destAddress', destAddress);
            assert.isBigNumber('maxDestAmount', maxDestAmount);
            assert.isBigNumber('minConversionRate', minConversionRate);
            assert.isString('walletId', walletId);
            assert.doesConformToSchema('callData', callData, schemas.callDataSchema, [
                schemas.addressSchema,
                schemas.numberSchema,
                schemas.jsNumber,
            ]);
            if (defaultBlock !== undefined) {
                assert.isBlockParam('defaultBlock', defaultBlock);
            }
            const self = this as any as IKyberNetworkContract;
            const encodedData = self._strictEncodeArguments('trade(address,uint256,address,address,uint256,uint256,address)', [src.toLowerCase(),
        srcAmount,
        dest.toLowerCase(),
        destAddress.toLowerCase(),
        maxDestAmount,
        minConversionRate,
        walletId.toLowerCase()
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            callDataWithDefaults.from = callDataWithDefaults.from ? callDataWithDefaults.from.toLowerCase() : callDataWithDefaults.from;
        
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('trade(address,uint256,address,address,uint256,uint256,address)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<BigNumber
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
        /**
         * Returns the ABI encoded transaction data needed to send an Ethereum transaction calling this method. Before
         * sending the Ethereum tx, this encoded tx data can first be sent to a separate signing service or can be used
         * to create a 0x transaction (see protocol spec for more details).
         * @returns The ABI encoded transaction data as a string
         */
        getABIEncodedTransactionData(
                src: string,
                srcAmount: BigNumber,
                dest: string,
                destAddress: string,
                maxDestAmount: BigNumber,
                minConversionRate: BigNumber,
                walletId: string,
            ): string {
            assert.isString('src', src);
            assert.isBigNumber('srcAmount', srcAmount);
            assert.isString('dest', dest);
            assert.isString('destAddress', destAddress);
            assert.isBigNumber('maxDestAmount', maxDestAmount);
            assert.isBigNumber('minConversionRate', minConversionRate);
            assert.isString('walletId', walletId);
            const self = this as any as IKyberNetworkContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('trade(address,uint256,address,address,uint256,uint256,address)', [src.toLowerCase(),
        srcAmount,
        dest.toLowerCase(),
        destAddress.toLowerCase(),
        maxDestAmount,
        minConversionRate,
        walletId.toLowerCase()
        ]);
            return abiEncodedTransactionData;
        },
        /**
         * Decode the ABI-encoded transaction data into its input arguments
         * @param callData The ABI-encoded transaction data
         * @returns An array representing the input arguments in order. Keynames of nested structs are preserved.
         */
        getABIDecodedTransactionData(
            callData: string
        ): (string
        ) {
            const self = this as any as IKyberNetworkContract;
            const abiEncoder = self._lookupAbiEncoder('trade(address,uint256,address,address,uint256,uint256,address)');
            // tslint:disable boolean-naming
            const abiDecodedCallData = abiEncoder.strictDecode<string
        >(callData);
            return abiDecodedCallData;
        },
        /**
         * Decode the ABI-encoded return data from a transaction
         * @param returnData the data returned after transaction execution
         * @returns An array representing the output results in order.  Keynames of nested structs are preserved.
         */
        getABIDecodedReturnData(
            returnData: string
        ): (BigNumber
        ) {
            const self = this as any as IKyberNetworkContract;
            const abiEncoder = self._lookupAbiEncoder('trade(address,uint256,address,address,uint256,uint256,address)');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<BigNumber
        >(returnData);
            return abiDecodedReturnData;
        },
    };
public static async deployFrom0xArtifactAsync(
        artifact: ContractArtifact | SimpleContractArtifact,
        supportedProvider: SupportedProvider,
        txDefaults: Partial<TxData>,
        logDecodeDependencies: { [contractName: string]: (ContractArtifact | SimpleContractArtifact) },
    ): Promise<IKyberNetworkContract> {
        assert.doesConformToSchema('txDefaults', txDefaults, schemas.txDataSchema, [
            schemas.addressSchema,
            schemas.numberSchema,
            schemas.jsNumber,
        ]);
        if (artifact.compilerOutput === undefined) {
            throw new Error('Compiler output not found in the artifact file');
        }
        const provider = providerUtils.standardizeOrThrow(supportedProvider);
        const bytecode = artifact.compilerOutput.evm.bytecode.object;
        const abi = artifact.compilerOutput.abi;
        const logDecodeDependenciesAbiOnly: { [contractName: string]: ContractAbi } = {};
        if (Object.keys(logDecodeDependencies) !== undefined) {
            for (const key of Object.keys(logDecodeDependencies)) {
                logDecodeDependenciesAbiOnly[key] = logDecodeDependencies[key].compilerOutput.abi;
            }
        }
        return IKyberNetworkContract.deployAsync(bytecode, abi, provider, txDefaults, logDecodeDependenciesAbiOnly, );
    }
    public static async deployAsync(
        bytecode: string,
        abi: ContractAbi,
        supportedProvider: SupportedProvider,
        txDefaults: Partial<TxData>,
        logDecodeDependencies: { [contractName: string]: ContractAbi },
    ): Promise<IKyberNetworkContract> {
        assert.isHexString('bytecode', bytecode);
        assert.doesConformToSchema('txDefaults', txDefaults, schemas.txDataSchema, [
            schemas.addressSchema,
            schemas.numberSchema,
            schemas.jsNumber,
        ]);
        const provider = providerUtils.standardizeOrThrow(supportedProvider);
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
        logUtils.log(`transactionHash: ${txHash}`);
        const txReceipt = await web3Wrapper.awaitTransactionSuccessAsync(txHash);
        logUtils.log(`IKyberNetwork successfully deployed at ${txReceipt.contractAddress}`);
        const contractInstance = new IKyberNetworkContract(txReceipt.contractAddress as string, provider, txDefaults, logDecodeDependencies);
        contractInstance.constructorArgs = [];
        return contractInstance;
    }


    /**
     * @returns      The contract ABI
     */
    public static ABI(): ContractAbi {
        const abi = [
            { 
                constant: false,
                inputs: [
                    {
                        name: 'src',
                        type: 'address',
                    },
                    {
                        name: 'srcAmount',
                        type: 'uint256',
                    },
                    {
                        name: 'dest',
                        type: 'address',
                    },
                    {
                        name: 'destAddress',
                        type: 'address',
                    },
                    {
                        name: 'maxDestAmount',
                        type: 'uint256',
                    },
                    {
                        name: 'minConversionRate',
                        type: 'uint256',
                    },
                    {
                        name: 'walletId',
                        type: 'address',
                    },
                ],
                name: 'trade',
                outputs: [
                    {
                        name: '',
                        type: 'uint256',
                    },
                ],
                payable: true,
                stateMutability: 'payable',
                type: 'function',
            },
        ] as ContractAbi;
        return abi;
    }
    constructor(address: string, supportedProvider: SupportedProvider, txDefaults?: Partial<TxData>, logDecodeDependencies?: { [contractName: string]: ContractAbi }) {
        super('IKyberNetwork', IKyberNetworkContract.ABI(), address, supportedProvider, txDefaults, logDecodeDependencies);
        classUtils.bindAll(this, ['_abiEncoderByFunctionSignature', 'address', '_web3Wrapper']);
    }
} 

// tslint:disable:max-file-line-count
// tslint:enable:no-unbound-method no-parameter-reassignment no-consecutive-blank-lines ordered-imports align
// tslint:enable:trailing-comma whitespace no-trailing-whitespace
