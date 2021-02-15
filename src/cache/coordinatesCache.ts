import { toString } from '../hex/functions'
import { Hex, HexCoordinates } from '../hex/types'
import { Cache } from './types'

// todo: experiment with cache that serializes and deserializes hexes (users should probably implement it)
export class CoordinatesCache<T extends Hex> implements Cache<T> {
  static of<T extends Hex>(hexes?: T[]) {
    return new CoordinatesCache(hexes)
  }

  private cache = new Map<string, T>()

  get last() {
    return Array.from(this.cache.values()).pop()
  }

  get size() {
    return this.cache.size
  }

  constructor(hexes: T[] = []) {
    this.cache = new Map(hexes.map((hex) => [hex.toString(), hex]))
  }

  clear() {
    this.cache.clear()
  }

  delete(coordinates: string | HexCoordinates) {
    return this.cache.delete(stringifyCoordinates(coordinates))
  }

  forEach(fn: (hex: T, id: string, cache: this) => void) {
    this.cache.forEach((hex, id) => fn(hex, id, this))
  }

  get(coordinates: string | HexCoordinates) {
    return this.cache.get(stringifyCoordinates(coordinates))
  }

  has(coordinates: string | HexCoordinates) {
    return this.cache.has(stringifyCoordinates(coordinates))
  }

  set(hex: T) {
    this.cache.set(stringifyCoordinates(hex), hex)
    return this
  }
}

function stringifyCoordinates(coordinates: string | HexCoordinates) {
  return typeof coordinates === 'string' ? coordinates : toString(coordinates)
}
