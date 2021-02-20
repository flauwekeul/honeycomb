import { createHex, Hex, HexCoordinates, toString } from '../hex'
import { NoopMap } from './noopMap'
import { rectangle, RectangleOptions } from './traversers'
import { eachCallbackFn, GetOrCreateHexFn, GetPrevHexesFn, mapCallbackFn, Traverser } from './types'

export class Grid<T extends Hex> {
  static of<T extends Hex>(hexPrototype: T, store?: Map<string, T>, getPrevHexes?: GetPrevHexesFn<T>) {
    return new Grid<T>(hexPrototype, store, getPrevHexes)
  }

  getOrCreateHex: GetOrCreateHexFn<T> = (coordinates) =>
    this.store.get(toString(coordinates)) ?? createHex(this.hexPrototype).clone(coordinates) // clone to enable users to make custom hexes

  constructor(
    public hexPrototype: T,
    public store: Map<string, T> = new NoopMap(),
    private getPrevHexes: GetPrevHexesFn<T> = () => [],
  ) {}

  *[Symbol.iterator]() {
    for (const hex of this.getPrevHexes()) {
      yield hex
    }
  }

  // it doesn't take a hexPrototype and store because it doesn't need to copy those
  clone(getPrevHexes = this.getPrevHexes) {
    // bind(this) in case the getPrevHexes is a "regular" (generator) function
    return Grid.of(this.hexPrototype, this.store, getPrevHexes.bind(this))
  }

  each(callback: eachCallbackFn<T>) {
    const each = () => {
      const prevHexes = this.getPrevHexes()
      for (const hex of prevHexes) {
        callback(hex, this)
      }
      return prevHexes
    }

    return this.clone(each)
  }

  map(callback: mapCallbackFn<T>) {
    const map = () => {
      const nextHexes: T[] = []
      for (const hex of this.getPrevHexes()) {
        nextHexes.push(callback(hex, this))
      }
      return nextHexes
    }

    return this.clone(map)
  }

  // todo: alias to take or takeUntil?
  run(stopFn: (hex: T) => boolean = () => false) {
    for (const hex of this.getPrevHexes()) {
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

    const traverse: GetPrevHexesFn<T> = () => {
      const nextHexes: T[] = []
      let cursor = Array.from(this.getPrevHexes()).pop() || createHex(this.hexPrototype).clone() // clone to enable users to make custom hexes

      for (const traverser of traversers) {
        for (const nextCursor of traverser(cursor, this.getOrCreateHex)) {
          cursor = nextCursor
          nextHexes.push(cursor)
        }
      }

      return nextHexes
    }

    return this.clone(traverse)
  }
}
