import { altShared } from '@aquiver-alt/shared';

export async function requestAnimDict(dictionary: string): Promise<void> {
	RequestAnimDict(dictionary);

	try {
		await altShared.waitFor(() => HasAnimDictLoaded(dictionary), 5000, 10);
	} catch (error) {
		throw new Error(`Failed to load animation dictionary: ${dictionary}`);
	}
}
