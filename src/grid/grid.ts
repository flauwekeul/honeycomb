import { createHex, Hex, HexCoordinates } from '../hex'
import { rectangle, RectangleOptions } from './traversers'
import { Callback, GetHexState, Traverser } from './types'

export class Grid<T extends Hex> {
  static of<T extends Hex>(hexPrototype: T, store?: Map<string, T>, getPrevHexState?: GetHexState<T>) {
    return new Grid<T>(hexPrototype, store, getPrevHexState)
  }

  get [Symbol.toStringTag]() {
    return 'Grid'
  }

  store?: Map<string, T>

  constructor(
    public hexPrototype: T,
    // fixme: it makes no sense to create a grid without it having hexes (in the form of a traverser or store)
    store?: Map<string, T>,
    private getPrevHexState: GetHexState<T> = () => ({ hexes: [], cursor: null }),
  ) {
    this.store = store && new Map(store)
  }

  *[Symbol.iterator]() {
    for (const hex of this.getPrevHexState(this).hexes) {
      yield hex
    }
  }

  clone(getPrevHexState = this.getPrevHexState) {
    return new Grid(this.hexPrototype, this.store, getPrevHexState)
  }

  getHex(coordinates?: HexCoordinates) {
    const hex = createHex(this.hexPrototype).clone(coordinates) // clone to enable users to make custom hexes
    return this.store?.get(hex.toString()) ?? hex
  }

  each(callback: Callback<T, void>) {
    const each: GetHexState<T> = (currentGrid) => {
      const prevHexState = this.getPrevHexState(currentGrid)
      for (const hex of prevHexState.hexes) {
        callback(hex, currentGrid)
      }
      return prevHexState
    }
    return this.clone(each)
  }

  filter(predicate: Callback<T, boolean>) {
    const filter: GetHexState<T> = (currentGrid) => {
      const nextHexes: T[] = []
      const prevHexState = this.getPrevHexState(currentGrid)
      let cursor = prevHexState.cursor

      for (const hex of prevHexState.hexes) {
        if (predicate(hex, currentGrid)) {
          cursor = hex
          nextHexes.push(cursor)
        }
      }

      return { hexes: nextHexes, cursor }
    }

    return this.clone(filter)
  }

  takeWhile(predicate: Callback<T, boolean>) {
    const takeWhile: GetHexState<T> = (currentGrid) => {
      const nextHexes: T[] = []
      const prevHexState = this.getPrevHexState(currentGrid)
      let cursor = prevHexState.cursor

      for (const hex of prevHexState.hexes) {
        if (!predicate(hex, currentGrid)) {
          return { hexes: nextHexes, cursor }
        }
        cursor = hex
        nextHexes.push(cursor)
      }

      return { hexes: nextHexes, cursor }
    }

    return this.clone(takeWhile)
  }

  run(until?: Callback<T, void>) {
    for (const hex of this.getPrevHexState(this).hexes) {
      until && until(hex, this)
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

    const traverse: GetHexState<T> = (currentGrid) => {
      const nextHexes: T[] = []
      let cursor = this.getPrevHexState(currentGrid).cursor ?? this.getHex()

      for (const traverser of traversers) {
        for (const nextCursor of traverser(cursor, this.getHex.bind(this))) {
          cursor = nextCursor
          nextHexes.push(cursor)
        }
      }

      return { hexes: nextHexes, cursor }
    }

    return this.clone(traverse)
  }
}
