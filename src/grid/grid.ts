import { createHex, Hex, HexCoordinates } from '../hex'
import { NoopMap } from './noopMap'
import { rectangle, RectangleOptions } from './traversers'
import { eachCallbackFn, GetOrCreateHexFn, GetPrevHexState, GridStore, mapCallbackFn, Traverser } from './types'

export class Grid<T extends Hex> {
  static of<T extends Hex>(hexPrototype: T, store?: GridStore<T>, getPrevHexState?: GetPrevHexState<T>) {
    return new Grid<T>(hexPrototype, store, getPrevHexState)
  }

  getOrCreateHex: GetOrCreateHexFn<T> = (coordinates) => {
    const hex = createHex(this.hexPrototype).clone(coordinates) // clone to enable users to make custom hexes
    return this.store.get(hex.toString()) ?? hex
  }

  constructor(
    public hexPrototype: T,
    public store: GridStore<T> = new NoopMap(),
    private getPrevHexState: GetPrevHexState<T> = () => ({ hexes: [], cursor: null }),
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

  each(callback: eachCallbackFn<T>) {
    const each = () => {
      const prevHexState = this.getPrevHexState()
      for (const hex of prevHexState.hexes) {
        callback(hex, this)
      }
      return prevHexState
    }

    return this.clone(each)
  }

  map(callback: mapCallbackFn<T>) {
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
  rectangle(options: RectangleOptions): Grid<T>
  rectangle(cornerA: HexCoordinates, cornerB: HexCoordinates): Grid<T>
  rectangle(optionsOrCornerA: RectangleOptions | HexCoordinates, cornerB?: HexCoordinates) {
    return this.traverse(rectangle(optionsOrCornerA as HexCoordinates, cornerB as HexCoordinates))
  }

  traverse(...traversers: Traverser<T>[]) {
    if (traversers.length === 0) {
      return this
    }

    const traverse: GetPrevHexState<T> = () => {
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
