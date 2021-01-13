import { createHex, CubeCoordinates, Hex, isPointy } from '../../hex'
import { offsetFromZero, signedModulo } from '../../utils'
import { RECTANGLE_DIRECTIONS } from '../constants'
import { FlatCompassDirection, PointyCompassDirection, RectangleOptions } from '../types'

export const rectangle = <T extends Hex>(
  hexPrototype: T,
  {
    width,
    height,
    start = { q: 0, r: 0 },
    direction = isPointy(hexPrototype) ? PointyCompassDirection.E : FlatCompassDirection.S,
  }: RectangleOptions,
) => {
  const result: T[] = []
  const _start: CubeCoordinates = { q: start.q, r: start.r, s: -start.q - start.r }
  // const hasTraversedBefore = this.traverser !== infiniteTraverser
  // const previousHexes = [...this.traverser()]
  // let coordinates: CubeCoordinates = previousHexes[previousHexes.length - 1] || { q: 0, r: 0 }

  if (direction < 0 || direction > 5) {
    direction = signedModulo(direction, 6)
  }

  const [firstCoordinate, secondCoordinate, thirdCoordinate] = RECTANGLE_DIRECTIONS[direction]
  const [firstStop, secondStop] = isPointy(hexPrototype) ? [width, height] : [height, width]

  for (let second = 0; second < secondStop; second++) {
    const secondOffset = offsetFromZero(hexPrototype.offset, second)

    for (let first = -secondOffset; first < firstStop - secondOffset; first++) {
      const nextCoordinates = {
        [firstCoordinate]: first + _start[firstCoordinate],
        [secondCoordinate]: second + _start[secondCoordinate],
        [thirdCoordinate]: -first - second + _start[thirdCoordinate],
      } as unknown
      // coordinates = nextCoordinates as CubeCoordinates
      // if (hasTraversedBefore && !previousHexes.some((prevCoords) => equals(prevCoords, coordinates))) {
      //   return result // todo: or continue? or make this configurable?
      // }
      result.push(createHex(hexPrototype, nextCoordinates as CubeCoordinates))
    }
  }

  return result
}
