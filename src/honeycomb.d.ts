declare function defineGrid<T = HexFactory<T>>(Hex?: HexFactory<T>): GridFactory<T>

export interface GridFactory<T> {
    (arrayOrHex?: Array<Hex<T>> | Hex<T>, ...hexes: Array<Hex<T>>): Grid<T>
    isValidHex(value: any): boolean
    pointToHex(point: PointCoordinates): ExtendedHex<T>
    parallelogram(options: {
        width: number,
        height: number,
        start?: HexCoordinates<T>,
        direction?: 1 | 3 | 5,
        onCreate?: onCreateCallback<T>
    }): Grid<T>
    triangle(options: {
        size: number,
        start?: HexCoordinates<T>,
        direction?: 1 | 5,
        onCreate?: onCreateCallback<T>
    }): Grid<T>
    hexagon(options: {
        radius: number,
        center?: HexCoordinates<T>,
        onCreate?: onCreateCallback<T>
    }): Grid<T>
    rectangle(options: {
        width: number,
        height: number,
        start?: HexCoordinates<T>,
        direction?: CompassDirection | number,
        onCreate?: onCreateCallback<T>
    }): Grid<T>
}

export type onCreateCallback<T> = (hex: ExtendedHex<T>, grid: Grid<T>) => void

export class Grid<T> extends Array {
    // defined in class:
    fill(): never
    includes(point: PointCoordinates, fromIndex?: number): boolean
    indexOf(point: PointCoordinates, fromIndex?: number): number
    lastIndexOf(point: PointCoordinates, fromIndex?: number): number
    push(...hexes: Array<Hex<T>>): number
    splice(start: number, deleteCount?: number): Grid<T>
    splice(start: number, deleteCount: number, ...hexes: Array<Hex<T>>): Grid<T>
    unshift(...hexes: Array<Hex<T>>): number

    // defined in prototype:
    get(keyOrPoint: number | PointCoordinates): ExtendedHex<T>
    hexesBetween(firstHex: Hex<T>, lastHex: Hex<T>): Array<ExtendedHex<T>>
    neighborsOf(
        hex: Hex<T>,
        directions?: CompassDirection[] | number[] | CompassDirection | number | 'all',
        diagonal?: boolean
    ): Array<ExtendedHex<T>>
    set(keyOrPoint: number | PointCoordinates, newHex?: Hex<T>): Grid<T>
}

export enum PointyCompassDirection { E, SE, SW, W, NW, NE }
export enum FlatCompassDirection { SE, S, SW, NW, N, NE }
export type CompassDirection = PointyCompassDirection | FlatCompassDirection

declare function extendHex<T = {}>(prototype?: T): HexFactory<T>

export interface HexFactory<T> {
    (xOrProps?: PointCoordinates & T, y?: number, customProps?: T): ExtendedHex<T>
    (xOrProps?: CubeCoordinates & T, y?: number, customProps?: T): ExtendedHex<T>
    thirdCoordinate(firstCoordinate: number, secondCoordinate: number): number
}

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
    add(point?: PointCoordinates): ExtendedHex<T>
    cartesian(): PointLike
    cartesianToCube(cartesianCoordinates: PointLike): CubeCoordinates
    center(): Point
    coordinates(): PointLike
    corners(): Point[]
    cube(): CubeCoordinates
    cubeToCartesian(cubeCoordinates: { q: number, r: number, s?: number }): PointLike
    distance(hex: CubeCoordinates): number
    equals(point: PointLike): boolean
    height(): number
    isFlat(): boolean
    isPointy(): boolean
    lerp(hex: { q: number, r: number, s?: number }, t: number): ExtendedHex<T>
    nudge(): ExtendedHex<T>
    oppositeCornerDistance(): number
    oppositeSideDistance(): number
    round(): ExtendedHex<T>
    set(): ExtendedHex<T>
    subtract(point?: PointCoordinates): ExtendedHex<T>
    toCartesian(cubeCoordinates: { q: number, r: number, s?: number }): PointLike
    toCube(cartesianCoordinates: PointLike): CubeCoordinates
    toPoint(): Point
    toString(): string
    width(): number
}

// not very acurate, but good enough for now
// problem: { x: 0, q: 0 } is valid...
export type HexCoordinates<T> = (PointCoordinates | CubeCoordinates) & T

export interface CubeCoordinates {
    q: number
    r: number
    s: number
}

declare function PointFactory(pointOrX?: PointCoordinates, y?: number): Point

export interface Point extends PointLike {
    add(point: Point): Point
    subtract(point: Point): Point
    multiply(point: Point): Point
    divide(point: Point): Point
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
