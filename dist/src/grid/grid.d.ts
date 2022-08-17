import { Hex, HexConstructor, HexCoordinates, Point } from '../hex';
import { Direction, GridAsJSON, HexIterable, HexTraversable, Traverser } from './types';
export declare class Grid<T extends Hex> implements HexIterable<T>, HexTraversable<T> {
    #private;
    static fromIterable<T extends Hex>(hexes: Iterable<T>): Grid<T>;
    static fromJSON({ hexSettings, coordinates }: GridAsJSON): Grid<Hex>;
    get size(): number;
    get pixelWidth(): number;
    get pixelHeight(): number;
    [Symbol.iterator](): IterableIterator<T>;
    constructor(hexClass: HexConstructor<T>);
    constructor(hexClass: HexConstructor<T>, traversers: Traverser<T> | Traverser<T>[]);
    constructor(hexClass: HexConstructor<T>, hexes: Iterable<T>);
    constructor(grid: Grid<T>);
    createHex(coordinates?: HexCoordinates): T;
    getHex(coordinates: HexCoordinates): T | undefined;
    hasHex(hex: T): boolean;
    setHexes(hexes: Iterable<T>): this;
    filter(predicate: (hex: T) => boolean): Grid<T>;
    map(fn: (hex: T) => T): Grid<T>;
    traverse(traversers: Traverser<T> | Traverser<T>[], options?: {
        bail?: boolean;
    }): Grid<T>;
    traverse(hexes: Iterable<T>, options?: {
        bail?: boolean;
    }): Grid<T>;
    traverse(grid: Grid<T>, options?: {
        bail?: boolean;
    }): Grid<T>;
    forEach(fn: (hex: T) => void): this;
    reduce(reducer: (previousHex: T, currentHex: T) => T): T;
    reduce(reducer: (previousHex: T, currentHex: T) => T, initialValue: T): T;
    reduce<R>(reducer: (result: R, hex: T) => R, initialValue: R): R;
    toArray(): T[];
    toJSON(): GridAsJSON;
    toString(): string;
    pointToHex(point: Point, options?: {
        allowOutside: true;
    }): T;
    pointToHex(point: Point, options: {
        allowOutside: false;
    }): T | undefined;
    distance(from: HexCoordinates, to: HexCoordinates, options?: {
        allowOutside: true;
    }): number;
    distance(from: HexCoordinates, to: HexCoordinates, options: {
        allowOutside: false;
    }): number | undefined;
    neighborOf(coordinates: HexCoordinates, direction: Direction, options?: {
        allowOutside: true;
    }): T;
    neighborOf(coordinates: HexCoordinates, direction: Direction, options: {
        allowOutside: false;
    }): T | undefined;
}
