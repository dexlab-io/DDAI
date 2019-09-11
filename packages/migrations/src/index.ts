import * as wrappers from '@ddai/contract-wrappers';
import * as artifacts from '@ddai/contract-artifacts';


export const run = async () => {
    const mockDai = wrappers.MockDaiContract.deployFrom0xArtifactAsync(
        artifacts.MockDai,
    )

}