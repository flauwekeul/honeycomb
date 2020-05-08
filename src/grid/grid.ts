import { HexPrototype } from '../hex'
import { rectangle, RectangleOptions } from './functions'

export class Grid {
  static create(hexPrototype: HexPrototype) {
    return new this(hexPrototype)
  }

  constructor(public hexPrototype: HexPrototype) {}

  rectangle(options: RectangleOptions) {
    return rectangle(this.hexPrototype, options)
  }
}
