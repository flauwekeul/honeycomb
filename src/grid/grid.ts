import { createHex, Hex, HexCoordinates, Point, pointToCube } from '../hex'
import { isFunction } from '../utils'
import { concat, distance } from './functions'
import { Traverser } from './types'

export class Grid<T extends Hex> implements Iterable<T> {
  static fromIterable<T extends Hex>(hexes: Iterable<T>): Grid<T> {
    const firstHex = hexes[Symbol.iterator]().next().value as T | undefined

    if (!firstHex) {
      throw new Error(`Can't create grid from empty iterable: ${JSON.stringify(hexes)}`)
    }

    return new Grid(Object.getPrototypeOf(firstHex) as T, hexes)
  }

  readonly [Symbol.toStringTag] = 'Grid'

  get size() {
    return this.#hexes.size
  }

  [Symbol.iterator]() {
    return this.#hexes.values()
  }

  readonly hexPrototype: T

  #hexes = new Map<string, T>()

  constructor(hexPrototype: T)
  constructor(hexPrototype: T, traversers: Traverser<T> | Traverser<T>[])
  constructor(hexPrototype: T, hexes: Iterable<T>)
  constructor(grid: Grid<T>)
  constructor(hexPrototypeOrGrid: T | Grid<T>, input: Traverser<T> | Traverser<T>[] | Iterable<T> = []) {
    if (hexPrototypeOrGrid instanceof Grid<T>) {
      this.hexPrototype = hexPrototypeOrGrid.hexPrototype
      this.setHexes(hexPrototypeOrGrid)
      return
    }

    this.hexPrototype = hexPrototypeOrGrid
    this.setHexes(this.#createHexesFromIterableOrTraversers(input))
  }

  createHex(coordinates?: HexCoordinates): T {
    return createHex<T>(this.hexPrototype, coordinates)
  }

  getHex(coordinates: HexCoordinates): T | undefined {
    const hex = this.createHex(coordinates)
    return this.#hexes.get(hex.toString())
  }

  hasHex(hex: T): boolean {
    return this.#hexes.has(hex.toString())
  }

  setHexes(hexes: Iterable<T>): this {
    for (const hex of hexes) {
      this.#hexes.set(hex.toString(), hex)
    }
    return this
  }

  reduce(reducer: (previousHex: T, currentHex: T) => T): T
  reduce(reducer: (previousHex: T, currentHex: T) => T, initialValue: T): T
  reduce<R>(reducer: (result: R, hex: T) => R, initialValue: R): R
  reduce<R>(reducer: (result: T | R, hex: T) => T | R, initialValue?: T | R): T | R {
    if (initialValue === undefined) {
      let result!: T, previousHex!: T, currentHex!: T
      for (const hex of this) {
        previousHex = currentHex
        currentHex = hex
        if (!previousHex) continue
        result = reducer(previousHex, currentHex) as T
      }
      return result
    }

    let result = initialValue
    for (const hex of this) {
      result = reducer(result, hex)
    }
    return result
  }

  toArray(): T[] {
    return Array.from(this)
  }

  // todo: implement like so:
  // toMap<K = string>(createKey?: (hex: T) => K): Map<K, T> {
  //   return new Map(this.#hexes)
  // }
  toMap(): Map<string, T> {
    return new Map(this.#hexes)
  }

  toObject(): Record<string, T> {
    const obj: Record<string, T> = {}
    for (const hex of this) {
      obj[hex.toString()] = hex
    }
    return obj
  }

  traverse(traversers: Traverser<T> | Traverser<T>[], bailOption?: { bail?: boolean }): T[]
  traverse(hexes: Iterable<T>, bailOption?: { bail?: boolean }): T[]
  traverse(grid: Grid<T>, bailOption?: { bail?: boolean }): T[]
  traverse(input: Traverser<T> | Traverser<T>[] | Iterable<T> | Grid<T>, bailOption?: { bail?: boolean }): T[]
  traverse(input: Traverser<T> | Traverser<T>[] | Iterable<T> | Grid<T>, { bail = false } = {}): T[] {
    const result: T[] = []
    const hexes = input instanceof Grid ? this : this.#createHexesFromIterableOrTraversers(input)

    for (const hex of hexes) {
      const hexInGrid = this.getHex(hex)
      if (hexInGrid) {
        result.push(hexInGrid)
      } else if (bail) {
        return result
      }
    }

    return result
  }

  clone(): Grid<T> {
    return new Grid(this)
  }

  update(transform: (hexes: T[]) => T[]): this
  update(transform: (hexes: T[]) => T[], traversers: Traverser<T> | Traverser<T>[]): this
  update(transform: (hexes: T[]) => T[], hexes: Iterable<T>): this
  update(transform: (hexes: T[]) => T[], grid: Grid<T>): this
  update(transform: (hexes: T[]) => T[], input: Traverser<T> | Traverser<T>[] | Iterable<T> | Grid<T> = this): this {
    const hexes = input instanceof Grid ? input.toArray() : this.traverse(input)
    return this.setHexes(transform(hexes))
  }

  pointToHex(point: Point): T | undefined {
    return this.getHex(pointToCube(point, this.hexPrototype))
  }

  distance(from: HexCoordinates, to: HexCoordinates): number {
    return distance(this.hexPrototype, from, to)
  }

  #createHexesFromIterableOrTraversers(input: Traverser<T> | Traverser<T>[] | Iterable<T>): Iterable<T> {
    return this.#isTraverser(input)
      ? this.#callTraverser(input)
      : Array.isArray(input) && this.#isTraverser(input[0])
      ? this.#callTraverser(concat(input))
      : (input as Iterable<T>)
  }

  #isTraverser(value: unknown): value is Traverser<T> {
    return isFunction<Traverser<T>>(value)
  }

  #callTraverser(traverser: Traverser<T>): Iterable<T> {
    return traverser(this.createHex.bind(this))
  }
}
