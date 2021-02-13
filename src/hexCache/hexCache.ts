import { Hex } from '../hex'

export interface Cache<T> {
  items: T[]
  size: number
}

export class HexCache<T extends Hex> implements Cache<T> {
  static of<T extends Hex>(items?: T[]) {
    return new HexCache(items)
  }

  constructor(public items: T[] = []) {}

  get size() {
    return this.items.length
  }
}
