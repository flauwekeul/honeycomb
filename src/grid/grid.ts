import { CompassDirection } from '../compass'
import { createHex, equals, Hex, HexCoordinates } from '../hex'
import { neighborOf } from './functions'
import { rectangle } from './traversers'
import { RectangleOptions, Traverser } from './types'
import { forEach, map } from './utils'

// todo: add from() static method that only accepts hexes and creates a grid by picking the prototype and traverser (traverser is just: `() => hexes`)
export class Grid<T extends Hex> {
  static of<T extends Hex>(hexPrototype: T, traverser?: InternalTraverser<T>) {
    return new Grid(hexPrototype, traverser)
  }

  constructor(public hexPrototype: T, private traverser: InternalTraverser<T> = infiniteTraverser) {}

  *[Symbol.iterator]() {
    for (const hex of this.traverser()) {
      yield hex
    }
  }

  // it doesn't take a hexPrototype and hexes because it doesn't need to copy those
  copy(traverser = this.traverser) {
    // bind(this) in case the traverser is a "regular" (generator) function
    return Grid.of(this.hexPrototype, traverser.bind(this))
  }

  each(fn: (hex: T) => void) {
    return this.copy(() => forEach(fn)(this.traverser()))
  }

  map(fn: (hex: T) => T) {
    return this.copy(() => map(fn)(this.traverser()))
  }

  // todo: alias to take or takeUntil?
  run(stopFn: (hex: T) => boolean = () => false) {
    forEach<T>((hex) => {
      if (stopFn(hex)) {
        return this
      }
    })(this.traverser())
    return this
  }

  // todo: maybe remove this method? What's wrong with just calling grid.traverse(rectangle({ ... }))?
  // todo: add in docs: only 90° corners for cardinal directions
  rectangle(options: RectangleOptions): Grid<T>
  rectangle(cornerA: HexCoordinates, cornerB: HexCoordinates): Grid<T>
  rectangle(optionsOrCornerA: RectangleOptions | HexCoordinates, cornerB?: HexCoordinates) {
    return this.traverse(rectangle(optionsOrCornerA as HexCoordinates, cornerB as HexCoordinates))
  }

  traverse(...traversers: Traverser<T>[]) {
    if (traversers.length === 0) {
      return this
    }

    const traverse: InternalTraverser<T> = () => {
      const result: T[] = []
      const hasTraversedBefore = this.traverser !== infiniteTraverser
      const previousHexes = [...this.traverser()]
      let cursor: T = previousHexes[previousHexes.length - 1] || createHex(this.hexPrototype).copy() // copy to enable users to make custom hexes

      for (const traverser of traversers) {
        for (const nextCursor of traverser(cursor)) {
          cursor = nextCursor
          if (hasTraversedBefore && !previousHexes.some((prevCoords) => equals(prevCoords, cursor))) {
            return result // todo: or continue? or make this configurable?
          }
          result.push(cursor)
        }
      }

      return result
    }

    return this.copy(traverse)
  }

  // todo: maybe remove this method?
  neighborOf(hex: T, direction: CompassDirection) {
    return neighborOf(hex, direction)
  }
}

interface InternalTraverser<T extends Hex> {
  (this: Grid<T>): Iterable<T>
}

const infiniteTraverser = <T extends Hex>(): Iterable<T> => []
