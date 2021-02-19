import { CompassDirection } from '../compass'
import { createHex, Hex, HexCoordinates, toString } from '../hex'
import { neighborOf } from './functions'
import { rectangle, RectangleOptions } from './traversers'
import { GetOrCreateHexFn, HexMap, Traverser } from './types'
import { forEach, map } from './utils'

// todo: add from() static method that only accepts hexes and creates a grid by picking the prototype and traverser (traverser is just: `() => hexes`)
export class Grid<T extends Hex> {
  static of<T extends Hex>(hexPrototype: T, hexes?: HexMap<T>, traverser?: InternalTraverser<T>) {
    return new Grid(hexPrototype, hexes, traverser)
  }

  constructor(
    public hexPrototype: T,
    public hexes: HexMap<T> = new Map(),
    private traverser: InternalTraverser<T> = infiniteTraverser,
  ) {}

  *[Symbol.iterator]() {
    for (const hex of this.traverser()) {
      yield hex
    }
  }

  // it doesn't take a hexPrototype and hexes because it doesn't need to copy those
  clone(traverser = this.traverser) {
    // bind(this) in case the traverser is a "regular" (generator) function
    return Grid.of(this.hexPrototype, this.hexes, traverser.bind(this))
  }

  each(fn: (hex: T) => void) {
    return this.clone(() => forEach(fn)(this.traverser()))
  }

  // todo: use this.hexes
  map(fn: (hex: T) => T) {
    return this.clone(() => map(fn)(this.traverser()))
  }

  // todo: alias to take or takeUntil?
  run(stopFn: (hex: T) => boolean = () => false) {
    for (const hex of this.traverser()) {
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

    const nextTraverse: InternalTraverser<T> = () => {
      const result: T[] = []
      const hasTraversedBefore = this.traverser !== infiniteTraverser
      // run any previous traversal to set this.hexes
      this.traverser()
      // todo: private method/property?
      const getOrCreateHex: GetOrCreateHexFn<T> = (coordinates) =>
        this.hexes.get(toString(coordinates)) ?? createHex(this.hexPrototype).clone(coordinates) // clone to enable users to make custom hexes
      // todo: don't start at last hex and/or make it configurable?
      // todo: the last cursor of the previous traversal should be used (difficult, should probably be hold in an object and cloned as well,
      // or maybe returned together with result)
      let cursor: T = Array.from(this.hexes.values()).pop() || createHex(this.hexPrototype).clone() // clone to enable users to make custom hexes

      for (const traverser of traversers) {
        for (const nextCursor of traverser(cursor, getOrCreateHex)) {
          cursor = nextCursor
          // return early when traversing outside previously made grid
          if (hasTraversedBefore && !this.hexes.has(toString(cursor))) {
            return result // todo: or continue? or make this configurable?
          }
          // todo: cursor.toString() can't be used, because in getOrCreateHex() only hex coordinates are available
          this.hexes.set(toString(cursor), cursor)
          result.push(cursor)
        }
      }

      return result
    }

    return this.clone(nextTraverse)
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
