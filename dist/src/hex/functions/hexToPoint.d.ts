import { Hex } from '../hex';
import { Point } from '../types';
/**
 * @category Hex
 */
export declare const hexToPoint: ({ orientation, dimensions: { xRadius, yRadius }, origin: { x, y }, q, r }: Hex) => Point;
