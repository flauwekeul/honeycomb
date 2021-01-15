import { createHex, CubeCoordinates, equals, Hex, HexCoordinates } from '../hex'
import { offsetFromZero } from '../utils'
import { RECTANGLE_DIRECTIONS } from './constants'
import { at, move, repeat } from './functions'
import { FlatCompassDirection, PointyCompassDirection, RectangleOptions, Traverser } from './types'

interface InternalTraverser<T extends Hex> {
  (this: Grid<T>): Iterable<T>
}

const infiniteTraverser = <T extends Hex>(): Iterable<T> => []

export class Grid<T extends Hex> {
  static of<T extends Hex>(hexPrototype: T, traverser?: InternalTraverser<T>) {
    return new Grid(hexPrototype, traverser)
  }

  constructor(public hexPrototype: T, private traverser: InternalTraverser<T> = infiniteTraverser) {}

  [Symbol.iterator]() {
    return this.traverser()
  }

  clone(traverser = this.traverser) {
    // bind(this) in case the traverser is a "regular" (generator) function
    return Grid.of(this.hexPrototype, traverser.bind(this))
  }

  // todo: use generic functions for these kinds of operations
  // something like https://github.com/benji6/imlazy or https://github.com/lodash/lodash/wiki/FP-Guide
  each(fn: (hex: T) => void) {
    const each: InternalTraverser<T> = () => {
      for (const hex of this.traverser()) {
        fn(hex)
      }
      return this.traverser()
    }
    return this.clone(each)
  }

  map(fn: (hex: T) => T) {
    const map: InternalTraverser<T> = () => {
      const result: T[] = []
      for (const hex of this.traverser()) {
        result.push(fn(hex))
      }
      return result
    }
    return this.clone(map)
  }

  // todo: alias to take or takeUntil?
  run(stopFn: (hex: T) => boolean = () => false) {
    for (const hex of this.traverser()) {
      if (stopFn(hex)) {
        return this
      }
    }
    return this // or clone()? todo: when to return clone and when not?
  }

  rectangle({
    width,
    height,
    start = { q: 0, r: 0 },
    direction = this.hexPrototype.isPointy ? PointyCompassDirection.E : FlatCompassDirection.S,
  }: RectangleOptions) {
    const _start: CubeCoordinates = { q: start.q, r: start.r, s: -start.q - start.r }
    const [firstCoordinate, secondCoordinate, thirdCoordinate] = RECTANGLE_DIRECTIONS[direction]
    const [firstStop, secondStop] = this.hexPrototype.isPointy ? [width, height] : [height, width]

    // todo: duplication in traverse()
    const rectangle: InternalTraverser<T> = () => {
      const result: T[] = []
      const hasTraversedBefore = this.traverser !== infiniteTraverser
      const previousHexes = [...this.traverser()]
      let cursor: CubeCoordinates = previousHexes[previousHexes.length - 1] || { q: 0, r: 0 }

      for (let second = 0; second < secondStop; second++) {
        const secondOffset = offsetFromZero(this.hexPrototype.offset, second)

        for (let first = -secondOffset; first < firstStop - secondOffset; first++) {
          const nextCursor: unknown = {
            [firstCoordinate]: first + _start[firstCoordinate],
            [secondCoordinate]: second + _start[secondCoordinate],
            [thirdCoordinate]: -first - second + _start[thirdCoordinate],
          }
          cursor = nextCursor as CubeCoordinates
          if (hasTraversedBefore && !previousHexes.some((prevCoords) => equals(prevCoords, cursor))) {
            return result // todo: or continue? or make this configurable?
          }
          result.push(createHex(this.hexPrototype, cursor))
        }
      }

      return result
    }
    return this.clone(rectangle)
  }

  traverse(...traversers: Traverser[]) {
    if (traversers.length === 0) {
      return this // or clone()? bottomRightdo: when to return clone and when not?
    }

    const traverse: InternalTraverser<T> = () => {
      const result: T[] = []
      const hasTraversedBefore = this.traverser !== infiniteTraverser
      const previousHexes = [...this.traverser()]
      let cursor: HexCoordinates = previousHexes[previousHexes.length - 1] || { q: 0, r: 0 }

      for (const traverser of traversers) {
        for (const nextCursor of traverser(cursor)) {
          cursor = nextCursor
          if (hasTraversedBefore && !previousHexes.some((prevCoords) => equals(prevCoords, cursor))) {
            return result // todo: or continue? or make this configurable?
          }
          result.push(createHex(this.hexPrototype, cursor))
        }
      }

      return result
    }

    return this.clone(traverse)
  }
}
