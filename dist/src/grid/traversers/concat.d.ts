import { Hex } from '../../hex';
import { Traverser } from '../types';
/**
 * @category Traverser
 */
export declare function concat<T extends Hex>(traversers: Traverser<T> | Traverser<T>[]): Traverser<T>;
