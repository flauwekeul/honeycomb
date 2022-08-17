import { Hex } from '../hex';
import { OffsetCoordinates } from '../types';
/**
 * @category Hex
 */
export declare const hexToOffset: ({ q, r, offset, isPointy }: Pick<Hex, 'q' | 'r' | 'offset' | 'isPointy'>) => OffsetCoordinates;
