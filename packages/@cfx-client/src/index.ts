import { MultiplayerManager } from './Multiplayer';

export * from '@aquiver-cfx/shared';

export * from './Blip';
export * from './utils';
export * from './Game';
export * from './Entity';
export * from './GameObject';
export * from './Input';

const mp = new MultiplayerManager();

export default mp;
