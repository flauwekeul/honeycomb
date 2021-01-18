import { createHex, CubeCoordinates, equals, Hex, HexCoordinates } from '../hex'
import { offsetFromZero } from '../utils'
import { RECTANGLE_DIRECTIONS } from './constants'
import { Compass, RectangleOptions, Traverser } from './types'

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
    direction = this.hexPrototype.isPointy ? Compass.E : Compass.SE,
  }: RectangleOptions) {
    const _start: CubeCoordinates = { q: start.q, r: start.r, s: -start.q - start.r }
    const [firstCoordinate, secondCoordinate, thirdCoordinate] = RECTANGLE_DIRECTIONS[direction]
    const [firstStop, secondStop] = this.hexPrototype.isPointy ? [width, height] : [height, width]
    const relativeOffset = (coordinate: number) => offsetFromZero(this.hexPrototype.offset, coordinate)
    const traverser: Traverser<T> = (cursor) => {
      const result: HexCoordinates[] = []
      let _cursor = cursor
      for (let second = 0; second < secondStop; second++) {
        const secondOffset = relativeOffset(second)
        for (let first = -secondOffset; first < firstStop - secondOffset; first++) {
          const nextCursor: unknown = {
            [firstCoordinate]: first + _start[firstCoordinate],
            [secondCoordinate]: second + _start[secondCoordinate],
            [thirdCoordinate]: -first - second + _start[thirdCoordinate],
          }
          _cursor = nextCursor as CubeCoordinates
          result.push(_cursor)
        }
      }
      return result
    }
    return this.traverse(traverser)
  }

  // fixme: when topLeft > bottomRight
  // todo: is it okay to never pass a direction? Probably, but maybe add option to determine if row or col is traversed first
  // todo: have a single rectangle method that either takes {width, height} or {topLeft, bottomRight}?
  rectangleFromOpposingCorners(topLeft: HexCoordinates, bottomRight: HexCoordinates) {
    const { isPointy, offset } = this.hexPrototype
    const relativeOffset = (coordinate: number) => offsetFromZero(offset, coordinate)

    if (isPointy) {
      const topLeftCol = topLeft.q + relativeOffset(topLeft.r)
      const bottomRightCol = bottomRight.q + relativeOffset(bottomRight.r)
      const height = Math.abs(topLeft.r - bottomRight.r) + 1
      const width = Math.abs(topLeftCol - bottomRightCol) + (height % 2)
      return this.rectangle({ width, height, start: topLeft })
    }

    const topLeftRow = topLeft.r + relativeOffset(topLeft.q)
    const bottomRightRow = bottomRight.r + relativeOffset(bottomRight.q)
    const height = Math.abs(topLeftRow - bottomRightRow) + 1
    const width = Math.abs(topLeft.q - bottomRight.q) + (height % 2)
    return this.rectangle({ width, height, start: topLeft })
  }

  traverse(...traversers: Traverser<T>[]) {
    if (traversers.length === 0) {
      return this // or clone()? bottomRightdo: when to return clone and when not?
    }

    const traverse: InternalTraverser<T> = () => {
      const result: T[] = []
      const hasTraversedBefore = this.traverser !== infiniteTraverser
      const previousHexes = [...this.traverser()]
      let cursor: HexCoordinates = previousHexes[previousHexes.length - 1] || { q: 0, r: 0 }

      for (const traverser of traversers) {
        for (const nextCursor of traverser(cursor, this.hexPrototype)) {
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
