import { CompassDirection } from '../../compass'
import { Hex } from '../../hex'
import { neighborOf } from '../functions'
import { Traverser } from '../types'

export const move =
  <T extends Hex>(direction: CompassDirection): Traverser<T> =>
  (createHex, cursor) =>
    [neighborOf(createHex(cursor), direction)]
