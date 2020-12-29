import { DefaultHexPrototype, HexCoordinates } from '../hex'
import { rectangle, RectangleOptions } from './functions'
import { GridGenerator } from './types'

// eslint-disable-next-line @typescript-eslint/no-empty-function
function* defaultTraverser(): GridGenerator {}

// fixme: probably not `T extends DefaultHexPrototype`, but `T extends Hex`
export class Grid<T extends DefaultHexPrototype> {
  static of<T extends DefaultHexPrototype>(hexPrototype: T, traverser?: (this: Grid<T>) => GridGenerator) {
    return new Grid(hexPrototype, traverser)
  }

  constructor(public hexPrototype: T, private traverser = defaultTraverser) {}

  [Symbol.iterator]() {
    return this.traverser()
  }

  clone(traverser = this.traverser) {
    // todo: maybe not bind and pass grid to traverser?
    return new Grid(this.hexPrototype, traverser.bind(this))
  }

  rectangle(options: RectangleOptions) {
    // todo: the generator is wrapped, should that be the same in other calls to clone()? Or should this not be wrapped? Doesn't seem consistent
    return this.clone(() => rectangle(this.hexPrototype, options))
  }

  // inspired by https://github.com/ReactiveX/rxjs/blob/master/src/internal/util/pipe.ts
  // pipe(...fns: GridOperator<T>[]): Grid<T> {
  //   return ((grid: Grid<T>) => fns.reduce((prev, fn) => fn(prev), grid))(this)
  // }

  each(fn: (hex: HexCoordinates) => void) {
    const traverser = function* (this: Grid<T>) {
      for (const hex of this) {
        fn(hex)
        yield hex
      }
    }
    return this.clone(traverser)
  }

  map(fn: (hex: HexCoordinates) => HexCoordinates) {
    const traverser = function* (this: Grid<T>) {
      for (const hex of this) {
        yield fn(hex)
      }
    }
    return this.clone(traverser)
  }

  // todo: other/more args?
  run(stopFn: (hex: HexCoordinates) => boolean = () => false) {
    for (const hex of this) {
      if (stopFn(hex)) {
        return this
      }
    }
    return this // or clone()? todo: when to return clone and when not?
  }

  traverse(...commands: ((hex: HexCoordinates) => GridGenerator)[]) {
    // todo: move this inside generator?
    if (commands.length === 0) {
      return this.clone()
    }
    let nextHex = this.traverser().next().value || { q: 0, r: 0 }

    const traverser = function* (this: Grid<T>) {
      for (const command of commands) {
        const hexes = command(nextHex)
        for (const hex of hexes) {
          yield hex
          nextHex = hex
        }
      }
    }
    return this.clone(traverser)
  }
}
