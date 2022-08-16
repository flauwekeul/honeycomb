import { Hex } from '../../hex'
import { neighborOf } from '../functions'
import { Direction, Traverser } from '../types'

/**
 * @category Traverser
 */
export const move =
  <T extends Hex>(direction: Direction): Traverser<T> =>
  (createHex, cursor) =>
    [neighborOf(createHex(cursor), direction)]
