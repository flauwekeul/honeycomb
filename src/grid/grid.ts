import { createHex, Hex, HexCoordinates } from '../hex'
import { Callback, Traverser } from './types'

export class Grid<T extends Hex> {
  static of<T extends Hex>(hexPrototype: T, traverser?: Traverser<T> | null, store?: Map<string, T>) {
    return new Grid<T>(hexPrototype, traverser, store)
  }

  get [Symbol.toStringTag]() {
    return 'Grid'
  }

  store?: Map<string, T>

  private _getPrevHexState: GetHexState<T> = () => ({ hexes: [], cursor: null })

  constructor(public hexPrototype: T, traverser?: Traverser<T> | null, store?: Map<string, T>) {
    if (traverser) {
      this._getPrevHexState = () => {
        const hexes = Array.from(traverser(this.getHex(), this.getHex.bind(this)))
        return { hexes, cursor: hexes[hexes.length - 1] }
      }
    }
    this.store = store && new Map(store)
  }

  *[Symbol.iterator]() {
    for (const hex of this._getPrevHexState(this).hexes) {
      yield hex
    }
  }

  getHex(coordinates?: HexCoordinates) {
    const hex = createHex(this.hexPrototype).clone(coordinates) // clone to enable users to make custom hexes
    return this.store?.get(hex.toString()) ?? hex
  }

  each(callback: Callback<T, void>) {
    const each: GetHexState<T> = (currentGrid) => {
      const prevHexState = this._getPrevHexState(currentGrid)
      for (const hex of prevHexState.hexes) {
        callback(hex, currentGrid)
      }
      return prevHexState
    }
    return this._clone(each)
  }

  filter(predicate: Callback<T, boolean>) {
    const filter: GetHexState<T> = (currentGrid) => {
      const nextHexes: T[] = []
      const prevHexState = this._getPrevHexState(currentGrid)
      let cursor = prevHexState.cursor

      for (const hex of prevHexState.hexes) {
        if (predicate(hex, currentGrid)) {
          cursor = hex
          nextHexes.push(cursor)
        }
      }

      return { hexes: nextHexes, cursor }
    }

    return this._clone(filter)
  }

  takeWhile(predicate: Callback<T, boolean>) {
    const takeWhile: GetHexState<T> = (currentGrid) => {
      const nextHexes: T[] = []
      const prevHexState = this._getPrevHexState(currentGrid)
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

    return this._clone(takeWhile)
  }

  traverse(...traversers: Traverser<T>[]) {
    if (traversers.length === 0) {
      return this
    }

    const traverse: GetHexState<T> = (currentGrid) => {
      const nextHexes: T[] = []
      let cursor = this._getPrevHexState(currentGrid).cursor ?? this.getHex()

      for (const traverser of traversers) {
        for (const nextCursor of traverser(cursor, this.getHex.bind(this))) {
          cursor = nextCursor
          nextHexes.push(cursor)
        }
      }

      return { hexes: nextHexes, cursor }
    }

    return this._clone(traverse)
  }

  run(until?: Callback<T, void>) {
    for (const hex of this._getPrevHexState(this).hexes) {
      until && until(hex, this)
    }
    return this
  }

  private _clone(getHexState: GetHexState<T>) {
    const newGrid = new Grid(this.hexPrototype, null, this.store)
    newGrid._getPrevHexState = getHexState
    return newGrid
  }
}

interface GetHexState<T extends Hex> {
  (grid: Grid<T>): HexState<T>
}

interface HexState<T extends Hex> {
  hexes: T[]
  cursor: T | null
}
