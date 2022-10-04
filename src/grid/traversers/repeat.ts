import { Hex } from '../../hex'
import { Traverser } from '../types'
import { concat } from './concat'

/**
 * @category Traverser
 */
export function repeat<T extends Hex>(times: number, traversers: Traverser<T> | Traverser<T>[]): Traverser<T> {
  return concat(Array.from({ length: times }, () => concat(traversers)))
}
