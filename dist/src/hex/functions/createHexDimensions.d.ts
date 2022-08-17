import { BoundingBox, Ellipse, Orientation } from '../types';
/**
 * @category Hex
 */
export declare function createHexDimensions(radius: number): Ellipse;
export declare function createHexDimensions(boundingBox: BoundingBox, orientation: Orientation): Ellipse;
export declare function createHexDimensions(ellipse: Ellipse): Ellipse;
