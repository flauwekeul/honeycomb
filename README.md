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
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Another hex grid library made in TypeScript, heavily inspired by [Red Blob Games'](http://www.redblobgames.com/grids/hexagons/) blog posts and code samples.

All existing JS hex grid libraries I could find are coupled with some form of view. Most often a `<canvas>` element or the browser DOM. I want more separation of concerns…and a new hobby project to spend countless hours on.

## Ideas for v4.0

### General

- [ ] Add functionality related to [egdes](https://github.com/flauwekeul/honeycomb/issues/58#issuecomment-642099947)
- [ ] remove "hex" from functions in hex folder (e.g. `createHex()` plainly becomes `create()`)?

### Functions *and* methods

- [ ] hex functions (apply to single hexes):
  - [ ] ?   add
  - [x] ~~cartesian~~ replaced with `row` and `col` props
  - [x] ~~cartesianToCube (alias: toCube)~~ replaced with `offsetToAxial()`
  - [ ] center
  - [x] ~~coordinates (returns cube by default?)~~ considered obsolete
  - [x] corners
  - [x] ~~cube~~ considered obsolete
  - [x] ~~cubeToCartesian (alias: toCartesian)~~ replaced with `hexToOffset()`
  - [x] equals
  - [ ] from (convert anything? to a hex)
  - [x] height
  - [x] isFlat
  - [x] isPointy
  - [ ] lerp
  - [ ] nudge
  - [ ] round
  - [ ] ?   set
  - [ ] ?   subtract
  - [ ] thirdCoordinate
  - [x] toString
  - [x] width
- [ ] grid functions (apply to multiple hexes):
  - [ ] ?   distance
  - [x] hexToPoint
  - [ ] pointToHex
  - [x] get
  - [ ] hexesBetween
  - [ ] hexesInRange
  - [ ] ?   line (can be infinite)
  - [x] ~~neighborsOf~~ replaced with `neighborOf()` (singular)
  - [ ] pointHeight
  - [ ] pointWidth
  - [ ] ?   set
  - [ ] parallelogram
  - [ ] triangle (can be infinite?)
  - [ ] hexagon (can be infinite?)
  - [x] rectangle
  - [ ] ring (can be infinite?)
  - [ ] spiral (can be infinite)

### ✅ Coordinates

- [x] Store coordinates as ~~"tuples" (arrays)~~ simple 3D objects. ~~Investigate whether arrays or objects (without prototype?) (maybe even strings, ArrayBuffer?) are more performant.~~
- [x] Take [Amit's advice](https://www.redblobgames.com/grids/hexagons/#coordinates-comparison) and use axial coordinates by default.
  - [x] ~~Use `x`, `y` and `z` for cube coordinates?~~
  - [x] ~~Rename cartesian to offset?~~
  - [ ] Also use [doubled coordinates](https://www.redblobgames.com/grids/hexagons/#coordinates-doubled)?
- [x] Problem: how to differentiate between 2D hex coordinate and 2D "pixel" coordinate?
  **Solution**: `CartesianCoordinates` is an alias of `Point`. A "coordinate" is a point in a grid, a "point" is any 2D/3D point in any system (e.g. a grid).
- [x] ~~Offer `Point()` function (with `add()` etc methods)? And/or a way to convert tuples to points/coordinates?~~ Converting from/to tuples is outside this lib's scope.

### Hex

- [x] Hexes only have axial coordinates (most methods require axial coordinates anyway).
- [x] Make default origin the center of the hex (currently is top left corner)? Can't remember why it's not already the center.
  - [ ] Add `boundingBox` (with `topLeft`, `topRight`, etc)
  - [x] Origin should also be able to set with a function that's called with the hex prototype (?) so that width, height or corners can be used to determine origin
- [x] ~~Make it possible to use own createHex() functions (this also means hex prototypes aren't set by Honeycomb)?~~ Every time a new hex is created (in `Grid` for example), the `clone()` method is called. This way users can control how hexes are created.
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
- [x] By default hexes only have coordinates as state. Should be possible for users to add state:
    ```ts
    interface CustomHex {
      customProp: string
      customMethod(): void
    }
    // the properties of CustomHex are available to all hexes (because they're added to the prototype)
    // todo: rename `createHexPrototype()` to `defineHex()`?
    const hexPrototype = createHexPrototype<CustomHex>({ size: 20, customProp: 'custom', customMethod() {} })
    ```
  - [x] how can you type functions that accept hexes? RxJS operators seem to be able to fix this.
- [x] ~~Maybe either have pointy or flat hexes and leave it to rendering if they're pointy or flat?~~ All the `if` statements that check whether hexes are pointy or flat may be resolved by having separate functions for pointy and flat hexes and using those in the Hex prototype. This doesn't seem to improve performance.
- [x] ~~Investigate if memoization helps~~ It doesn't

### Grid

#### Terminology

- *grid instance*: an iterable object that represents hexes in a plane (possibly with infinite dimensions). ~~The order of iteration is not important?~~
- *concrete grid*: a grid instance with finite hexes stored as a concrete data type (array, object, string, etc)
- *grid-like*: an iterable that can be converted to a grid instance
- *traverser*: a ~~generator~~ (generators are not performant, so the built-in traversers are regular array-producing functions, but a traverser can still be a generator) function that determines how a grid instance is traversed. It produces hexes in a certain order.

  The result of a traversal is always a new grid (the traversed grid isn't mutated, the hexes in it can be mutated though), this can be added/subtracted/intersected/differenced, mapped/reduced or just ignored (in case of side-effects).
- *transformer*(?): methods of `Grid` that can transform the hexes produced by a traverser: `each()`, `filter()`, `takeWhile()`, etc.

#### API

- [ ] **Creation**:
  - [x] `new Grid<T extends Hex>(hexPrototype: T, traverserOrStore?: Traverser<T> | Map<string, T>)`: ~~can be traversed indefinitely, determine default traverser (spiral?) the default traverser doesn't emit hexes~~ A grid without hexes isn't very helpful, so it makes sense to pass a traverser or store (`Map`) to the constructor.
  - [x] `Grid.of<T extends Hex>(/* same args as constructor */)`
  - [ ] `Grid.from<T extends Hex>(iterable: Iterable<T>)`
- [ ] **Traversal**:
  - [x] `grid.rectangle(options)`
  - [ ] `grid.hexagon(options)`
  - [ ] ~~`grid.parallelogram(options)`~~ add if requested
  - [ ] ~~`grid.triangle(options)`~~ add if requested
  - [ ] `grid.spiral(options)` (`grid.ring(options)` would be a spiral that stops)
  - [x] ~~`grid.line(options)`~~ see the `move()` traverser
  - [ ] ~~`grid.zigzag(options)`?~~ add if requested
  - [ ] todo: methods that use path finding algorithms like A*?
  - [x] ~~`grid.createTraverser(function* customTraverser(options) {})(options)`~~
  - [x] 👉 Make traversers even more fine-grained (~~seems very complex~~ it is, but worth it!)
    ```ts
    // this creates a ring around startCoordinates
    grid
      .traverse((
        at(startCoordinates),
        move(Compass.E),
        // todo: use repeat() somehow:
        // repeat.withIndex(5, (i) => move(i + 1))
        // or:
        // withIndex((i) => repeat(5, move(i + 1)))
        move(Compass.SW),
        move(Compass.W),
        move(Compass.NW),
        move(Compass.NE),
        move(Compass.E),
      )
      .run()
    ```
- [ ] **Combination**:
  - [ ] `grid.add(otherGrid)` / `grid.union(otherGrid)`
  - [ ] `grid.subtract(otherGrid)`
  - [ ] `grid.intersect(otherGrid)`
  - [ ] `grid.difference(otherGrid)`
  - [x] ~~`grid.mergeMap()` / `grid.zip()`~~ these ~~seem~~ are useless
- [ ] **Assertion**:

  Maybe make shortcut methods for these:
  - [x] ~~`grid.someTraverser(options).pipe(until(({ hex }) => hex.someState)).size > 0`: grid.some() whether any hex passes predicate~~
  - [x] ~~`grid.someTraverser(options).pipe(until(({ hex }) => !hex.someState)).size === grid.size` grid.every() whether all hexes pass predicate~~
- [ ] **Mutation/reduction**?:
  - [ ] `grid.reduce((any, traversalState) => any, any)`
  - [ ] `grid.toArray()`
  - [ ] `grid.toJSON()`
  - [ ] `grid.toString()` / `grid.serialize()`
  - [ ] ~~`grid.toLinkedList()`~~
  - [ ] ~~`grid.toRecord()`~~
  - [ ] ~~`grid.toMap()`~~ (just use `grid.store`)
  - [ ] ~~`grid.toSet()`~~

#### Other ideas

- [x] ~~Do something with this: [https://www.redblobgames.com/grids/hexagons/#map-storage](https://www.redblobgames.com/grids/hexagons/#map-storage)?~~ A `Map` works fine
- [x] There should be a way to loop over hexes in a grid with **transducers**? Experimented with this and I couldn't get it to work when a grid was traversed multiple times before being run (triggering the transducer). Surprisingly, it had a significant performance drop (more than 50%). Don't know what caused it though, probably the combination of transducers and traversers that don't fit well together. Might investigate more in the future.
- [ ] Do something with matrices?
