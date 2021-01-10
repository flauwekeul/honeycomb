import { createHex, equals, Hex, HexCoordinates } from '../hex'
import { rectangle, RectangleOptions } from './functions'
import { GridGenerator, Traverser } from './types'

interface InternalTraverser<T extends Hex> {
  (this: Grid<T>): GridGenerator<T>
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
function* infiniteTraverser<T extends Hex>(): GridGenerator<T> {}

export class Grid<T extends Hex> {
  static of<T extends Hex>(hexPrototype: T, traverser?: InternalTraverser<T>) {
    return new Grid(hexPrototype, traverser)
  }

  // todo: rename traverser to iterator?
  constructor(public hexPrototype: T, private traverser: InternalTraverser<T> = infiniteTraverser) {}

  [Symbol.iterator]() {
    return this.traverser()
  }

  clone(traverser = this.traverser) {
    return Grid.of(this.hexPrototype, traverser.bind(this))
  }

  rectangle(options: RectangleOptions) {
    // todo: the generator is wrapped, should that be the same in other calls to clone()? Or should this not be wrapped? Doesn't seem consistent
    return this.clone(() => rectangle(this.hexPrototype, options))
  }

  // fixme: use generic functions for these kinds of operations
  // something like https://github.com/benji6/imlazy or https://github.com/lodash/lodash/wiki/FP-Guide
  each(fn: (hex: T) => void) {
    const each: InternalTraverser<T> = function* each() {
      for (const hex of this.traverser()) {
        fn(hex)
        yield hex
      }
    }
    return this.clone(each)
  }

  map(fn: (hex: T) => T) {
    const map: InternalTraverser<T> = function* map() {
      for (const hex of this.traverser()) {
        yield fn(hex)
      }
    }
    return this.clone(map)
  }

  // todo: alias to take or takeUntil?
  run(stopFn: (hex: T) => boolean = () => false) {
    for (const hex of this.traverser()) {
      if (stopFn(hex)) {
        return this
      }
    }
    return this // or clone()? todo: when to return clone and when not?
  }

  traverse(...commands: Traverser[]) {
    if (commands.length === 0) {
      return this // or clone()? todo: when to return clone and when not?
    }

    const traverse: InternalTraverser<T> = function* traverse() {
      const hasTraversedBefore = this.traverser !== infiniteTraverser
      const previousHexes = [...this.traverser()]
      let coordinates: HexCoordinates = previousHexes[previousHexes.length - 1] || { q: 0, r: 0 }

      for (const command of commands) {
        for (const nextCoordinates of command(coordinates)) {
          coordinates = nextCoordinates
          if (hasTraversedBefore && !previousHexes.some((prevCoords) => equals(prevCoords, coordinates))) {
            return // todo: or continue? or make this configurable?
          }
          yield createHex(this.hexPrototype, coordinates)
        }
      }
    }

    return this.clone(traverse)
  }
}
