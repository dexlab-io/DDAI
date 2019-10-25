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
export class IUniswapContract extends BaseContract {
    public addLiquidity = {
        async sendTransactionAsync(
            min_liquidity: BigNumber,
            max_tokens: BigNumber,
            deadline: BigNumber,
            txData: Partial<TxDataPayable> = {},
        ): Promise<string> {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('addLiquidity(uint256,uint256,uint256)', [min_liquidity,
    max_tokens,
    deadline
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.addLiquidity.estimateGasAsync.bind(
                    self,
                    min_liquidity,
                    max_tokens,
                    deadline
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            min_liquidity: BigNumber,
            max_tokens: BigNumber,
            deadline: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('addLiquidity(uint256,uint256,uint256)', [min_liquidity,
    max_tokens,
    deadline
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
            min_liquidity: BigNumber,
            max_tokens: BigNumber,
            deadline: BigNumber,
        ): string {
            const self = this as any as IUniswapContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('addLiquidity(uint256,uint256,uint256)', [min_liquidity,
    max_tokens,
    deadline
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            min_liquidity: BigNumber,
            max_tokens: BigNumber,
            deadline: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('addLiquidity(uint256,uint256,uint256)', [min_liquidity,
        max_tokens,
        deadline
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
            const abiEncoder = self._lookupAbiEncoder('addLiquidity(uint256,uint256,uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<BigNumber
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public allowance = {
        async callAsync(
            _owner: string,
            _spender: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('allowance(address,address)', [_owner,
        _spender
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
    public approve = {
        async sendTransactionAsync(
            _spender: string,
            _value: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('approve(address,uint256)', [_spender,
    _value
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
                    _spender,
                    _value
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            _spender: string,
            _value: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('approve(address,uint256)', [_spender,
    _value
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
            _spender: string,
            _value: BigNumber,
        ): string {
            const self = this as any as IUniswapContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('approve(address,uint256)', [_spender,
    _value
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            _spender: string,
            _value: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<boolean
        > {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('approve(address,uint256)', [_spender,
        _value
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
    public balanceOf = {
        async callAsync(
            _owner: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('balanceOf(address)', [_owner
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
    public decimals = {
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            const self = this as any as IUniswapContract;
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
    public ethToTokenSwapInput = {
        async sendTransactionAsync(
            min_tokens: BigNumber,
            deadline: BigNumber,
            txData: Partial<TxDataPayable> = {},
        ): Promise<string> {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('ethToTokenSwapInput(uint256,uint256)', [min_tokens,
    deadline
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.ethToTokenSwapInput.estimateGasAsync.bind(
                    self,
                    min_tokens,
                    deadline
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            min_tokens: BigNumber,
            deadline: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('ethToTokenSwapInput(uint256,uint256)', [min_tokens,
    deadline
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
            min_tokens: BigNumber,
            deadline: BigNumber,
        ): string {
            const self = this as any as IUniswapContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('ethToTokenSwapInput(uint256,uint256)', [min_tokens,
    deadline
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            min_tokens: BigNumber,
            deadline: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('ethToTokenSwapInput(uint256,uint256)', [min_tokens,
        deadline
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
            const abiEncoder = self._lookupAbiEncoder('ethToTokenSwapInput(uint256,uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<BigNumber
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public ethToTokenSwapOutput = {
        async sendTransactionAsync(
            tokens_bought: BigNumber,
            deadline: BigNumber,
            txData: Partial<TxDataPayable> = {},
        ): Promise<string> {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('ethToTokenSwapOutput(uint256,uint256)', [tokens_bought,
    deadline
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.ethToTokenSwapOutput.estimateGasAsync.bind(
                    self,
                    tokens_bought,
                    deadline
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            tokens_bought: BigNumber,
            deadline: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('ethToTokenSwapOutput(uint256,uint256)', [tokens_bought,
    deadline
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
            tokens_bought: BigNumber,
            deadline: BigNumber,
        ): string {
            const self = this as any as IUniswapContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('ethToTokenSwapOutput(uint256,uint256)', [tokens_bought,
    deadline
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            tokens_bought: BigNumber,
            deadline: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('ethToTokenSwapOutput(uint256,uint256)', [tokens_bought,
        deadline
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
            const abiEncoder = self._lookupAbiEncoder('ethToTokenSwapOutput(uint256,uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<BigNumber
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public ethToTokenTransferInput = {
        async sendTransactionAsync(
            min_tokens: BigNumber,
            deadline: BigNumber,
            recipient: string,
            txData: Partial<TxDataPayable> = {},
        ): Promise<string> {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('ethToTokenTransferInput(uint256,uint256,address)', [min_tokens,
    deadline,
    recipient
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.ethToTokenTransferInput.estimateGasAsync.bind(
                    self,
                    min_tokens,
                    deadline,
                    recipient
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            min_tokens: BigNumber,
            deadline: BigNumber,
            recipient: string,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('ethToTokenTransferInput(uint256,uint256,address)', [min_tokens,
    deadline,
    recipient
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
            min_tokens: BigNumber,
            deadline: BigNumber,
            recipient: string,
        ): string {
            const self = this as any as IUniswapContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('ethToTokenTransferInput(uint256,uint256,address)', [min_tokens,
    deadline,
    recipient
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            min_tokens: BigNumber,
            deadline: BigNumber,
            recipient: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('ethToTokenTransferInput(uint256,uint256,address)', [min_tokens,
        deadline,
        recipient
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
            const abiEncoder = self._lookupAbiEncoder('ethToTokenTransferInput(uint256,uint256,address)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<BigNumber
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public ethToTokenTransferOutput = {
        async sendTransactionAsync(
            tokens_bought: BigNumber,
            deadline: BigNumber,
            recipient: string,
            txData: Partial<TxDataPayable> = {},
        ): Promise<string> {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('ethToTokenTransferOutput(uint256,uint256,address)', [tokens_bought,
    deadline,
    recipient
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.ethToTokenTransferOutput.estimateGasAsync.bind(
                    self,
                    tokens_bought,
                    deadline,
                    recipient
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            tokens_bought: BigNumber,
            deadline: BigNumber,
            recipient: string,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('ethToTokenTransferOutput(uint256,uint256,address)', [tokens_bought,
    deadline,
    recipient
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
            tokens_bought: BigNumber,
            deadline: BigNumber,
            recipient: string,
        ): string {
            const self = this as any as IUniswapContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('ethToTokenTransferOutput(uint256,uint256,address)', [tokens_bought,
    deadline,
    recipient
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            tokens_bought: BigNumber,
            deadline: BigNumber,
            recipient: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('ethToTokenTransferOutput(uint256,uint256,address)', [tokens_bought,
        deadline,
        recipient
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
            const abiEncoder = self._lookupAbiEncoder('ethToTokenTransferOutput(uint256,uint256,address)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<BigNumber
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public factoryAddress = {
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<string
        > {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('factoryAddress()', []);
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
            const abiEncoder = self._lookupAbiEncoder('factoryAddress()');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<string
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public getEthToTokenInputPrice = {
        async callAsync(
            eth_sold: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('getEthToTokenInputPrice(uint256)', [eth_sold
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
            const abiEncoder = self._lookupAbiEncoder('getEthToTokenInputPrice(uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<BigNumber
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public getEthToTokenOutputPrice = {
        async callAsync(
            tokens_bought: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('getEthToTokenOutputPrice(uint256)', [tokens_bought
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
            const abiEncoder = self._lookupAbiEncoder('getEthToTokenOutputPrice(uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<BigNumber
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public getTokenToEthInputPrice = {
        async callAsync(
            tokens_sold: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('getTokenToEthInputPrice(uint256)', [tokens_sold
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
            const abiEncoder = self._lookupAbiEncoder('getTokenToEthInputPrice(uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<BigNumber
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public getTokenToEthOutputPrice = {
        async callAsync(
            eth_bought: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('getTokenToEthOutputPrice(uint256)', [eth_bought
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
            const abiEncoder = self._lookupAbiEncoder('getTokenToEthOutputPrice(uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<BigNumber
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
            const self = this as any as IUniswapContract;
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
    public removeLiquidity = {
        async sendTransactionAsync(
            amount: BigNumber,
            min_eth: BigNumber,
            min_tokens: BigNumber,
            deadline: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('removeLiquidity(uint256,uint256,uint256,uint256)', [amount,
    min_eth,
    min_tokens,
    deadline
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.removeLiquidity.estimateGasAsync.bind(
                    self,
                    amount,
                    min_eth,
                    min_tokens,
                    deadline
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            amount: BigNumber,
            min_eth: BigNumber,
            min_tokens: BigNumber,
            deadline: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('removeLiquidity(uint256,uint256,uint256,uint256)', [amount,
    min_eth,
    min_tokens,
    deadline
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
            min_eth: BigNumber,
            min_tokens: BigNumber,
            deadline: BigNumber,
        ): string {
            const self = this as any as IUniswapContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('removeLiquidity(uint256,uint256,uint256,uint256)', [amount,
    min_eth,
    min_tokens,
    deadline
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            amount: BigNumber,
            min_eth: BigNumber,
            min_tokens: BigNumber,
            deadline: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<[BigNumber, BigNumber]
        > {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('removeLiquidity(uint256,uint256,uint256,uint256)', [amount,
        min_eth,
        min_tokens,
        deadline
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
            const abiEncoder = self._lookupAbiEncoder('removeLiquidity(uint256,uint256,uint256,uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<[BigNumber, BigNumber]
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public setup = {
        async sendTransactionAsync(
            token_addr: string,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('setup(address)', [token_addr
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.setup.estimateGasAsync.bind(
                    self,
                    token_addr
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            token_addr: string,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('setup(address)', [token_addr
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
            token_addr: string,
        ): string {
            const self = this as any as IUniswapContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('setup(address)', [token_addr
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            token_addr: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('setup(address)', [token_addr
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
            const abiEncoder = self._lookupAbiEncoder('setup(address)');
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
            const self = this as any as IUniswapContract;
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
    public tokenAddress = {
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<string
        > {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('tokenAddress()', []);
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
            const abiEncoder = self._lookupAbiEncoder('tokenAddress()');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<string
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public tokenToEthSwapInput = {
        async sendTransactionAsync(
            tokens_sold: BigNumber,
            min_eth: BigNumber,
            deadline: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('tokenToEthSwapInput(uint256,uint256,uint256)', [tokens_sold,
    min_eth,
    deadline
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.tokenToEthSwapInput.estimateGasAsync.bind(
                    self,
                    tokens_sold,
                    min_eth,
                    deadline
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            tokens_sold: BigNumber,
            min_eth: BigNumber,
            deadline: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('tokenToEthSwapInput(uint256,uint256,uint256)', [tokens_sold,
    min_eth,
    deadline
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
            tokens_sold: BigNumber,
            min_eth: BigNumber,
            deadline: BigNumber,
        ): string {
            const self = this as any as IUniswapContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('tokenToEthSwapInput(uint256,uint256,uint256)', [tokens_sold,
    min_eth,
    deadline
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            tokens_sold: BigNumber,
            min_eth: BigNumber,
            deadline: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('tokenToEthSwapInput(uint256,uint256,uint256)', [tokens_sold,
        min_eth,
        deadline
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
            const abiEncoder = self._lookupAbiEncoder('tokenToEthSwapInput(uint256,uint256,uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<BigNumber
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public tokenToEthSwapOutput = {
        async sendTransactionAsync(
            eth_bought: BigNumber,
            max_tokens: BigNumber,
            deadline: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('tokenToEthSwapOutput(uint256,uint256,uint256)', [eth_bought,
    max_tokens,
    deadline
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.tokenToEthSwapOutput.estimateGasAsync.bind(
                    self,
                    eth_bought,
                    max_tokens,
                    deadline
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            eth_bought: BigNumber,
            max_tokens: BigNumber,
            deadline: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('tokenToEthSwapOutput(uint256,uint256,uint256)', [eth_bought,
    max_tokens,
    deadline
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
            eth_bought: BigNumber,
            max_tokens: BigNumber,
            deadline: BigNumber,
        ): string {
            const self = this as any as IUniswapContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('tokenToEthSwapOutput(uint256,uint256,uint256)', [eth_bought,
    max_tokens,
    deadline
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            eth_bought: BigNumber,
            max_tokens: BigNumber,
            deadline: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('tokenToEthSwapOutput(uint256,uint256,uint256)', [eth_bought,
        max_tokens,
        deadline
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
            const abiEncoder = self._lookupAbiEncoder('tokenToEthSwapOutput(uint256,uint256,uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<BigNumber
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public tokenToEthTransferInput = {
        async sendTransactionAsync(
            tokens_sold: BigNumber,
            min_eth: BigNumber,
            deadline: BigNumber,
            recipient: string,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('tokenToEthTransferInput(uint256,uint256,uint256,address)', [tokens_sold,
    min_eth,
    deadline,
    recipient
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.tokenToEthTransferInput.estimateGasAsync.bind(
                    self,
                    tokens_sold,
                    min_eth,
                    deadline,
                    recipient
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            tokens_sold: BigNumber,
            min_eth: BigNumber,
            deadline: BigNumber,
            recipient: string,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('tokenToEthTransferInput(uint256,uint256,uint256,address)', [tokens_sold,
    min_eth,
    deadline,
    recipient
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
            tokens_sold: BigNumber,
            min_eth: BigNumber,
            deadline: BigNumber,
            recipient: string,
        ): string {
            const self = this as any as IUniswapContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('tokenToEthTransferInput(uint256,uint256,uint256,address)', [tokens_sold,
    min_eth,
    deadline,
    recipient
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            tokens_sold: BigNumber,
            min_eth: BigNumber,
            deadline: BigNumber,
            recipient: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('tokenToEthTransferInput(uint256,uint256,uint256,address)', [tokens_sold,
        min_eth,
        deadline,
        recipient
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
            const abiEncoder = self._lookupAbiEncoder('tokenToEthTransferInput(uint256,uint256,uint256,address)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<BigNumber
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public tokenToEthTransferOutput = {
        async sendTransactionAsync(
            eth_bought: BigNumber,
            max_tokens: BigNumber,
            deadline: BigNumber,
            recipient: string,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('tokenToEthTransferOutput(uint256,uint256,uint256,address)', [eth_bought,
    max_tokens,
    deadline,
    recipient
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.tokenToEthTransferOutput.estimateGasAsync.bind(
                    self,
                    eth_bought,
                    max_tokens,
                    deadline,
                    recipient
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            eth_bought: BigNumber,
            max_tokens: BigNumber,
            deadline: BigNumber,
            recipient: string,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('tokenToEthTransferOutput(uint256,uint256,uint256,address)', [eth_bought,
    max_tokens,
    deadline,
    recipient
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
            eth_bought: BigNumber,
            max_tokens: BigNumber,
            deadline: BigNumber,
            recipient: string,
        ): string {
            const self = this as any as IUniswapContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('tokenToEthTransferOutput(uint256,uint256,uint256,address)', [eth_bought,
    max_tokens,
    deadline,
    recipient
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            eth_bought: BigNumber,
            max_tokens: BigNumber,
            deadline: BigNumber,
            recipient: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('tokenToEthTransferOutput(uint256,uint256,uint256,address)', [eth_bought,
        max_tokens,
        deadline,
        recipient
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
            const abiEncoder = self._lookupAbiEncoder('tokenToEthTransferOutput(uint256,uint256,uint256,address)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<BigNumber
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public tokenToExchangeSwapInput = {
        async sendTransactionAsync(
            tokens_sold: BigNumber,
            min_tokens_bought: BigNumber,
            min_eth_bought: BigNumber,
            deadline: BigNumber,
            exchange_addr: string,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('tokenToExchangeSwapInput(uint256,uint256,uint256,uint256,address)', [tokens_sold,
    min_tokens_bought,
    min_eth_bought,
    deadline,
    exchange_addr
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.tokenToExchangeSwapInput.estimateGasAsync.bind(
                    self,
                    tokens_sold,
                    min_tokens_bought,
                    min_eth_bought,
                    deadline,
                    exchange_addr
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            tokens_sold: BigNumber,
            min_tokens_bought: BigNumber,
            min_eth_bought: BigNumber,
            deadline: BigNumber,
            exchange_addr: string,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('tokenToExchangeSwapInput(uint256,uint256,uint256,uint256,address)', [tokens_sold,
    min_tokens_bought,
    min_eth_bought,
    deadline,
    exchange_addr
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
            tokens_sold: BigNumber,
            min_tokens_bought: BigNumber,
            min_eth_bought: BigNumber,
            deadline: BigNumber,
            exchange_addr: string,
        ): string {
            const self = this as any as IUniswapContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('tokenToExchangeSwapInput(uint256,uint256,uint256,uint256,address)', [tokens_sold,
    min_tokens_bought,
    min_eth_bought,
    deadline,
    exchange_addr
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            tokens_sold: BigNumber,
            min_tokens_bought: BigNumber,
            min_eth_bought: BigNumber,
            deadline: BigNumber,
            exchange_addr: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('tokenToExchangeSwapInput(uint256,uint256,uint256,uint256,address)', [tokens_sold,
        min_tokens_bought,
        min_eth_bought,
        deadline,
        exchange_addr
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
            const abiEncoder = self._lookupAbiEncoder('tokenToExchangeSwapInput(uint256,uint256,uint256,uint256,address)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<BigNumber
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public tokenToExchangeSwapOutput = {
        async sendTransactionAsync(
            tokens_bought: BigNumber,
            max_tokens_sold: BigNumber,
            max_eth_sold: BigNumber,
            deadline: BigNumber,
            exchange_addr: string,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('tokenToExchangeSwapOutput(uint256,uint256,uint256,uint256,address)', [tokens_bought,
    max_tokens_sold,
    max_eth_sold,
    deadline,
    exchange_addr
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.tokenToExchangeSwapOutput.estimateGasAsync.bind(
                    self,
                    tokens_bought,
                    max_tokens_sold,
                    max_eth_sold,
                    deadline,
                    exchange_addr
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            tokens_bought: BigNumber,
            max_tokens_sold: BigNumber,
            max_eth_sold: BigNumber,
            deadline: BigNumber,
            exchange_addr: string,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('tokenToExchangeSwapOutput(uint256,uint256,uint256,uint256,address)', [tokens_bought,
    max_tokens_sold,
    max_eth_sold,
    deadline,
    exchange_addr
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
            tokens_bought: BigNumber,
            max_tokens_sold: BigNumber,
            max_eth_sold: BigNumber,
            deadline: BigNumber,
            exchange_addr: string,
        ): string {
            const self = this as any as IUniswapContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('tokenToExchangeSwapOutput(uint256,uint256,uint256,uint256,address)', [tokens_bought,
    max_tokens_sold,
    max_eth_sold,
    deadline,
    exchange_addr
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            tokens_bought: BigNumber,
            max_tokens_sold: BigNumber,
            max_eth_sold: BigNumber,
            deadline: BigNumber,
            exchange_addr: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('tokenToExchangeSwapOutput(uint256,uint256,uint256,uint256,address)', [tokens_bought,
        max_tokens_sold,
        max_eth_sold,
        deadline,
        exchange_addr
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
            const abiEncoder = self._lookupAbiEncoder('tokenToExchangeSwapOutput(uint256,uint256,uint256,uint256,address)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<BigNumber
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public tokenToExchangeTransferInput = {
        async sendTransactionAsync(
            tokens_sold: BigNumber,
            min_tokens_bought: BigNumber,
            min_eth_bought: BigNumber,
            deadline: BigNumber,
            recipient: string,
            exchange_addr: string,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('tokenToExchangeTransferInput(uint256,uint256,uint256,uint256,address,address)', [tokens_sold,
    min_tokens_bought,
    min_eth_bought,
    deadline,
    recipient,
    exchange_addr
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.tokenToExchangeTransferInput.estimateGasAsync.bind(
                    self,
                    tokens_sold,
                    min_tokens_bought,
                    min_eth_bought,
                    deadline,
                    recipient,
                    exchange_addr
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            tokens_sold: BigNumber,
            min_tokens_bought: BigNumber,
            min_eth_bought: BigNumber,
            deadline: BigNumber,
            recipient: string,
            exchange_addr: string,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('tokenToExchangeTransferInput(uint256,uint256,uint256,uint256,address,address)', [tokens_sold,
    min_tokens_bought,
    min_eth_bought,
    deadline,
    recipient,
    exchange_addr
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
            tokens_sold: BigNumber,
            min_tokens_bought: BigNumber,
            min_eth_bought: BigNumber,
            deadline: BigNumber,
            recipient: string,
            exchange_addr: string,
        ): string {
            const self = this as any as IUniswapContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('tokenToExchangeTransferInput(uint256,uint256,uint256,uint256,address,address)', [tokens_sold,
    min_tokens_bought,
    min_eth_bought,
    deadline,
    recipient,
    exchange_addr
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            tokens_sold: BigNumber,
            min_tokens_bought: BigNumber,
            min_eth_bought: BigNumber,
            deadline: BigNumber,
            recipient: string,
            exchange_addr: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('tokenToExchangeTransferInput(uint256,uint256,uint256,uint256,address,address)', [tokens_sold,
        min_tokens_bought,
        min_eth_bought,
        deadline,
        recipient,
        exchange_addr
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
            const abiEncoder = self._lookupAbiEncoder('tokenToExchangeTransferInput(uint256,uint256,uint256,uint256,address,address)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<BigNumber
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public tokenToExchangeTransferOutput = {
        async sendTransactionAsync(
            tokens_bought: BigNumber,
            max_tokens_sold: BigNumber,
            max_eth_sold: BigNumber,
            deadline: BigNumber,
            recipient: string,
            exchange_addr: string,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('tokenToExchangeTransferOutput(uint256,uint256,uint256,uint256,address,address)', [tokens_bought,
    max_tokens_sold,
    max_eth_sold,
    deadline,
    recipient,
    exchange_addr
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.tokenToExchangeTransferOutput.estimateGasAsync.bind(
                    self,
                    tokens_bought,
                    max_tokens_sold,
                    max_eth_sold,
                    deadline,
                    recipient,
                    exchange_addr
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            tokens_bought: BigNumber,
            max_tokens_sold: BigNumber,
            max_eth_sold: BigNumber,
            deadline: BigNumber,
            recipient: string,
            exchange_addr: string,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('tokenToExchangeTransferOutput(uint256,uint256,uint256,uint256,address,address)', [tokens_bought,
    max_tokens_sold,
    max_eth_sold,
    deadline,
    recipient,
    exchange_addr
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
            tokens_bought: BigNumber,
            max_tokens_sold: BigNumber,
            max_eth_sold: BigNumber,
            deadline: BigNumber,
            recipient: string,
            exchange_addr: string,
        ): string {
            const self = this as any as IUniswapContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('tokenToExchangeTransferOutput(uint256,uint256,uint256,uint256,address,address)', [tokens_bought,
    max_tokens_sold,
    max_eth_sold,
    deadline,
    recipient,
    exchange_addr
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            tokens_bought: BigNumber,
            max_tokens_sold: BigNumber,
            max_eth_sold: BigNumber,
            deadline: BigNumber,
            recipient: string,
            exchange_addr: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('tokenToExchangeTransferOutput(uint256,uint256,uint256,uint256,address,address)', [tokens_bought,
        max_tokens_sold,
        max_eth_sold,
        deadline,
        recipient,
        exchange_addr
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
            const abiEncoder = self._lookupAbiEncoder('tokenToExchangeTransferOutput(uint256,uint256,uint256,uint256,address,address)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<BigNumber
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public tokenToTokenSwapInput = {
        async sendTransactionAsync(
            tokens_sold: BigNumber,
            min_tokens_bought: BigNumber,
            min_eth_bought: BigNumber,
            deadline: BigNumber,
            token_addr: string,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('tokenToTokenSwapInput(uint256,uint256,uint256,uint256,address)', [tokens_sold,
    min_tokens_bought,
    min_eth_bought,
    deadline,
    token_addr
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.tokenToTokenSwapInput.estimateGasAsync.bind(
                    self,
                    tokens_sold,
                    min_tokens_bought,
                    min_eth_bought,
                    deadline,
                    token_addr
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            tokens_sold: BigNumber,
            min_tokens_bought: BigNumber,
            min_eth_bought: BigNumber,
            deadline: BigNumber,
            token_addr: string,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('tokenToTokenSwapInput(uint256,uint256,uint256,uint256,address)', [tokens_sold,
    min_tokens_bought,
    min_eth_bought,
    deadline,
    token_addr
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
            tokens_sold: BigNumber,
            min_tokens_bought: BigNumber,
            min_eth_bought: BigNumber,
            deadline: BigNumber,
            token_addr: string,
        ): string {
            const self = this as any as IUniswapContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('tokenToTokenSwapInput(uint256,uint256,uint256,uint256,address)', [tokens_sold,
    min_tokens_bought,
    min_eth_bought,
    deadline,
    token_addr
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            tokens_sold: BigNumber,
            min_tokens_bought: BigNumber,
            min_eth_bought: BigNumber,
            deadline: BigNumber,
            token_addr: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('tokenToTokenSwapInput(uint256,uint256,uint256,uint256,address)', [tokens_sold,
        min_tokens_bought,
        min_eth_bought,
        deadline,
        token_addr
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
            const abiEncoder = self._lookupAbiEncoder('tokenToTokenSwapInput(uint256,uint256,uint256,uint256,address)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<BigNumber
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public tokenToTokenSwapOutput = {
        async sendTransactionAsync(
            tokens_bought: BigNumber,
            max_tokens_sold: BigNumber,
            max_eth_sold: BigNumber,
            deadline: BigNumber,
            token_addr: string,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('tokenToTokenSwapOutput(uint256,uint256,uint256,uint256,address)', [tokens_bought,
    max_tokens_sold,
    max_eth_sold,
    deadline,
    token_addr
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.tokenToTokenSwapOutput.estimateGasAsync.bind(
                    self,
                    tokens_bought,
                    max_tokens_sold,
                    max_eth_sold,
                    deadline,
                    token_addr
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            tokens_bought: BigNumber,
            max_tokens_sold: BigNumber,
            max_eth_sold: BigNumber,
            deadline: BigNumber,
            token_addr: string,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('tokenToTokenSwapOutput(uint256,uint256,uint256,uint256,address)', [tokens_bought,
    max_tokens_sold,
    max_eth_sold,
    deadline,
    token_addr
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
            tokens_bought: BigNumber,
            max_tokens_sold: BigNumber,
            max_eth_sold: BigNumber,
            deadline: BigNumber,
            token_addr: string,
        ): string {
            const self = this as any as IUniswapContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('tokenToTokenSwapOutput(uint256,uint256,uint256,uint256,address)', [tokens_bought,
    max_tokens_sold,
    max_eth_sold,
    deadline,
    token_addr
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            tokens_bought: BigNumber,
            max_tokens_sold: BigNumber,
            max_eth_sold: BigNumber,
            deadline: BigNumber,
            token_addr: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('tokenToTokenSwapOutput(uint256,uint256,uint256,uint256,address)', [tokens_bought,
        max_tokens_sold,
        max_eth_sold,
        deadline,
        token_addr
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
            const abiEncoder = self._lookupAbiEncoder('tokenToTokenSwapOutput(uint256,uint256,uint256,uint256,address)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<BigNumber
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public tokenToTokenTransferInput = {
        async sendTransactionAsync(
            tokens_sold: BigNumber,
            min_tokens_bought: BigNumber,
            min_eth_bought: BigNumber,
            deadline: BigNumber,
            recipient: string,
            token_addr: string,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('tokenToTokenTransferInput(uint256,uint256,uint256,uint256,address,address)', [tokens_sold,
    min_tokens_bought,
    min_eth_bought,
    deadline,
    recipient,
    token_addr
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.tokenToTokenTransferInput.estimateGasAsync.bind(
                    self,
                    tokens_sold,
                    min_tokens_bought,
                    min_eth_bought,
                    deadline,
                    recipient,
                    token_addr
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            tokens_sold: BigNumber,
            min_tokens_bought: BigNumber,
            min_eth_bought: BigNumber,
            deadline: BigNumber,
            recipient: string,
            token_addr: string,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('tokenToTokenTransferInput(uint256,uint256,uint256,uint256,address,address)', [tokens_sold,
    min_tokens_bought,
    min_eth_bought,
    deadline,
    recipient,
    token_addr
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
            tokens_sold: BigNumber,
            min_tokens_bought: BigNumber,
            min_eth_bought: BigNumber,
            deadline: BigNumber,
            recipient: string,
            token_addr: string,
        ): string {
            const self = this as any as IUniswapContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('tokenToTokenTransferInput(uint256,uint256,uint256,uint256,address,address)', [tokens_sold,
    min_tokens_bought,
    min_eth_bought,
    deadline,
    recipient,
    token_addr
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            tokens_sold: BigNumber,
            min_tokens_bought: BigNumber,
            min_eth_bought: BigNumber,
            deadline: BigNumber,
            recipient: string,
            token_addr: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('tokenToTokenTransferInput(uint256,uint256,uint256,uint256,address,address)', [tokens_sold,
        min_tokens_bought,
        min_eth_bought,
        deadline,
        recipient,
        token_addr
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
            const abiEncoder = self._lookupAbiEncoder('tokenToTokenTransferInput(uint256,uint256,uint256,uint256,address,address)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<BigNumber
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public tokenToTokenTransferOutput = {
        async sendTransactionAsync(
            tokens_bought: BigNumber,
            max_tokens_sold: BigNumber,
            max_eth_sold: BigNumber,
            deadline: BigNumber,
            recipient: string,
            token_addr: string,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('tokenToTokenTransferOutput(uint256,uint256,uint256,uint256,address,address)', [tokens_bought,
    max_tokens_sold,
    max_eth_sold,
    deadline,
    recipient,
    token_addr
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.tokenToTokenTransferOutput.estimateGasAsync.bind(
                    self,
                    tokens_bought,
                    max_tokens_sold,
                    max_eth_sold,
                    deadline,
                    recipient,
                    token_addr
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            tokens_bought: BigNumber,
            max_tokens_sold: BigNumber,
            max_eth_sold: BigNumber,
            deadline: BigNumber,
            recipient: string,
            token_addr: string,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('tokenToTokenTransferOutput(uint256,uint256,uint256,uint256,address,address)', [tokens_bought,
    max_tokens_sold,
    max_eth_sold,
    deadline,
    recipient,
    token_addr
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
            tokens_bought: BigNumber,
            max_tokens_sold: BigNumber,
            max_eth_sold: BigNumber,
            deadline: BigNumber,
            recipient: string,
            token_addr: string,
        ): string {
            const self = this as any as IUniswapContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('tokenToTokenTransferOutput(uint256,uint256,uint256,uint256,address,address)', [tokens_bought,
    max_tokens_sold,
    max_eth_sold,
    deadline,
    recipient,
    token_addr
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            tokens_bought: BigNumber,
            max_tokens_sold: BigNumber,
            max_eth_sold: BigNumber,
            deadline: BigNumber,
            recipient: string,
            token_addr: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('tokenToTokenTransferOutput(uint256,uint256,uint256,uint256,address,address)', [tokens_bought,
        max_tokens_sold,
        max_eth_sold,
        deadline,
        recipient,
        token_addr
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
            const abiEncoder = self._lookupAbiEncoder('tokenToTokenTransferOutput(uint256,uint256,uint256,uint256,address,address)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<BigNumber
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
            const self = this as any as IUniswapContract;
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
    public transfer = {
        async sendTransactionAsync(
            _to: string,
            _value: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('transfer(address,uint256)', [_to,
    _value
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
                    _to,
                    _value
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            _to: string,
            _value: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('transfer(address,uint256)', [_to,
    _value
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
            _to: string,
            _value: BigNumber,
        ): string {
            const self = this as any as IUniswapContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('transfer(address,uint256)', [_to,
    _value
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            _to: string,
            _value: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<boolean
        > {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('transfer(address,uint256)', [_to,
        _value
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
    public transferFrom = {
        async sendTransactionAsync(
            _from: string,
            _to: string,
            value: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('transferFrom(address,address,uint256)', [_from,
    _to,
    value
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
                    _from,
                    _to,
                    value
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        async estimateGasAsync(
            _from: string,
            _to: string,
            value: BigNumber,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('transferFrom(address,address,uint256)', [_from,
    _to,
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
            _from: string,
            _to: string,
            value: BigNumber,
        ): string {
            const self = this as any as IUniswapContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('transferFrom(address,address,uint256)', [_from,
    _to,
    value
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            _from: string,
            _to: string,
            value: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<boolean
        > {
            const self = this as any as IUniswapContract;
            const encodedData = self._strictEncodeArguments('transferFrom(address,address,uint256)', [_from,
        _to,
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
            const abiEncoder = self._lookupAbiEncoder('transferFrom(address,address,uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<boolean
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public static async deployFrom0xArtifactAsync(
        artifact: ContractArtifact | SimpleContractArtifact | any,
        provider: Provider,
        txDefaults: Partial<TxData>,
    ): Promise<IUniswapContract> {
        if (_.isUndefined(artifact.compilerOutput)) {
            throw new Error('Compiler output not found in the artifact file');
        }
        const bytecode = artifact.compilerOutput.evm.bytecode.object;
        const abi = artifact.compilerOutput.abi;
        return IUniswapContract.deployAsync(bytecode, abi, provider, txDefaults, );
    }
    public static async deployAsync(
        bytecode: string,
        abi: ContractAbi,
        provider: Provider,
        txDefaults: Partial<TxData>,
    ): Promise<IUniswapContract> {
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
        const contractInstance = new IUniswapContract(abi, txReceipt.contractAddress as string, provider, txDefaults);
        contractInstance.constructorArgs = [];
        return contractInstance;
    }
    constructor(abi: ContractAbi, address: string, provider: Provider, txDefaults?: Partial<TxData>) {
        super('IUniswap', abi, address, provider, txDefaults);
        classUtils.bindAll(this, ['_abiEncoderByFunctionSignature', 'address', 'abi', '_web3Wrapper']);
    }
} // tslint:disable:max-file-line-count
// tslint:enable:no-unbound-method
