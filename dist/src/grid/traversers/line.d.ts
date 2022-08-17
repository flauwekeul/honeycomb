import { Hex, HexCoordinates } from '../../hex';
import { Direction, Traverser } from '../types';
/**
 * @category Traverser
 */
export declare function line<T extends Hex>(options: LineAsVectorOptions): Traverser<T>;
export declare function line<T extends Hex>(options: LineBetweenOptions): Traverser<T>;
/**
 * @category Traverser
 */
export interface LineAsVectorOptions {
    start?: HexCoordinates;
    direction: Direction;
    length: number;
}
/**
 * @category Traverser
 */
export interface LineBetweenOptions {
    start?: HexCoordinates;
    /**
     * These coordinates are included in the line.
     */
    stop: HexCoordinates;
}
