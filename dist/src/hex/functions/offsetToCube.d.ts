import { Hex } from '../hex';
import { CubeCoordinates, HexOffset, OffsetCoordinates } from '../types';
/**
 * @hidden
 */
export declare const offsetToCubePointy: (col: number, row: number, offset: HexOffset) => CubeCoordinates;
/**
 * @hidden
 */
export declare const offsetToCubeFlat: (col: number, row: number, offset: HexOffset) => CubeCoordinates;
/**
 * @category Hex
 */
export declare const offsetToCube: ({ offset, isPointy }: Pick<Hex, 'offset' | 'isPointy'>, { col, row }: OffsetCoordinates) => CubeCoordinates;
