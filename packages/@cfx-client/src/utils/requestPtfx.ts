import { altShared } from '@aquiver-alt/shared';

export async function requestPtfx(fxName: string, timeout: number = 5000): Promise<void> {
	if (HasNamedPtfxAssetLoaded(fxName)) return;

	RequestNamedPtfxAsset(fxName);

	try {
		await altShared.waitFor(() => HasNamedPtfxAssetLoaded(fxName), timeout, 10);
	} catch (error) {
		throw new Error(`Failed to load ptfx effect: ${fxName}`);
	}
}
