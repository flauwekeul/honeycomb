import { Hex, HexCoordinates } from '../../hex';
import { Rotation, Traverser } from '../types';
/**
 * @category Traverser
 */
export declare function spiral<T extends Hex>({ radius, start, rotation }: SpiralOptions): Traverser<T>;
/**
 * @category Traverser
 */
export interface SpiralOptions {
    start?: HexCoordinates;
    radius: number;
    rotation?: Rotation;
}
