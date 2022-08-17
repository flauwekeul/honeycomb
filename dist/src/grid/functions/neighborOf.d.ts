import { Hex } from '../../hex';
import { Direction } from '../types';
export declare const neighborOf: <T extends Hex>(hex: T, direction: Direction) => T;
