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
export class IPTokenContract extends BaseContract {
    public mintWithToken = {
        /**
         * Sends an Ethereum transaction executing this method with the supplied parameters. This is a read/write
         * Ethereum operation and will cost gas.
         * @param txData Additional data for transaction
         * @returns The hash of the transaction
         */
        async sendTransactionAsync(
            _receiver: string,
            _depositTokenAddress: string,
            _depositAmount: BigNumber,
            _maxPriceAllowed: BigNumber,
        txData?: Partial<TxData> | undefined,
        ): Promise<string> {
            assert.isString('_receiver', _receiver);
            assert.isString('_depositTokenAddress', _depositTokenAddress);
            assert.isBigNumber('_depositAmount', _depositAmount);
            assert.isBigNumber('_maxPriceAllowed', _maxPriceAllowed);
            const self = this as any as IPTokenContract;
            const encodedData = self._strictEncodeArguments('mintWithToken(address,address,uint256,uint256)', [_receiver.toLowerCase(),
        _depositTokenAddress.toLowerCase(),
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
                    _receiver.toLowerCase(),
                    _depositTokenAddress.toLowerCase(),
                    _depositAmount,
                    _maxPriceAllowed
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
            _receiver: string,
            _depositTokenAddress: string,
            _depositAmount: BigNumber,
            _maxPriceAllowed: BigNumber,
            txData?: Partial<TxData>,
            pollingIntervalMs?: number,
            timeoutMs?: number,
        ): PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs> {
            assert.isString('_receiver', _receiver);
            assert.isString('_depositTokenAddress', _depositTokenAddress);
            assert.isBigNumber('_depositAmount', _depositAmount);
            assert.isBigNumber('_maxPriceAllowed', _maxPriceAllowed);
            const self = this as any as IPTokenContract;
            const txHashPromise = self.mintWithToken.sendTransactionAsync(_receiver.toLowerCase(),
        _depositTokenAddress.toLowerCase(),
        _depositAmount,
        _maxPriceAllowed
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
            _receiver: string,
            _depositTokenAddress: string,
            _depositAmount: BigNumber,
            _maxPriceAllowed: BigNumber,
            txData?: Partial<TxData> | undefined,
        ): Promise<number> {
            assert.isString('_receiver', _receiver);
            assert.isString('_depositTokenAddress', _depositTokenAddress);
            assert.isBigNumber('_depositAmount', _depositAmount);
            assert.isBigNumber('_maxPriceAllowed', _maxPriceAllowed);
            const self = this as any as IPTokenContract;
            const encodedData = self._strictEncodeArguments('mintWithToken(address,address,uint256,uint256)', [_receiver.toLowerCase(),
        _depositTokenAddress.toLowerCase(),
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
            if (txDataWithDefaults.from !== undefined) {
                txDataWithDefaults.from = txDataWithDefaults.from.toLowerCase();
            }
        
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        async validateAndSendTransactionAsync(
                _receiver: string,
                _depositTokenAddress: string,
                _depositAmount: BigNumber,
                _maxPriceAllowed: BigNumber,
            txData?: Partial<TxData> | undefined,
            ): Promise<string> {
            await (this as any).mintWithToken.callAsync(
        _receiver,
        _depositTokenAddress,
        _depositAmount,
        _maxPriceAllowed,
        txData,
            );
            const txHash =  await (this as any).mintWithToken.sendTransactionAsync(
        _receiver,
        _depositTokenAddress,
        _depositAmount,
        _maxPriceAllowed,
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
            _receiver: string,
            _depositTokenAddress: string,
            _depositAmount: BigNumber,
            _maxPriceAllowed: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            assert.isString('_receiver', _receiver);
            assert.isString('_depositTokenAddress', _depositTokenAddress);
            assert.isBigNumber('_depositAmount', _depositAmount);
            assert.isBigNumber('_maxPriceAllowed', _maxPriceAllowed);
            assert.doesConformToSchema('callData', callData, schemas.callDataSchema, [
                schemas.addressSchema,
                schemas.numberSchema,
                schemas.jsNumber,
            ]);
            if (defaultBlock !== undefined) {
                assert.isBlockParam('defaultBlock', defaultBlock);
            }
            const self = this as any as IPTokenContract;
            const encodedData = self._strictEncodeArguments('mintWithToken(address,address,uint256,uint256)', [_receiver.toLowerCase(),
        _depositTokenAddress.toLowerCase(),
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
            callDataWithDefaults.from = callDataWithDefaults.from ? callDataWithDefaults.from.toLowerCase() : callDataWithDefaults.from;
        
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('mintWithToken(address,address,uint256,uint256)');
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
                _receiver: string,
                _depositTokenAddress: string,
                _depositAmount: BigNumber,
                _maxPriceAllowed: BigNumber,
            ): string {
            assert.isString('_receiver', _receiver);
            assert.isString('_depositTokenAddress', _depositTokenAddress);
            assert.isBigNumber('_depositAmount', _depositAmount);
            assert.isBigNumber('_maxPriceAllowed', _maxPriceAllowed);
            const self = this as any as IPTokenContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('mintWithToken(address,address,uint256,uint256)', [_receiver.toLowerCase(),
        _depositTokenAddress.toLowerCase(),
        _depositAmount,
        _maxPriceAllowed
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
            const self = this as any as IPTokenContract;
            const abiEncoder = self._lookupAbiEncoder('mintWithToken(address,address,uint256,uint256)');
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
            const self = this as any as IPTokenContract;
            const abiEncoder = self._lookupAbiEncoder('mintWithToken(address,address,uint256,uint256)');
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
    ): Promise<IPTokenContract> {
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
        return IPTokenContract.deployAsync(bytecode, abi, provider, txDefaults, logDecodeDependenciesAbiOnly, );
    }
    public static async deployAsync(
        bytecode: string,
        abi: ContractAbi,
        supportedProvider: SupportedProvider,
        txDefaults: Partial<TxData>,
        logDecodeDependencies: { [contractName: string]: ContractAbi },
    ): Promise<IPTokenContract> {
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
        logUtils.log(`IPToken successfully deployed at ${txReceipt.contractAddress}`);
        const contractInstance = new IPTokenContract(txReceipt.contractAddress as string, provider, txDefaults, logDecodeDependencies);
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
                        name: '_receiver',
                        type: 'address',
                    },
                    {
                        name: '_depositTokenAddress',
                        type: 'address',
                    },
                    {
                        name: '_depositAmount',
                        type: 'uint256',
                    },
                    {
                        name: '_maxPriceAllowed',
                        type: 'uint256',
                    },
                ],
                name: 'mintWithToken',
                outputs: [
                    {
                        name: '',
                        type: 'uint256',
                    },
                ],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
        ] as ContractAbi;
        return abi;
    }
    constructor(address: string, supportedProvider: SupportedProvider, txDefaults?: Partial<TxData>, logDecodeDependencies?: { [contractName: string]: ContractAbi }) {
        super('IPToken', IPTokenContract.ABI(), address, supportedProvider, txDefaults, logDecodeDependencies);
        classUtils.bindAll(this, ['_abiEncoderByFunctionSignature', 'address', '_web3Wrapper']);
    }
} 

// tslint:disable:max-file-line-count
// tslint:enable:no-unbound-method no-parameter-reassignment no-consecutive-blank-lines ordered-imports align
// tslint:enable:trailing-comma whitespace no-trailing-whitespace
