import { toArray, Transducer, Transformer } from 'transducist'
import { createHex, Hex, HexCoordinates, Point, pointToCube } from '../hex'
import { isFunction } from '../utils'
import { INIT, RESULT, STEP } from './constants'
import { concat, distance } from './functions'
import { transduce } from './transduce'
import { inGrid } from './transducers'
import { Traverser } from './types'

export class Grid<T extends Hex> implements Iterable<T> {
  static fromIterable<T extends Hex>(hexes: Iterable<T>): Grid<T> {
    const firstHex: T = hexes[Symbol.iterator]().next().value

    if (!firstHex) {
      throw new Error(`Can't create grid from empty iterable: ${hexes}`)
    }

    return new Grid(Object.getPrototypeOf(firstHex), hexes)
  }

  get [Symbol.toStringTag]() {
    return 'Grid'
  }

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
    this.setHexes(this.#getHexesFromIterableOrTraversers(input))
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

  traverse(traversers: Traverser<T> | Traverser<T>[], transducers: Transducer<T, T> | Transducer<T, T>[] = []): T[] {
    return transduce(
      // todo: somehow make sure this uses a generator (for performance)
      this.#callTraverser(concat(traversers)),
      // automatically limit to hexes in grid
      [inGrid(this)].concat(transducers),
      toArray(),
    )
  }

  clone(): Grid<T> {
    return new Grid(this)
  }

  update(transducers: Transducer<T, T> | Transducer<T, T>[]): this
  update(transducers: Transducer<T, T> | Transducer<T, T>[], hexes: Iterable<T>): this
  update(transducers: Transducer<T, T> | Transducer<T, T>[], traversers: Traverser<T> | Traverser<T>[]): this
  update(
    transducers: Transducer<T, T> | Transducer<T, T>[],
    hexesOrTraversers: Grid<T> | Iterable<T> | Traverser<T> | Traverser<T>[] = this,
  ): this {
    if (hexesOrTraversers === this) {
      transduce(hexesOrTraversers as Grid<T>, transducers, this.#toGridReducer)
      return this
    }

    transduce(
      // todo: wrapping this in a generator/iterator might improve performance
      this.#getHexesFromIterableOrTraversers(hexesOrTraversers),
      // automatically limit to hexes in grid (unless hexes is already those in the grid)
      [inGrid(this)].concat(transducers),
      this.#toGridReducer,
    )

    return this
  }

  pointToHex(point: Point): T | undefined {
    return this.getHex(pointToCube(point, this.hexPrototype))
  }

  distance(from: HexCoordinates, to: HexCoordinates): number {
    return distance(this.hexPrototype, from, to)
  }

  #getHexesFromIterableOrTraversers(input: Iterable<T> | Traverser<T> | Traverser<T>[]): Iterable<T> {
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

  readonly #toGridReducer: Transformer<this, T> = {
    [INIT]: () => this,
    [RESULT]: () => this,
    [STEP]: (_, hex) => {
      this.#hexes.set(hex.toString(), hex)
      return this
    },
  }
}
