import { Hex } from '../hex';
import { Point } from '../types';
/**
 * @category Hex
 */
export declare const pointToCube: ({ dimensions: { xRadius, yRadius }, origin, isPointy }: Pick<Hex, 'dimensions' | 'origin' | 'isPointy'>, { x, y }: Point) => import("../types").CubeCoordinates;
