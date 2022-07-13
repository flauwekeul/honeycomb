import { Hex } from '../../hex'
import { HexGenerator, Traverser } from '../types'

export function repeat<T extends Hex>(
  times: number,
  traverser: Traverser<T>,
  { max = 100 } = {},
): Traverser<T, HexGenerator<T>> {
  // todo: generalize this in all traversers that can potentially loop infinitely
  if (times > max) {
    console.warn(`Traverser created that outputs more hexes (${times}) than configured. Limiting iteration to ${max}.`)
  }

  const _times = Math.min(times, max)

  return function* repeatTraverser(createHex, cursor) {
    let _cursor = cursor
    for (let i = 0; i < _times; i++) {
      for (const hex of traverser(createHex, _cursor)) {
        yield (_cursor = hex)
      }
    }
  }
}
