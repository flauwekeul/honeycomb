import { Hex, HexCoordinates } from '../../hex';
export declare function distance(hex: Pick<Hex, 'offset' | 'isPointy'>, from: HexCoordinates, to: HexCoordinates): number;
