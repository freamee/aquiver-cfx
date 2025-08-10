import { waitFor } from '@aquiver-cfx/shared';
export async function requestPtfx(fxName, timeout = 5000) {
    if (HasNamedPtfxAssetLoaded(fxName))
        return;
    RequestNamedPtfxAsset(fxName);
    try {
        await waitFor(() => HasNamedPtfxAssetLoaded(fxName), timeout, 10);
    }
    catch (error) {
        throw new Error(`Failed to load ptfx effect: ${fxName}`);
    }
}
