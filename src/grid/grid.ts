import { CompassDirection } from '../compass'
import { createHex, Hex, HexCoordinates, Point, pointToCube } from '../hex'
import { isFunction } from '../utils'
import { concat, distance, neighborOf } from './functions'
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
      this.#setHex(hex)
    }
    return this
  }

  filter(predicate: (hex: T) => boolean): Grid<T> {
    const result = new Grid(this.hexPrototype)

    for (const hex of this) {
      if (predicate(hex)) result.#setHex(hex)
    }

    return result
  }

  map(fn: (hex: T) => T): Grid<T> {
    const result = new Grid(this.hexPrototype)

    for (const hex of this) {
      result.#setHex(fn(hex))
    }

    return result
  }

  traverse(traversers: Traverser<T> | Traverser<T>[], options?: { bail?: boolean }): Grid<T>
  traverse(hexes: Iterable<T>, options?: { bail?: boolean }): Grid<T>
  traverse(grid: Grid<T>, options?: { bail?: boolean }): Grid<T>
  traverse(input: Traverser<T> | Traverser<T>[] | Iterable<T> | Grid<T>, options?: { bail?: boolean }): Grid<T>
  traverse(input: Traverser<T> | Traverser<T>[] | Iterable<T> | Grid<T>, { bail = false } = {}): Grid<T> {
    const result = new Grid(this.hexPrototype)

    for (const hex of this.#createHexesFromIterableOrTraversers(input)) {
      const foundHex = this.getHex(hex)
      if (foundHex) {
        result.#setHex(foundHex)
      } else if (!bail) {
        return result
      }
    }

    return result
  }

  forEach(fn: (hex: T) => void): this {
    for (const hex of this) {
      fn(hex)
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

  pointToHex(point: Point, options?: { allowOutside: true }): T
  pointToHex(point: Point, options: { allowOutside: false }): T | null
  pointToHex(point: Point, { allowOutside = true } = {}): T | null {
    const coordinates = pointToCube(this.hexPrototype, point)

    if (allowOutside) return this.createHex(coordinates)

    const hex = this.getHex(coordinates)
    if (!hex) {
      return null
    }

    return hex
  }

  distance(from: HexCoordinates, to: HexCoordinates, options?: { allowOutside: true }): number
  distance(from: HexCoordinates, to: HexCoordinates, options: { allowOutside: false }): number | null
  distance(from: HexCoordinates, to: HexCoordinates, { allowOutside = true } = {}): number | null {
    if (allowOutside) return distance(this.hexPrototype, from, to)

    const fromHex = this.getHex(from)
    const toHex = this.getHex(to)
    if (!fromHex || !toHex) {
      return null
    }

    return distance(this.hexPrototype, fromHex, toHex)
  }

  neighborOf(hex: T, direction: CompassDirection, options?: { allowOutside: true }): T
  neighborOf(hex: T, direction: CompassDirection, options: { allowOutside: false }): T | null
  neighborOf(hex: T, direction: CompassDirection, { allowOutside = true } = {}): T | null {
    if (allowOutside) return neighborOf(hex, direction)

    const foundHex = this.getHex(hex)
    const neighbor = neighborOf(hex, direction)
    if (!foundHex || !neighbor) {
      return null
    }

    return neighborOf(hex, direction)
  }

  #setHex(hex: T): void {
    this.#hexes.set(hex.toString(), hex)
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
