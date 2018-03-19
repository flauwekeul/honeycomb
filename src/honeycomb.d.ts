declare function defineGrid<T = HexFactory<T>>(Hex?: HexFactory<T>): GridFactory<T>

export interface GridFactory<T> {
    (arrayOrHex?: Array<Hex<T>> | Hex<T>, ...hexes: Array<Hex<T>>): Grid<ExtendedHex<T>>
    isValidHex(value: any): boolean
    pointToHex(pointOrX?: PointCoordinates, y?: number): ExtendedHex<T>
    parallelogram(options: {
        width: number,
        height: number,
        start?: HexCoordinates,
        direction?: 1 | 3 | 5,
        onCreate?: onCreateCallback<T>
    }): Grid<ExtendedHex<T>>
    triangle(options: {
        size: number,
        start?: HexCoordinates,
        direction?: 1 | 5,
        onCreate?: onCreateCallback<T>
    }): Grid<ExtendedHex<T>>
    hexagon(options: {
        radius: number,
        center?: HexCoordinates,
        onCreate?: onCreateCallback<T>
    }): Grid<ExtendedHex<T>>
    rectangle(options: {
        width: number,
        height: number,
        start?: HexCoordinates,
        direction?: CompassDirection | number,
        onCreate?: onCreateCallback<T>
    }): Grid<ExtendedHex<T>>
}

export type onCreateCallback<T> = (hex: ExtendedHex<T>, grid: Grid<ExtendedHex<T>>) => void

export class Grid<T> extends Array<T> {
    // defined in class:
    fill(): never
    includes(point: PointCoordinates, fromIndex?: number): boolean
    indexOf(point: PointCoordinates, fromIndex?: number): number
    lastIndexOf(point: PointCoordinates, fromIndex?: number): number
    push(...hexes: T[]): number
    splice(start: number, deleteCount?: number): Grid<T>
    splice(start: number, deleteCount: number, ...hexes: T[]): Grid<T>
    unshift(...hexes: T[]): number

    // inherited from Array.prototype:
    concat(...items: Array<T | ConcatArray<T>>): Grid<T>
    filter(callbackfn: (hex: T, index: number, grid: Grid<T>) => any, thisArg?: any): Grid<T>
    find(predicate: (hex: T, index: number, grid: Grid<T>) => any, thisArg?: any): T | undefined
    findIndex(predicate: (hex: T, index: number, grid: Grid<T>) => any, thisArg?: any): number
    forEach(callbackfn: (hex: T, index: number, grid: Grid<T>) => void, thisArg?: any): void
    map<U>(callbackfn: (hex: T, index: number, grid: Grid<T>) => U, thisArg?: any): Grid<U>
    reduce<U>(callbackfn: (previousValue: U, hex: T, index: number, grid: Grid<T>) => U, initialValue?: U): U
    reduceRight<U>(callbackfn: (previousValue: U, hex: T, index: number, grid: Grid<T>) => U, initialValue?: U): U
    reverse(): Grid<T>
    some(callbackfn: (hex: T, index: number, grid: Grid<T>) => any, thisArg?: any): boolean

    // defined in prototype:
    get(keyOrPoint: number | PointCoordinates): T | undefined
    hexesBetween(firstHex: T, lastHex: T): T[]
    neighborsOf(
        hex: T,
        directions?: CompassDirection[] | number[] | CompassDirection | number | 'all',
        diagonal?: boolean
    ): T[]
    set(keyOrPoint: number | PointCoordinates, newHex?: T): this
}

export enum PointyCompassDirection { E, SE, SW, W, NW, NE }
export enum FlatCompassDirection { SE, S, SW, NW, N, NE }
export type CompassDirection = PointyCompassDirection | FlatCompassDirection

declare function extendHex<T = {}>(prototype?: T): HexFactory<T>

export interface HexFactory<T> {
    (xOrProps?: HexCoordinates | T, y?: number, customProps?: T): ExtendedHex<T>
    thirdCoordinate(firstCoordinate: number, secondCoordinate: number): number
}

export type HexCoordinates = PointCoordinates | CubeCoordinates

export type ExtendedHex<T> = {
    [P in keyof T]: T[P]
} & Hex<T>

export interface Hex<T> extends PointLike {
    __isHoneycombHex: boolean
    orientation: 'pointy' | 'flat'
    origin: number
    size: number
    offset: number
    q: number
    r: number
    s: number
    add(point: PointCoordinates): ExtendedHex<T>
    cartesian(): PointLike
    cartesianToCube(pointOrX?: PointCoordinates, y?: number): CubeCoordinates
    center(): Point
    coordinates(): PointLike
    corners(): Point[]
    cube(): CubeCoordinates
    cubeToCartesian(cubeCoordinates: { q: number, r: number, s?: number }): PointLike
    distance(hex: CubeCoordinates): number
    equals(point: PointCoordinates): boolean
    fromPoint(pointOrX?: PointCoordinates, y?: number): ExtendedHex<T>
    height(): number
    isFlat(): boolean
    isPointy(): boolean
    lerp(hex: { q: number, r: number, s?: number }, t: number): ExtendedHex<T>
    nudge(): ExtendedHex<T>
    oppositeCornerDistance(): number
    oppositeSideDistance(): number
    round(): ExtendedHex<T>
    set(): ExtendedHex<T>
    subtract(point: PointCoordinates): ExtendedHex<T>
    toCartesian(cubeCoordinates: { q: number, r: number, s?: number }): PointLike
    toCube(pointOrX?: PointCoordinates, y?: number): CubeCoordinates
    toPoint(): Point
    toString(): string
    width(): number
}

export interface CubeCoordinates {
    q: number
    r: number
    s: number
}

declare function PointFactory(pointOrX?: PointCoordinates, y?: number): Point

export interface Point extends PointLike {
    add(pointOrX?: PointCoordinates, y?: number): Point
    subtract(pointOrX?: PointCoordinates, y?: number): Point
    multiply(pointOrX?: PointCoordinates, y?: number): Point
    divide(pointOrX?: PointCoordinates, y?: number): Point
}

export interface PointLike {
    x: number
    y: number
}

export type PointCoordinates = number | [number, number] | Partial<PointLike>

type Partial<T> = {
    [P in keyof T]?: T[P]
}

export {
    defineGrid,
    extendHex,
    PointFactory as Point
}
