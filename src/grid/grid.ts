import { equals, Hex, HexCoordinates } from '../hex'
import { rectangle, RectangleOptions } from './functions'
import { GridGenerator, GridGeneratorFunction } from './types'

// eslint-disable-next-line @typescript-eslint/no-empty-function
function* infiniteTraverser<T extends Hex>(): GridGenerator<T> {}

// fixme: there's a lot of duplicate iteration, use a cache (or memoisation?)
export class Grid<T extends Hex> {
  static of<T extends Hex>(hexPrototype: T, traverser?: GridGeneratorFunction<T>) {
    return new Grid(hexPrototype, traverser)
  }

  constructor(public hexPrototype: T, private traverser: GridGeneratorFunction<T> = infiniteTraverser) {}

  [Symbol.iterator]() {
    // todo: {} as T is a bit hacky, but making it an optional parameter is meh
    return this.traverser({} as T)
  }

  has(coordinates: HexCoordinates) {
    // the defaultTraverser "has" all coordinates
    if (this.traverser === infiniteTraverser) {
      return true
    }
    for (const hex of this) {
      if (equals(hex, coordinates)) {
        return true
      }
    }
  }

  clone(traverser = this.traverser) {
    // todo: maybe not bind and pass grid to traverser? Tried this, but it results in a "Maximum call stack size exceeded" error
    return Grid.of(this.hexPrototype, traverser.bind(this))
  }

  rectangle(options: RectangleOptions) {
    // todo: the generator is wrapped, should that be the same in other calls to clone()? Or should this not be wrapped? Doesn't seem consistent
    return this.clone(() => rectangle(this.hexPrototype, options))
  }

  // inspired by https://github.com/ReactiveX/rxjs/blob/master/src/internal/util/pipe.ts
  // pipe(...fns: GridOperator<T>[]): Grid<T> {
  //   return ((grid: Grid<T>) => fns.reduce((prev, fn) => fn(prev), grid))(this)
  // }

  // fixme: use generic functions for these kinds of operations
  // something like https://github.com/benji6/imlazy or https://github.com/lodash/lodash/wiki/FP-Guide
  each(fn: (hex: T) => void) {
    const traverser = function* (this: Grid<T>) {
      for (const hex of this) {
        fn(hex)
        yield hex
      }
    }
    return this.clone(traverser)
  }

  map(fn: (hex: T) => T) {
    const traverser = function* (this: Grid<T>) {
      for (const hex of this) {
        yield fn(hex)
      }
    }
    return this.clone(traverser)
  }

  // todo: other/more args?
  run(stopFn: (hex: T) => boolean = () => false) {
    for (const hex of this) {
      if (stopFn(hex)) {
        return this
      }
    }
    return this // or clone()? todo: when to return clone and when not?
  }

  traverse(...commands: GridGeneratorFunction<T>[]) {
    if (commands.length === 0) {
      return this // or clone()? todo: when to return clone and when not?
    }
    // todo: {} as T is a bit hacky, but making it an optional parameter is meh
    let currentHex = this.traverser({} as T).next().value || ({ q: 0, r: 0 } as T)

    const traverser = function* (this: Grid<T>) {
      for (const command of commands) {
        const hexes = command(currentHex)
        for (const hex of hexes) {
          // stop once the hex is outside the grid
          if (!this.has(hex)) {
            return
          }
          yield hex
          currentHex = hex
        }
      }
    }
    return this.clone(traverser)
  }
}
