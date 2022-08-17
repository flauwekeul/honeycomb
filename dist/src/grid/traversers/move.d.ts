import { Hex } from '../../hex';
import { Direction, Traverser } from '../types';
/**
 * @category Traverser
 */
export declare const move: <T extends Hex>(direction: Direction) => Traverser<T, T[]>;
