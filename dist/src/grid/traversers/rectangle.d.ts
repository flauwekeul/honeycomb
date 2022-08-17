import { Hex, HexCoordinates } from '../../hex';
import { Direction, Traverser } from '../types';
/**
 * @category Traverser
 * @remarks The rectangle will only have 90° corners for the directions North, East, South and West.
 */
export declare function rectangle<T extends Hex>(options: RectangleOptions): Traverser<T>;
export declare function rectangle<T extends Hex>(cornerA: HexCoordinates, cornerB: HexCoordinates): Traverser<T>;
/**
 * @category Traverser
 * @remarks The rectangle will only have 90° corners for the directions North, East, South and West.
 */
export interface RectangleOptions {
    start?: HexCoordinates;
    width: number;
    height: number;
    direction?: Direction;
}
/**
 * This is the "old way" of creating rectangles. It's less performant (up until ~40x slower with 200x200 rectangles), but it's able to create
 * actual rectangles (with 90° corners) for the ordinal directions. But because I assume people mostly need rectangles in the cardinal directions,
 * I've decided to drop "true ordinal rectangle" support for now.
 */
