import { createHex, Hex, HexCoordinates } from '../hex'
import { rectangle, RectangleOptions } from './traversers'
import { GetOrCreateHexFn, GetPrevHexState, GridStore, Traverser } from './types'

export class Grid<T extends Hex, S extends GridStore<T>> {
  static of<T extends Hex, S extends GridStore<T>>(
    hexPrototype: T,
    store?: S,
    getPrevHexState?: GetPrevHexState<T, S>,
  ) {
    return new Grid<T, S>(hexPrototype, store, getPrevHexState)
  }

  getOrCreateHex: GetOrCreateHexFn<T> = (coordinates) => {
    const hex = createHex(this.hexPrototype).clone(coordinates) // clone to enable users to make custom hexes
    return this.store?.get(hex.toString()) ?? hex
  }

  constructor(
    public hexPrototype: T,
    public store?: S,
    private getPrevHexState: GetPrevHexState<T, S> = () => ({ hexes: [], cursor: null }),
  ) {}

  *[Symbol.iterator]() {
    for (const hex of this.getPrevHexState().hexes) {
      yield hex
    }
  }

  // it doesn't take a hexPrototype and store because it doesn't need to copy those
  clone(getPrevHexState = this.getPrevHexState) {
    // bind(this) in case the getPrevHexState is a "regular" (generator) function
    return Grid.of(this.hexPrototype, this.store, getPrevHexState.bind(this))
  }

  each(callback: (hex: T, grid: this) => void) {
    const each = () => {
      const prevHexState = this.getPrevHexState()
      for (const hex of prevHexState.hexes) {
        callback(hex, this)
      }
      return prevHexState
    }

    return this.clone(each)
  }

  map(callback: (hex: T, grid: this) => T) {
    const map = () => {
      const { hexes, cursor } = this.getPrevHexState()
      const nextHexes: T[] = []
      for (const hex of hexes) {
        nextHexes.push(callback(hex, this))
      }
      return { hexes: nextHexes, cursor }
    }

    return this.clone(map)
  }

  // todo: alias to take or takeUntil?
  run(stopFn: (hex: T) => boolean = () => false) {
    for (const hex of this.getPrevHexState().hexes) {
      if (stopFn(hex)) {
        return this
      }
    }
    return this
  }

  // todo: maybe remove this method? What's wrong with just calling grid.traverse(rectangle({ ... }))?
  // todo: add in docs: only 90° corners for cardinal directions
  rectangle(options: RectangleOptions): Grid<T, S>
  rectangle(cornerA: HexCoordinates, cornerB: HexCoordinates): Grid<T, S>
  rectangle(optionsOrCornerA: RectangleOptions | HexCoordinates, cornerB?: HexCoordinates) {
    return this.traverse(rectangle(optionsOrCornerA as HexCoordinates, cornerB as HexCoordinates))
  }

  traverse(...traversers: Traverser<T>[]) {
    if (traversers.length === 0) {
      return this
    }

    const traverse: GetPrevHexState<T, S> = () => {
      const nextHexes: T[] = []
      let cursor = this.getPrevHexState().cursor ?? createHex(this.hexPrototype).clone() // clone to enable users to make custom hexes

      for (const traverser of traversers) {
        for (const nextCursor of traverser(cursor, this.getOrCreateHex)) {
          cursor = nextCursor
          nextHexes.push(cursor)
        }
      }

      return { hexes: nextHexes, cursor }
    }

    return this.clone(traverse)
  }
}
