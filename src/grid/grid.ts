import { CompassDirection } from '../compass'
import { defineHex, Hex, HexConstructor, HexCoordinates, Point, pointToCube } from '../hex'
import { isFunction } from '../utils'
import { distance, neighborOf } from './functions'
import { concat } from './traversers'
import { GridAsJSON, Traverser } from './types'

export class Grid<T extends Hex> implements Iterable<T> {
  static fromIterable<T extends Hex>(hexes: Iterable<T>): Grid<T> {
    const firstHex = hexes[Symbol.iterator]().next().value as T | undefined

    if (!firstHex) {
      throw new Error(`Can't create grid from empty iterable: ${JSON.stringify(hexes)}`)
    }

    return new Grid(firstHex.constructor as HexConstructor<T>, hexes)
  }

  static fromJSON({ hexSettings, coordinates }: GridAsJSON) {
    const HexClass = defineHex(hexSettings)
    return new Grid(
      HexClass,
      coordinates.map((_coordinates) => new HexClass(_coordinates)),
    )
  }

  get [Symbol.toStringTag]() {
    return `Grid(${this.size})`
  }

  get hexPrototype() {
    return this.#hexClass.prototype as T
  }

  get size() {
    return this.#hexes.size
  }

  get pixelWidth() {
    if (this.size === 0) return 0

    const { isPointy, width } = this.hexPrototype
    const hexes = this.toArray()
    // sort hexes from left to right and take the first and last
    const {
      0: mostLeft,
      length,
      [length - 1]: mostRight,
    } = isPointy ? hexes.sort((a, b) => b.s - a.s || a.q - b.q) : hexes.sort((a, b) => a.q - b.q)

    return mostRight.x - mostLeft.x + width
  }

  get pixelHeight() {
    if (this.size === 0) return 0

    const { isPointy, height } = this.hexPrototype
    const hexes = this.toArray()
    // sort hexes from left to right and take the first and last
    const {
      0: mostTop,
      length,
      [length - 1]: mostBottom,
    } = isPointy ? hexes.sort((a, b) => a.r - b.r) : hexes.sort((a, b) => b.s - a.s || a.r - b.r)

    return mostBottom.y - mostTop.y + height
  }

  [Symbol.iterator]() {
    return this.#hexes.values()
  }

  readonly #hexClass: HexConstructor<T>

  #hexes = new Map<string, T>()

  constructor(hexClass: HexConstructor<T>)
  constructor(hexClass: HexConstructor<T>, traversers: Traverser<T> | Traverser<T>[])
  constructor(hexClass: HexConstructor<T>, hexes: Iterable<T>)
  constructor(grid: Grid<T>)
  constructor(hexClassOrGrid: HexConstructor<T> | Grid<T>, input: Traverser<T> | Traverser<T>[] | Iterable<T> = []) {
    if (hexClassOrGrid instanceof Grid<T>) {
      this.#hexClass = hexClassOrGrid.#hexClass
      this.setHexes(hexClassOrGrid)
      return
    }

    this.#hexClass = hexClassOrGrid
    this.setHexes(this.#createHexesFromIterableOrTraversers(input))
  }

  createHex(coordinates?: HexCoordinates): T {
    return new this.#hexClass(coordinates)
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
    const result = new Grid(this.#hexClass)

    for (const hex of this) {
      if (predicate(hex)) result.#setHex(hex)
    }

    return result
  }

  map(fn: (hex: T) => T): Grid<T> {
    const result = new Grid(this.#hexClass)

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
    const result = new Grid(this.#hexClass)

    for (const hex of this.#createHexesFromIterableOrTraversers(input)) {
      const foundHex = this.getHex(hex)
      if (foundHex) {
        result.#setHex(foundHex)
      } else if (bail) {
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

  // todo: add to docs that hexSettings don't include any custom properties
  toJSON(): GridAsJSON {
    // these four properties are getters that may be present further up the prototype chain
    // JSON.stringify() ignores properties in the prototype chain
    const { dimensions, orientation, origin, offset } = this.hexPrototype
    return { hexSettings: { dimensions, orientation, origin, offset }, coordinates: this.toArray() }
  }

  toString(): string {
    return `Grid(${this.size})`
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
