import { createHex, Hex, HexCoordinates, Point, pointToCube } from '../hex'
import { flatTraverse } from './functions'
import { Callback, Traverser } from './types'

export class Grid<T extends Hex> {
  static from<T extends Hex>(iterable: Map<string, T> | Iterable<T>) {
    let firstHex: T
    let store: Map<string, T>

    if (iterable instanceof Map) {
      firstHex = iterable.values()[Symbol.iterator]().next().value
      store = iterable
    } else {
      const array = Array.from(iterable)
      firstHex = array[0]
      store = new Map(array.map((hex) => [hex.toString(), hex]))
    }

    if (!firstHex) {
      throw new Error(`Can't create grid from empty iterable: ${iterable}`)
    }

    return new Grid<T>(Object.getPrototypeOf(firstHex), store)
  }

  get [Symbol.toStringTag]() {
    return 'Grid'
  }

  store = new Map<string, T>()
  getHex = (coordinates?: HexCoordinates) => {
    const hex = createHex(this.hexPrototype).clone(coordinates) // clone to enable users to make custom hexes
    return this.store.get(hex.toString()) ?? hex
  }

  private _getPrevHexState: GetHexState<T> = () => ({ hexes: [], cursor: null })

  constructor(hexPrototype: T, traversers?: Traverser<T> | Traverser<T>[])
  constructor(hexPrototype: T, store?: Map<string, T>)
  constructor(public hexPrototype: T, traversersOrStore?: Traverser<T> | Traverser<T>[] | Map<string, T>) {
    if (traversersOrStore instanceof Map) {
      this._getPrevHexState = () => {
        const hexes = Array.from(traversersOrStore.values())
        return { hexes, cursor: hexes[hexes.length - 1] }
      }
      this.store = new Map(traversersOrStore)
    } else if (traversersOrStore) {
      const hexes = flatTraverse(traversersOrStore)(this.getHex(), this.getHex)
      this._getPrevHexState = () => ({ hexes, cursor: hexes[hexes.length - 1] })
      this.store = new Map(hexes.map((hex) => [hex.toString(), hex]))
    }
  }

  *[Symbol.iterator]() {
    for (const hex of this._getPrevHexState(this).hexes) {
      yield hex
    }
  }

  pointToHex(point: Point): T {
    return this.getHex(pointToCube(point, this.hexPrototype))
  }

  each(callback: Callback<T, void>) {
    const each: GetHexState<T> = (currentGrid) => {
      const prevHexState = this._getPrevHexState(currentGrid)
      prevHexState.hexes.forEach((hex) => callback(hex, currentGrid))
      return prevHexState
    }

    return this._clone(each)
  }

  map(callback: Callback<T, T | void>) {
    const map: GetHexState<T> = (currentGrid) => {
      const prevHexState = this._getPrevHexState(currentGrid)
      let cursor = prevHexState.cursor
      const hexes = prevHexState.hexes.map((hex) => {
        cursor = hex.clone()
        return callback(cursor, currentGrid) || cursor
      })

      return { hexes, cursor: hexes[hexes.length - 1] }
    }

    return this._clone(map)
  }

  filter(predicate: Callback<T, boolean>) {
    const filter: GetHexState<T> = (currentGrid) => {
      const prevHexState = this._getPrevHexState(currentGrid)
      const hexes = prevHexState.hexes.filter((hex) => predicate(hex, currentGrid))

      return { hexes, cursor: hexes[hexes.length - 1] }
    }

    return this._clone(filter)
  }

  takeWhile(predicate: Callback<T, boolean>) {
    const takeWhile: GetHexState<T> = (currentGrid) => {
      const hexes: T[] = []
      const prevHexState = this._getPrevHexState(currentGrid)
      let cursor = prevHexState.cursor

      for (const hex of prevHexState.hexes) {
        if (!predicate(hex, currentGrid)) {
          return { hexes, cursor }
        }
        cursor = hex
        hexes.push(cursor)
      }

      return { hexes, cursor }
    }

    return this._clone(takeWhile)
  }

  traverse(traversers: Traverser<T>[] | Traverser<T>) {
    const traverse: GetHexState<T> = (currentGrid) => {
      const cursor = this._getPrevHexState(currentGrid).cursor ?? this.getHex()
      const hexes = flatTraverse(traversers)(cursor, this.getHex)
      return { hexes, cursor: hexes[hexes.length - 1] }
    }

    return this._clone(traverse)
  }

  run(callback?: Callback<T, void>) {
    for (const hex of this._getPrevHexState(this).hexes) {
      callback && callback(hex, this)
    }
    return this
  }

  private _clone(getHexState: GetHexState<T>) {
    const newGrid = new Grid(this.hexPrototype, this.store)
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
