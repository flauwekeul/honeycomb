# Honeycomb

## Next major version

The alpha of the next major version (v4) is released (see the [changelog](https://github.com/flauwekeul/honeycomb/blob/next/CHANGELOG.md) in the [`next`](https://github.com/flauwekeul/honeycomb/tree/next) branch). It's a complete rewrite in TypeScript with all new shiny "traversers" 😎.

I could really use your feedback about this new version, so please take a look at the [readme](https://github.com/flauwekeul/honeycomb/tree/next#honeycomb) in the [`next`](https://github.com/flauwekeul/honeycomb/tree/next) branch to see how you can start using it. Please open an [issue](https://github.com/flauwekeul/honeycomb/issues) and tell me what you like and/or don't like. Thanks! ✨

* * *

[![Gitter](https://img.shields.io/gitter/room/flauwekeul/honeycomb.svg)](https://gitter.im/honeycomb-grid)
[![NPM version](https://badge.fury.io/js/honeycomb-grid.svg)](https://www.npmjs.com/package/honeycomb-grid)
[![dependencies](https://david-dm.org/flauwekeul/honeycomb.svg)](https://david-dm.org/flauwekeul/honeycomb)
[![devDependencies](https://david-dm.org/flauwekeul/honeycomb/dev-status.svg)](https://david-dm.org/flauwekeul/honeycomb?type=dev)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/flauwekeul/honeycomb/blob/master/LICENSE)

Another hex grid library made in JavaScript, heavily inspired by [Red Blob Games'](http://www.redblobgames.com/grids/hexagons/) blog posts and code samples.

All existing JS hex grid libraries I could find are coupled with some form of view. Most often a `<canvas>` element or the browser DOM. I want more separation of concerns…and a new hobby project to spend countless hours on.

## Ideas for v4.0

### Functions *and* methods

- [ ] hex functions (apply to single hexes):
  - [ ] ?   add
  - [ ] cartesian
  - [ ] ?   cartesianToCube (alias: toCube)
  - [ ] center
  - [ ] ?   coordinates (returns cube by default?)
  - [ ] corners
  - [ ] cube
  - [ ] cubeToCartesian (alias: toCartesian)
  - [ ] equals
  - [ ] from (convert anything? to a hex)
  - [ ] height
  - [ ] isFlat
  - [ ] isPointy
  - [ ] lerp
  - [ ] nudge
  - [ ] round
  - [ ] ?   set
  - [ ] ?   subtract
  - [ ] thirdCoordinate
  - [ ] toString
  - [ ] width
- [ ] grid functions (apply to multiple hexes):
  - [ ] ?   distance
  - [ ] hexToPoint
  - [ ] pointToHex
  - [ ] get
  - [ ] hexesBetween
  - [ ] hexesInRange
  - [ ] ?   line (can be infinite)
  - [ ] neighborsOf
  - [ ] pointHeight
  - [ ] pointWidth
  - [ ] ?   set
  - [ ] parallelogram
  - [ ] triangle (can be infinite?)
  - [ ] hexagon (can be infinite?)
  - [ ] rectangle
  - [ ] ring (can be infinite?)
  - [ ] spiral (can be infinite)

### Coordinates

- [ ] Store coordinates as ~~"tuples" (arrays)~~ simple 3D objects. Investigate whether arrays or objects (without prototype?) (maybe even strings, ArrayBuffer?) are more performant.
- [x] Take [Amit's advice](https://www.redblobgames.com/grids/hexagons/#coordinates-comparison) and use axial coordinates by default.
  - [ ] Use `x`, `y` and `z` for cube coordinates?
  - [ ] Rename cartesian to offset?
  - [ ] Also use [doubled coordinates](https://www.redblobgames.com/grids/hexagons/#coordinates-doubled)?
- [x] Problem: how to differentiate between 2D hex coordinate and 2D "pixel" coordinate?
  **Solution**: `CartesianCoordinates` is an alias of `Point`. A "coordinate" is a point in a grid, a "point" is any 2D/3D point in any system (e.g. a grid).

### Hex

- [x] Hexes only have axial coordinates (most methods require axial coordinates anyway).
- [ ] Different groups of functions:
  1. Functions that **require both** a hex prototype and a hex (e.g. `toPoint()`)
  2. Functions that require a hex prototype and **optionally a hex** (e.g. `corners()` with just a hex prototype returns the relative corners of any hex, `corners()` with both a hex prototype and a hex returns the absolute corners of the hex)
  3. Functions that require **only** a **hex prototype** (e.g. `width()`)
  4. Functions that require **only** a **hex** (e.g. `equals()`)
  - [x] What to do when group 1 is only called with a hex prototype? ~~Return a function that accepts a hex.~~ Todo: Log a warning
  - [ ] (Naming) conventions for these groups?
    - group 1: ~~offer higher order function that accepts a hex prototype (prefixed with `create`, e.g. `createToPoint()`?) and returns a function that accepts a hex. This can be used to create hex prototype methods using partial application (i.e. `hex.toPoint()`).~~ When used as a static method: name start with `hex` (e.g. `hexToPoint()`) and accepts a hex. When used as a prototype method: accepts no arguments (works on instance).
    - group 2: 1st parameter is the hex prototype, 2nd optional parameter the hex. The return value depends on whether the 2nd parameter was passed. This can also be used as a static method on Hex or a prototype method (then the function is partially applied with the hex prototype).
    - group 3: are both available as a static and prototype method.
    - group 4: available as a static method and a partially applied prototype method.
- [ ] By default hexes only have coordinates as state. Should be possible for users to add state:
    ```ts
    interface CustomHex {
      customProp: string
      customMethod(): void
    }

    // the properties of CustomHex are available to all hexes (because they're added to the prototype)
    // todo: rename `createHexPrototype()` to `defineHex()`?
    const hexPrototype = createHexPrototype<CustomHex>({ size: 20, customProp: 'custom', customMethod() {} })

    // using classes:
    // todo: check if this works
    class CustomHex extends Hex {
      // only way to put a property on the prototype
      get customProp() {
        return 'custom'
      }

      // it should be discouraged to use a constructor because Hexes are created by honeycomb

      customMethod() {}
    }
    ```
  - how can you type functions that accept hexes? RxJS operators seem to be able to fix this.
- [x] ~~Maybe either have pointy or flat hexes and leave it to rendering if they're pointy or flat?~~ All the `if` statements that check whether hexes are pointy or flat may be resolved by having separate functions for pointy and flat hexes and using those in the Hex prototype. This doesn't seem to improve performance.
- [ ] Investigate if memoization helps
- [ ] Make it possible to use own createHex() functions (this also means hex prototypes aren't set by Honeycomb)?

### Grid

- [ ] Do something with this: [https://www.redblobgames.com/grids/hexagons/#map-storage](https://www.redblobgames.com/grids/hexagons/#map-storage)?
- [ ] There's a function to create a `traverser`: a [generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) that determines how to traverse a grid. It's called with a start direction and returns a [Generator object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator):
  ```ts
  const hexPrototype = createHexPrototype({ size: 10, orientation: 'flat' })

  // using separate functions:
  const rectange = createTraverser((hexPrototype, direction = 'E') => {
    // some logic that determines when to change direction (and when to stop?)
  })
  // this returns a Generator object
  const grid = rectangle(hexPrototype, /* todo: determine args */)
  ```
  - [x] ~~these generators produce infinite grids, how to signal boundaries?~~ Traversers accept an optional width or height and/or a `stop()` predicate function that signal when to return from the generator.
- [ ] `Grid` has built-in traversers to create grids in a certain shape (rectangle, triangle, ring, etc.)?
  ```ts
  const Grid = defineGrid(hexPrototype)
  const grid = Grid.rectangle({ width: 10, height: 10, direction: 'E' })
  ```
- [ ] Using generators it's up to the user how to store grids (make them concrete):
  ```ts
  // as an array:
  const array = [...grid]
  // as a set:
  const set = new Set(grid)
  // as an object (or whatever else):
  reduce(grid, (acc, hex, i) => {
    acc[i] = hex
    return acc
  }, {})
  ```
- [ ] It's also possible to traverse concrete grids (arrays, sets, etc.):
  ```ts
  // array is some concrete grid
  Grid.from(array).rectangle({ /* options */ }) // or: new Grid(array)
  ```
- [ ] There should be a way to loop over hexes in a grid with **transducers**?
