import { createHex, CubeCoordinates, Hex, isPointy } from '../../hex'
import { offsetFromZero, signedModulo } from '../../utils'
import { FlatCompassDirection, PointyCompassDirection } from '../types'

export type RectangleDirection = PointyCompassDirection.E | FlatCompassDirection.S

export interface RectangleOptions {
  width: number
  height: number
  start?: CubeCoordinates
  direction?: RectangleDirection
}

const DIRECTIONS = [
  ['q', 'r', 's'],
  ['r', 'q', 's'],
  ['r', 's', 'q'],
  ['s', 'r', 'q'],
  ['s', 'q', 'r'],
  ['q', 's', 'r'],
] as [keyof CubeCoordinates, keyof CubeCoordinates, keyof CubeCoordinates][]

export function* rectangle<T extends Hex>(
  hexPrototype: T,
  {
    width,
    height,
    start = { q: 0, r: 0, s: 0 },
    direction = isPointy(hexPrototype) ? PointyCompassDirection.E : FlatCompassDirection.S,
  }: RectangleOptions,
) {
  if (direction < 0 || direction > 5) {
    direction = signedModulo(direction, 6)
  }

  const [firstCoordinate, secondCoordinate, thirdCoordinate] = DIRECTIONS[direction]
  const [firstStop, secondStop] = isPointy(hexPrototype) ? [width, height] : [height, width]

  for (let second = 0; second < secondStop; second++) {
    const secondOffset = offsetFromZero(hexPrototype.offset, second)

    for (let first = -secondOffset; first < firstStop - secondOffset; first++) {
      const nextCoordinates = {
        [firstCoordinate]: first + start[firstCoordinate],
        [secondCoordinate]: second + start[secondCoordinate],
        [thirdCoordinate]: -first - second + start[thirdCoordinate],
      } as unknown
      yield createHex(hexPrototype, nextCoordinates as CubeCoordinates)
    }
  }
}
