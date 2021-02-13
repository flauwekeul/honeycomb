import { CompassDirection } from '../compass'
import { createHex, equals, Hex, HexCoordinates } from '../hex'
import { HexCache } from '../hexCache'
import { neighborOf } from './functions'
import { rectangle } from './traversers'
import { RectangleOptions, Traverser } from './types'
import { forEach, map } from './utils'

// todo: add from() static method that only accepts hexes and creates a grid by picking the prototype and traverser (traverser is just: `() => hexes`)
export class Grid<T extends Hex> {
  static of<T extends Hex>(hexPrototype: T, hexes?: HexCache<T>, traverser?: InternalTraverser<T>) {
    return new Grid(hexPrototype, hexes, traverser)
  }

  constructor(
    public hexPrototype: T,
    public hexes = new HexCache<T>(),
    private traverser: InternalTraverser<T> = infiniteTraverser,
  ) {}

  *[Symbol.iterator]() {
    for (const hex of this.traverser()) {
      yield hex
    }
  }

  // it doesn't take a hexPrototype and hexes because it doesn't need to copy those
  copy(traverser = this.traverser) {
    // bind(this) in case the traverser is a "regular" (generator) function
    return Grid.of(this.hexPrototype, this.hexes, traverser.bind(this))
  }

  each(fn: (hex: T) => void) {
    return this.copy(() => forEach(fn)(this.traverser()))
  }

  // todo: use this.hexes
  map(fn: (hex: T) => T) {
    return this.copy(() => map(fn)(this.traverser()))
  }

  // todo: alias to take or takeUntil?
  run(stopFn: (hex: T) => boolean = () => false) {
    // when traverser() is called once, `this.hexes` will be empty and it needs to be set here,
    // when traverser() is called more than once, `this.hexes` will already be set and must not be overridden by the last traversal,
    // for the first traversal sets how many hexes the grid contains.
    const hexes = [...this.traverser()]
    this.hexes.items = this.hexes.size > 0 ? this.hexes.items : hexes
    for (const hex of this.hexes.items) {
      if (stopFn(hex)) {
        return this
      }
    }
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
      let previousHexes: T[] = []

      if (this.hexes.size > 0) {
        // use cached hexes
        previousHexes = this.hexes.items
      } else {
        previousHexes = [...this.traverser()]
        if (previousHexes.length > 0) {
          // cache hexes
          this.hexes.items = previousHexes
        }
      }

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
  // todo: use this.hexes
  neighborOf(hex: T, direction: CompassDirection) {
    return neighborOf(hex, direction)
  }
}

interface InternalTraverser<T extends Hex> {
  (this: Grid<T>): Iterable<T>
}

const infiniteTraverser = <T extends Hex>(): Iterable<T> => []
