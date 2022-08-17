import { Hex, HexCoordinates } from '../../hex';
import { Rotation, Traverser } from '../types';
/**
 * @category Traverser
 */
export declare function ring<T extends Hex>(options: RingOptions): Traverser<T>;
export declare function ring<T extends Hex>(options: RingFromRadiusOptions): Traverser<T>;
/**
 * @category Traverser
 */
export interface RingOptions {
    start?: HexCoordinates;
    center: HexCoordinates;
    rotation?: Rotation;
}
/**
 * @category Traverser
 */
export interface RingFromRadiusOptions {
    center: HexCoordinates;
    radius: number;
    rotation?: Rotation;
}
