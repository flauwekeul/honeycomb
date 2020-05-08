import { Coordinates, CubeCoordinates } from '../../coordinates'
import { from, HexPrototype, hexToCube, isPointy } from '../../hex'
import { offsetFromZero } from '../../utils'
import { FlatCompassDirection, PointyCompassDirection } from '../types'

export type RectangleDirection = PointyCompassDirection.E | FlatCompassDirection.S

export interface RectangleOptions {
  width: number
  height: number
  start?: Coordinates
  direction?: RectangleDirection
}

const DIRECTIONS = [
  ['q', 'r', 's'],
  ['r', 'q', 's'],
  ['r', 's', 'q'],
  ['s', 'r', 'q'],
  ['s', 'q', 'r'],
  ['q', 's', 'r'],
]

export function* rectangle(
  hexPrototype: HexPrototype,
  {
    width,
    height,
    start = { q: 0, r: 0, s: 0 },
    direction = isPointy(hexPrototype) ? PointyCompassDirection.E : FlatCompassDirection.S,
  }: RectangleOptions,
) {
  const cubeCoordinates = hexToCube(from(hexPrototype, start))

  // todo:
  // if (direction < 0 || direction > 5) {
  //   direction = signedModulo(direction, 6)
  // }

  const [firstCoordinate, secondCoordinate, thirdCoordinate] = DIRECTIONS[direction]
  const [firstStop, secondStop] = isPointy(hexPrototype) ? [width, height] : [height, width]

  for (let second = 0; second < secondStop; second++) {
    const secondOffset = offsetFromZero(hexPrototype.offset, second)

    for (let first = -secondOffset; first < firstStop - secondOffset; first++) {
      const nextCubeCoordinates = {
        [firstCoordinate]: first + cubeCoordinates[firstCoordinate as keyof CubeCoordinates],
        [secondCoordinate]: second + cubeCoordinates[secondCoordinate as keyof CubeCoordinates],
        [thirdCoordinate]: -first - second + cubeCoordinates[thirdCoordinate as keyof CubeCoordinates],
      } as unknown
      yield from(hexPrototype, nextCubeCoordinates as CubeCoordinates)
    }
  }
}
