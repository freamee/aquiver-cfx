import { MultiplayerManager } from './Multiplayer';

export * from '@aquiver-cfx/shared';

export * from './Blip';
export * from './Colshape';
export { Label as Label } from './Label';
export { Marker } from './Marker';
export * as Utils from './utils';
export * from './Game';
export * from './Entity';
export * from './GameObject';

const mp = new MultiplayerManager();

export default mp;
