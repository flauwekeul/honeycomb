import { Hex } from '../../hex';
import { Traverser } from '../types';
/**
 * @category Traverser
 */
export declare function repeat<T extends Hex>(times: number, traversers: Traverser<T> | Traverser<T>[]): Traverser<T>;
