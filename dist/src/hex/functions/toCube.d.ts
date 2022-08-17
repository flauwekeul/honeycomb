import { Hex } from '../hex';
import { CubeCoordinates, HexCoordinates } from '../types';
/**
 * Util for converting offset/axial/cube/tuple coordinates to cube coordinates.
 * @category Coordinates
 * @privateRemarks It's not placed in /src/utils because that causes circular dependencies.
 */
export declare function toCube(hex: Pick<Hex, 'offset' | 'isPointy'>, coordinates: HexCoordinates): CubeCoordinates;
