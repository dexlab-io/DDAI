import { Web3ProviderEngine, RPCSubprovider, BigNumber, ContractWrappers } from "0x.js";
import { Web3Wrapper, AbiDefinition, TxData, Web3JsV1Provider } from '@0x/web3-wrapper';
import { RevertTraceSubprovider, SolCompilerArtifactAdapter } from '@0x/sol-trace';
import path from 'path';

export const getProvider = async(solTrace: boolean) => {
    const pe: Web3ProviderEngine = new Web3ProviderEngine();

    if(solTrace) {
        console.log("reverting trace");
        // TODO should not use hard coded address
        const defaultFromAddress = "0x26006236eab6409d9fdecb16ed841033d6b4a6bc";
        const projectRoot = path.dirname(require.resolve('@ddai/contracts/package.json'));

        console.log(projectRoot);
        // const solcVersion = "0.5.11";
        const artifactAdapter = new SolCompilerArtifactAdapter(`${projectRoot}/build/artifacts`, `${projectRoot}/contracts`);
        const isVerbose = true;
        const revertTraceSubprovider = new RevertTraceSubprovider(artifactAdapter, defaultFromAddress, isVerbose);
    
        pe.addProvider(revertTraceSubprovider)    
    }
    // const rpcSubProvider = new SubscriptionsSubProvider();
    pe.addProvider(new RPCSubprovider('http://localhost:8545'));
    // pe.addProvider(rpcSubProvider);
    pe.start();
    const web3: Web3Wrapper = new Web3Wrapper(pe);
    return {pe, web3};
}