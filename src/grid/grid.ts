import { transduce, Transducer } from 'transducist'
import { createHex, Hex, HexCoordinates, Point, pointToCube } from '../hex'
import { isFunction } from '../utils'
import { concat, distance } from './functions'
import { HexGenerator, Traverser } from './types'

export class Grid<T extends Hex> implements Iterable<T> {
  // todo: extend to also accept traversers
  // static fromIterable<T extends Hex>(iterable: Iterable<T>): Grid<T> {
  //   const hexes = new Map<string, T>()
  //   let hex: T | undefined
  //   for (hex of iterable) {
  //     hexes.set(hex.toString(), hex)
  //   }
  //   if (!hex) {
  //     throw new Error(`Can't create grid from empty iterable: ${iterable}`)
  //   }
  //   return new Grid<T>(Object.getPrototypeOf(hex), hexes)
  // }

  get [Symbol.toStringTag]() {
    return 'Grid'
  }

  [Symbol.iterator]() {
    return this.#hexes.values()
  }

  createHex = (coordinates?: HexCoordinates): T => createHex<T>(this.hexPrototype, coordinates)

  #hexes = new Map<string, T>()

  constructor(hexPrototype: T, traversers: Traverser<T> | Traverser<T>[])
  constructor(hexPrototype: T, hexes: Map<string, T>)
  constructor(hexPrototype: T, hexes: Iterable<T>)
  constructor(public hexPrototype: T, input: Traverser<T> | Traverser<T>[] | Map<string, T> | Iterable<T>) {
    if (input instanceof Map) {
      this.#hexes = new Map(input)
    } else if (isFunction<Traverser<T>>(input)) {
      this.#setHexes(input(this.createHex))
    } else if (Array.isArray(input) && isFunction<Traverser<T>>(input[0])) {
      this.#setHexes(concat(...input)(this.createHex))
    } else {
      this.#setHexes(input as Iterable<T>)
    }
    // todo: throw error when all if's fail?
  }

  getHex(coordinates: HexCoordinates): T | undefined {
    const hex = this.createHex(coordinates)
    return this.#hexes.get(hex.toString())
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
    return [...this]
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

  *traverse(...traversers: Traverser<T>[]): HexGenerator<T> {
    // todo: add to docs that this function starts at the first hex in grid.#hexes
    // todo: not sure about this though
    const [cursor] = this.#hexes.values()
    yield cursor
    for (const hex of concat(...traversers)(this.createHex, cursor)) {
      const existingHex = this.getHex(hex)
      if (existingHex) yield existingHex
    }
  }

  clone(): Grid<T> {
    const clonedHexes = new Map<string, T>()
    for (const hex of this) {
      clonedHexes.set(hex.toString(), hex.clone())
    }
    return new Grid(this.hexPrototype, clonedHexes)
  }

  update(transformer: Transducer<T, T>, iterable: Iterable<T> = this): this {
    transduce(iterable, transformer, {
      // todo: move strings to constants.ts
      ['@@transducer/init']: () => this.#hexes,
      ['@@transducer/result']: (grid) => grid,
      ['@@transducer/step']: (_, hex) => {
        this.#hexes.set(hex.toString(), hex)
        return this.#hexes
      },
    })
    return this
  }

  pointToHex(point: Point): T | undefined {
    return this.getHex(pointToCube(point, this.hexPrototype))
  }

  distance(from: HexCoordinates, to: HexCoordinates): number {
    return distance(this.hexPrototype, from, to)
  }

  #setHexes(iterable: Iterable<T>) {
    for (const hex of iterable) {
      this.#hexes.set(hex.toString(), hex)
    }
  }
}
