import { waitFor } from '@aquiver-cfx/shared';
export async function requestAnimDict(dictionary) {
    RequestAnimDict(dictionary);
    try {
        await waitFor(() => HasAnimDictLoaded(dictionary), 5000, 10);
    }
    catch (error) {
        throw new Error(`Failed to load animation dictionary: ${dictionary}`);
    }
}
