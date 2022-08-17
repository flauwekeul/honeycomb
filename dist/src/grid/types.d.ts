import { AxialCoordinates, Hex, HexCoordinates, HexSettings } from '../hex';
/**
 * @category Traverser
 */
export declare type Traverser<T extends Hex, R extends Iterable<T> = T[]> = (createHex: (coordinates?: HexCoordinates) => T, cursor?: HexCoordinates) => R;
/**
 * @category Traverser
 */
export declare enum Rotation {
    CLOCKWISE = "CLOCKWISE",
    COUNTERCLOCKWISE = "COUNTERCLOCKWISE"
}
/**
 * @category Grid
 */
export interface GridAsJSON {
    hexSettings: HexSettings;
    coordinates: AxialCoordinates[];
}
/**
 * @category Grid
 */
export declare enum Direction {
    N = 0,
    NE = 1,
    E = 2,
    SE = 3,
    S = 4,
    SW = 5,
    W = 6,
    NW = 7
}
/**
 * @category Grid
 */
export interface HexStore<T extends Hex> {
    readonly size: number;
    getHex(coordinates: HexCoordinates): T | undefined;
    hasHex(hex: T): boolean;
    setHexes(hexes: Iterable<T>): this;
}
/**
 * @category Grid
 */
export interface HexIterable<T extends Hex> extends Iterable<T>, HexStore<T> {
    [Symbol.iterator](): IterableIterator<T>;
    filter(predicate: (hex: T) => boolean): HexIterable<T>;
    map(fn: (hex: T) => T): HexIterable<T>;
    forEach(fn: (hex: T) => void): this;
    reduce(reducer: (previousHex: T, currentHex: T) => T): T;
    reduce(reducer: (previousHex: T, currentHex: T) => T, initialValue: T): T;
    reduce<R>(reducer: (result: R, hex: T) => R, initialValue: R): R;
    toArray(): T[];
}
/**
 * @category Grid
 */
export interface HexTraversable<T extends Hex> extends HexStore<T> {
    createHex(coordinates?: HexCoordinates): T;
    traverse(traversers: Traverser<T> | Traverser<T>[], options?: {
        bail?: boolean;
    }): HexTraversable<T>;
    traverse(hexes: Iterable<T>, options?: {
        bail?: boolean;
    }): HexTraversable<T>;
    traverse(grid: HexTraversable<T>, options?: {
        bail?: boolean;
    }): HexTraversable<T>;
}