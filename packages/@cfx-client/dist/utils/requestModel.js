import { waitFor } from '@aquiver-cfx/shared';
export async function requestModel(model, timeout = 5000) {
    const modelHash = typeof model === 'string' ? GetHashKey(model) : model;
    RequestModel(modelHash);
    try {
        await waitFor(() => HasModelLoaded(modelHash), timeout, 10);
    }
    catch (error) {
        throw new Error(`Failed to load model: ${model}`);
    }
}
