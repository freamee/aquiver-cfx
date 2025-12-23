export * from './EventBridge';
export * from './Localization';

let resourceName: string = 'UNKNOWN_RESOURCE';

// @ts-ignore
if (typeof GetParentResourceName === 'function') {
	// @ts-ignore
	resourceName = GetParentResourceName();
}

export { resourceName };
