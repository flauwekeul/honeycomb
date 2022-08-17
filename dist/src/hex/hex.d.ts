import { BoundingBox, CubeCoordinates, Ellipse, HexCoordinates, HexOffset, HexSettings, OffsetCoordinates, Orientation, PartialCubeCoordinates, Point } from './types';
export declare class Hex implements Readonly<CubeCoordinates>, Readonly<OffsetCoordinates>, Readonly<Point>, Readonly<BoundingBox> {
    get center(): Point;
    get col(): number;
    get corners(): Point[];
    get dimensions(): Ellipse;
    get height(): number;
    get isFlat(): boolean;
    get isPointy(): boolean;
    get orientation(): Orientation;
    get origin(): Point;
    get offset(): HexOffset;
    get row(): number;
    get width(): number;
    get x(): number;
    get y(): number;
    get s(): number;
    readonly q: number;
    readonly r: number;
    constructor(coordinates?: HexCoordinates);
    clone<T extends Hex>(newProps?: HexCoordinates): T;
    equals(coordinates: HexCoordinates): boolean;
    toString(): string;
    translate(delta: PartialCubeCoordinates): this;
}
/**
 * @category Hex
 */
export declare const defaultHexSettings: HexSettings;
