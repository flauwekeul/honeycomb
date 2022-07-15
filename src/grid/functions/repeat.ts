import { Hex } from '../../hex'
import { Traverser } from '../types'
import { concat } from './concat'

export function repeat<T extends Hex>(
  times: number,
  traversers: Traverser<T> | Traverser<T>[],
  { max = 100 } = {},
): Traverser<T, Iterable<T>> {
  // todo: generalize this in all traversers that can potentially loop infinitely
  //       (although in this traverser it doesn't make much sense as `times` is already set explicitly)
  if (times > max) {
    console.warn(`Traverser created that outputs more hexes (${times}) than configured. Limiting iteration to ${max}.`)
  }

  const _times = Math.min(times, max)
  const repeatedTraversers = Array.from({ length: _times }, () => concat(traversers))
  return concat(repeatedTraversers)
}
