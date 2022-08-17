import { Hex } from '../hex';
import { CubeCoordinates, PartialCubeCoordinates } from '../types';
/**
 * @category Hex
 */
export declare function translate<T extends Hex>(hex: T, delta: PartialCubeCoordinates): T;
export declare function translate(coordinates: PartialCubeCoordinates, delta: PartialCubeCoordinates): CubeCoordinates;
