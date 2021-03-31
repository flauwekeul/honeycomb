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

  private _getPrevHexes: GetHexesFn<T> = () => []

  constructor(hexPrototype: T, traversers?: Traverser<T> | Traverser<T>[])
  constructor(hexPrototype: T, store?: Map<string, T>)
  constructor(public hexPrototype: T, traversersOrStore?: Traverser<T> | Traverser<T>[] | Map<string, T>) {
    if (traversersOrStore instanceof Map) {
      this._getPrevHexes = () => Array.from(traversersOrStore.values())
      this.store = new Map(traversersOrStore)
    } else if (traversersOrStore) {
      const hexes = flatTraverse(traversersOrStore)(this.getHex(), this.getHex)
      this._getPrevHexes = () => hexes
      this.store = new Map(hexes.map((hex) => [hex.toString(), hex]))
    }
  }

  pointToHex(point: Point): T {
    return this.getHex(pointToCube(point, this.hexPrototype))
  }

  each(callback: Callback<T, void>) {
    const each: GetHexesFn<T> = (currentGrid) => {
      const hexes = this._getPrevHexes(currentGrid)
      hexes.forEach((hex) => callback(hex, currentGrid))
      return hexes
    }

    return this._clone(each)
  }

  map(callback: Callback<T, T | void>) {
    const map: GetHexesFn<T> = (currentGrid) =>
      this._getPrevHexes(currentGrid).map((hex) => {
        const cursor = hex.clone()
        return callback(cursor, currentGrid) || cursor
      })

    return this._clone(map)
  }

  filter(predicate: Callback<T, boolean>) {
    const filter: GetHexesFn<T> = (currentGrid) =>
      this._getPrevHexes(currentGrid).filter((hex) => predicate(hex, currentGrid))

    return this._clone(filter)
  }

  takeWhile(predicate: Callback<T, boolean>) {
    const takeWhile: GetHexesFn<T> = (currentGrid) => {
      const hexes: T[] = []
      for (const hex of this._getPrevHexes(currentGrid)) {
        if (!predicate(hex, currentGrid)) {
          return hexes
        }
        hexes.push(hex)
      }
      return hexes
    }

    return this._clone(takeWhile)
  }

  traverse(traversers: Traverser<T>[] | Traverser<T>) {
    const traverse: GetHexesFn<T> = (currentGrid) => {
      // run any previous iterators
      this._getPrevHexes(currentGrid)
      return flatTraverse(traversers)(this.getHex(), this.getHex)
    }

    return this._clone(traverse)
  }

  hexes() {
    return this._getPrevHexes(this)
  }

  run(callback?: Callback<T, void>) {
    this.hexes().forEach((hex) => callback && callback(hex, this))
    return this._clone(() => [])
  }

  private _clone(getHexState: GetHexesFn<T>) {
    const newGrid = new Grid(this.hexPrototype, this.store)
    newGrid._getPrevHexes = getHexState
    return newGrid
  }
}

interface GetHexesFn<T extends Hex> {
  (grid: Grid<T>): T[]
}
