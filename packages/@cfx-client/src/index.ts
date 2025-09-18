import { MultiplayerManager } from './Multiplayer';
import { RPC } from './RPC';

export * from '@aquiver-cfx/shared';

export * from './Blip';
export * from './utils';
export * from './Game';
export * from './Entity';
export * from './GameObject';
export * from './Input';

export const rpc = new RPC();

const mp = new MultiplayerManager();

export default mp;
