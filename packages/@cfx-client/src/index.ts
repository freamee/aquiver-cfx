import { MultiplayerManager } from './Multiplayer';

export * from '@aquiver-cfx/shared';

export * from './Blip';
export * from './utils';
export * from './Game';
export * from './Entity';
export * from './GameObject';
export * from './Input';
export * from './rpc';
export * from './EventBridge';
export * from './DUI';

const mp = new MultiplayerManager();

export default mp;
