import { Web3ProviderEngine, RPCSubprovider, BigNumber, ContractWrappers } from "0x.js";
import { Web3Wrapper, AbiDefinition, TxData, Web3JsV1Provider } from '@0x/web3-wrapper';
import { RevertTraceSubprovider, SolCompilerArtifactAdapter } from '@0x/sol-trace';
import { CoverageSubprovider } from '@0x/sol-coverage';
import { MnemonicWalletSubprovider } from '@0x/subproviders';
import * as artifacts from '@ddai/contract-artifacts';
import path from 'path';
import { ContractArtifact } from "@0x/sol-tracing-utils/node_modules/ethereum-types";

export const getProvider = (solTrace: boolean = false, solCoverage: boolean = false) => {
    const pe: Web3ProviderEngine = new Web3ProviderEngine();

    let artifactAdapter: SolCompilerArtifactAdapter;
    const defaultFromAddress = "0x26006236eab6409d9fdecb16ed841033d6b4a6bc";
    let coverageSubProvider: CoverageSubprovider;
    if(solCoverage || solTrace) {
        console.log("Setting up artifacts adapter");
        const projectRoot = path.dirname(require.resolve('@ddai/contracts/package.json'));
        console.log(projectRoot);
        artifactAdapter = new SolCompilerArtifactAdapter(`${projectRoot}/build/artifacts`, `${projectRoot}/contracts`);
    }
    if(solCoverage) {
        console.log("Setting up sol-coverage");
        coverageSubProvider = new CoverageSubprovider(artifactAdapter, defaultFromAddress, {
            isVerbose: true
        });
        pe.addProvider(coverageSubProvider);
    }
    if(solTrace) {
        console.log("Setting up sol-trace");
        // TODO should not use hard coded address
        const revertTraceSubprovider = new RevertTraceSubprovider(artifactAdapter, defaultFromAddress);
        pe.addProvider(revertTraceSubprovider)    
    }
    // const rpcSubProvider = new SubscriptionsSubProvider();
    if(process.env.RPC_URL && process.env.MNEMONIC) {
        const mnemonicProvider = new MnemonicWalletSubprovider({
            mnemonic: process.env.MNEMONIC
        })
        pe.addProvider(mnemonicProvider);
        pe.addProvider(new RPCSubprovider(process.env.RPC_URL));
    } else{
        pe.addProvider(new RPCSubprovider('http://localhost:8545'));
    }
    // pe.addProvider(rpcSubProvider);
    pe.start();
    const web3: Web3Wrapper = new Web3Wrapper(pe);
    return {pe, web3, coverageSubProvider};
}

export const toWei = (amount: number | string | BigNumber) => {
    return Web3Wrapper.toWei(new BigNumber(amount));
}

type DeployArgs = [ ContractArtifact, Web3ProviderEngine, Partial<TxData> ]

export const getDeployArgs = (
    name: string,
    pe: Web3ProviderEngine,
    txDefaults
): DeployArgs => {
    return [
        artifacts[name],
        pe,
        txDefaults,
    ]
}