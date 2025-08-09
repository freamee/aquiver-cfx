import { altShared } from '@aquiver-alt/shared';

export async function requestModel(model: string | number, timeout: number = 5000): Promise<void> {
	const modelHash = typeof model === 'string' ? GetHashKey(model) : model;

	RequestModel(modelHash);

	try {
		await altShared.waitFor(() => HasModelLoaded(modelHash), timeout, 10);
	} catch (error) {
		throw new Error(`Failed to load model: ${model}`);
	}
}
