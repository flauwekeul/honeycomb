import { Hex } from '../../hex';
import { Traverser } from '../types';
/**
 * @category Traverser
 */
export declare function repeatWith<T extends Hex>(sources: Traverser<T> | Traverser<T>[], targets: Traverser<T> | Traverser<T>[], { includeSource }?: {
    includeSource?: boolean | undefined;
}): Traverser<T>;
