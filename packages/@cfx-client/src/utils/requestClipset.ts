import { waitFor } from '@aquiver-cfx/shared';

export async function requestClipset(clipSet: string): Promise<void> {
	RequestClipSet(clipSet);

	try {
		await waitFor(() => HasClipSetLoaded(clipSet), 5000, 10);
	} catch (error) {
		throw new Error(`Failed to load clipset: ${clipSet}`);
	}
}
