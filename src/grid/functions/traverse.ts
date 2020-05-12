import { createHex, CubeCoordinates, Hex, HexPrototype } from '../../hex'
import { CompassDirection } from '../types'

// todo: dedupe with RectangleOptions
export interface TraverseOptions {
  start?: CubeCoordinates
  stop?: (hex: Hex) => boolean
  direction?: CompassDirection
}

export function* traverse(
  hexPrototype: HexPrototype,
  { start = { q: 0, r: 0, s: 0 }, stop = () => false, direction = CompassDirection.E }: TraverseOptions,
) {
  const firstHex = createHex(hexPrototype, start)

  if (stop(firstHex)) {
    return
  }

  // todo: implement:
  const nextHex = {} as Hex

  while (!stop(nextHex)) {
    yield
  }
}
