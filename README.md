# Honeycomb

**⚠️ This is an experimental version and the API is likely to change. I encourage anyone to try out the API and open any [issues/questions](https://github.com/flauwekeul/honeycomb/issues/new) ⚠️**

[![Gitter](https://img.shields.io/gitter/room/flauwekeul/honeycomb.svg)](https://gitter.im/honeycomb-grid)
[![NPM version](https://badge.fury.io/js/honeycomb-grid.svg)](https://www.npmjs.com/package/honeycomb-grid)
[![dependencies](https://david-dm.org/flauwekeul/honeycomb.svg)](https://david-dm.org/flauwekeul/honeycomb)
[![devDependencies](https://david-dm.org/flauwekeul/honeycomb/dev-status.svg)](https://david-dm.org/flauwekeul/honeycomb?type=dev)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/flauwekeul/honeycomb/blob/master/LICENSE)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Another hex grid library made in ~~JavaScript~~TypeScript, heavily inspired by [Red Blob Games'](http://www.redblobgames.com/grids/hexagons/) blog posts and code samples.

Honeycomb works in recent versions of the Chrome, Firefox, Edge and Safari.

## Installation

NPM:

```bash
npm i honeycomb-grid@4.0.0-alpha
```

Yarn:

```bash
yarn add honeycomb-grid@4.0.0-alpha
```

Or download the distribution from [unpkg.com](https://unpkg.com/honeycomb-grid@4.0.0-alpha.1).

## Examples

Create a rectangular grid of 10 by 10 hexes and log each hex:

```typescript
import { createHexPrototype, Grid, rectangle } from 'honeycomb-grid'

// 1. Create a hex prototype. This is an object (literally as a JS prototype) that's used by all hexes in the grid:
const hexPrototype = createHexPrototype({ dimensions: 30 })

// 2. Create a grid with this hex prototype and also pass a "traverser" for a rectangular-shaped grid:
let grid = new Grid(hexPrototype, rectangle({ width: 10, height: 10 }))

// 3. Iterate over the grid to log each hex (notice a new grid instance is returned):
grid = grid.each((hex) => console.log(hex))

// 4. The above won't do anything yet, that's because grid methods are executed lazily.
//    You need to call its run() method in order to execute the each() call (and most other method calls):
grid.run()
```

### Rendering

Honeycomb comes without the ability to render hexes to screen. Fortunately, it isn't very hard. Especially if you use a dedicated rendering library.

Using [SVG.js](http://svgjs.com/):

```typescript
import { Hex } from 'honeycomb-grid'

// it's assumed SVG is present on the window object
const draw = SVG().addTo('body').size('100%', '100%')

function renderSVG(hex: Hex) {
  const polygon = draw
    // create a polygon from a hex's corner points
    .polygon(hex.corners.map(({ x, y }) => `${x},${y}`))
    .fill('none')
    .stroke({ width: 1, color: '#999' })

  return draw.group().add(polygon)
}
```

Using [PixiJS](http://www.pixijs.com/):

```typescript
import { Hex } from 'honeycomb-grid'

// it's assumed PIXI is present on the window object
const app = new PIXI.Application({ transparent: true })
const graphics = new PIXI.Graphics()

document.body.appendChild(app.view)
graphics.lineStyle(1, 0x999999)

function renderCanvas(hex: Hex) {
  const [firstCorner, ...otherCorners] = hex.corners

  // move the "pen" to the first corner
  graphics.moveTo(firstCorner.x, firstCorner.y)
  // draw lines to the other corners
  otherCorners.forEach(({ x, y }) => graphics.lineTo(x, y))
  // finish at the first corner
  graphics.lineTo(firstCorner.x, firstCorner.y)

  app.stage.addChild(graphics)
}
```

Either `render()` function can be used like so:

```typescript
import { createHexPrototype, Grid, rectangle } from 'honeycomb-grid'

// You may want the origin to be the top left corner of a hex's bounding box instead of its center (which is the default)
const hexPrototype = createHexPrototype({ dimensions: 30, origin: 'topLeft' })

new Grid(hexPrototype, rectangle({ width: 10, height: 10 }))
  .each((hex) => renderSVG(hex)) // or: renderCanvas(hex)
  .run()
```

### Point → Hex

Translating a point (pixel) to the corresponding hex in a grid is possible with `Grid.pointToHex()`. It also works with irregularly shaped hexes.

```typescript
const hexPrototype = createHexPrototype({
  dimensions: { xRadius: 50, yRadius: 30 }, // wide hexes
  origin: 'topLeft'
})
const grid = new Grid(hexPrototype, rectangle({ start: { q: 0, r: 0 }, width: 10, height: 10 }))

document.addEventListener('click', ({ offsetX, offsetY }) => {
  const hex = grid.pointToHex(point)
  console.log(hex)
})
```

### Traversing

```typescript
import { at, Compass, move } from 'honeycomb-grid'

// This traverses ("walks") over a grid following a triangular path:
grid
  .traverse([
    at({ q: 0, r: 0 }),   // start at the hex with coordinates { q: 0, r: 0 }
    move(Compass.E, 4),   // move 4 hexes East
    move(Compass.SW, 4),  // move 4 hexes Southwest
    move(Compass.NW, 3),  // move 3 hexes Northwest to close the triangle
  ])
  .each((hex) => console.log(hex))
  .run()                  // logs: Hex {q: 0, r: 0}, Hex {q: 1, r: 0}, Hex {q: 2, r: 0}, …

// You can also supply a custom traverser.
// It's called with:
//   1. cursor: the hex where the previous traverser left off
//   2. getHex: a function that either returns a hex from the grid's store (if present) or creates a new hex
// It must return an iterable (usually an array) of hexes:
grid.traverse((cursor, getHex) => [getHex(cursor)]) // this traverser isn't very useful 😬

// Because a traverser must return an iterable of hexes, generators can be traversers too:
grid.traverse(function*(cursor, getHex) {
  yield getHex({ q: 0, r: 0 })
  yield getHex({ q: 1, r: 0 })
  yield getHex({ q: 0, r: 1 })
})
```

### Stateful and stateless grids

```typescript
import { Grid, rectangle } from 'honeycomb-grid'

// When a grid is created with a traverser…
const statefulGrid = new Grid(hexPrototype, rectangle({ width: 2, height: 2 }))
// …all hexes produced by the traverser are added to a store (a JS Map):
statefulGrid.store  // Map(4) {"0,0" => Hex, "1,0" => Hex, "0,1" => Hex, "1,1" => Hex}
// This is a stateful grid (it has a store) and it can be iterated:
statefulGrid
  .filter((hex) => hex.q === 1)
  .each((hex) => console.log(hex))
  .run()  // logs: Hex {q: 1, r: 0}, Hex {q: 1, r: 1}

// If you don't need state and/or want a performance gain, create a stateless grid:
const statelessGrid = new Grid(hexPrototype)  // don't pass a 2nd argument
statelessGrid.store // Map(0) {}
// This grid can't be iterated (what hexes and in what order?)
statelessGrid.each((hex) => console.log(hex)).run() // logs nothing
// However, traversal is always possible:
statelessGrid
  .traverse(at({ q: 1, r: 1 }))     // traverse a single hex
  .each((hex) => console.log(hex))
  .run()  // logs: Hex {q: 1, r: 1}
```

### Coordinate system

There are three types of coordinates and most functions/methods that accept coordinates accept either of these:

1. [Offset coordinates](https://www.redblobgames.com/grids/hexagons/#coordinates-offset), e.g.: `{ col: 1, row: 2 }`
2. [Axial coordinates](https://www.redblobgames.com/grids/hexagons/#coordinates-axial), e.g.: `{ q: 1, r: 2 }`
3. [Cube coordinates](https://www.redblobgames.com/grids/hexagons/#coordinates-cube), e.g.: `{ q: 1, r: 2, s: -3 }` (the sum of all three coordinates must always be 0)

You may also find points (e.g.: `{ x: 1, r: 2 }`) in the library. For example, a hex's `corners` property returns an array of the hex's six corner points.

There are some functions for converting between types of coordinates:

```typescript
offsetToCube(OffsetCoordinates, HexPrototype): CubeCoordinates
pointToCube(Point, HexPrototype): CubeCoordinates

hexToOffset(Hex): OffsetCoordinates
hexToPoint(Hex): Point
```

### Odd or even hex offsets

In a grid with pointy hexes, each row is offsetted half a hex relative to the previous row. In grids with flat hexes, this applies to the columns. Redblobgames.com has a [visual example](https://www.redblobgames.com/grids/hexagons/#coordinates-offset).

Set the offset property to 1 or -1 (default) to control whether the even or odd rows/columns are offsetted.

## Playground

The project contains a playground to play around with Honeycomb on your machine. I use this myself to test out new functionality. To use it follow these steps:

1. `git clone git@github.com:flauwekeul/honeycomb.git`
2. `git switch next`
3. `npm run dev` (this starts a server that automatically rebuilds the project to `/dist` when anything in `/src` changes)
4. `npm run playground` (this starts a [parcel](https://parceljs.org/) server running at `http://localhost:1234` with `/playground/index.html` as its entrypoint)
5. Play around with the files in `/playground` (mainly `/playground/index.ts`)

The playground contains `render.ts` to render individual hexes as SVGs and `benchmark.ts` for running comparative performance tests.

## Documentation

I'm planning on writing documentation once the API is (more or less) stable.

## 4.0 Backlog

Features that are crossed out are not going to be added. Checked features are implemented (or not applicable). The rest will probably be implemented.

### General

- [x] ~~Do something with this: [https://www.redblobgames.com/grids/hexagons/#map-storage](https://www.redblobgames.com/grids/hexagons/#map-storage)?~~ A `Map` works fine
- [x] There should be a way to loop over hexes in a grid with **transducers**? Experimented with this and I couldn't get it to work when a grid was traversed multiple times before being run (triggering the transducer). Surprisingly, it had a significant performance drop (more than 50%). Don't know what caused it though, probably the combination of transducers and traversers that don't fit well together. Might investigate more in the future.
- [ ] Add functionality related to [edges](https://github.com/flauwekeul/honeycomb/issues/58#issuecomment-642099947)
- [ ] Do something with matrices?
- [ ] Add some generic rendering helpers (a "pen" that "draws" hex edges (for canvas) or a single hex (for SVG))
- [ ] Make sure the lib can be imported as a module (e.g.: `<script type="module" src="https://unpkg.com/honeycomb-grid/dist/honeycomb.mjs"></script>`). Probably use [microbundle](https://github.com/developit/microbundle) or [snowpack](https://snowpack.dev).
- [ ] Switch to [np](https://github.com/sindresorhus/np) for publishing releases

### Functions *and* methods

These methods exist in v3 and they need to be considered for v4.

- [ ] hex functions (apply to a single hex):
  - [ ] ?   add
  - [x] ~~cartesian~~ replaced with `row` and `col` props
  - [x] ~~cartesianToCube (alias: toCube)~~ replaced with `offsetToAxial()`
  - [ ] center
  - [x] ~~coordinates (returns cube by default?)~~ considered obsolete
  - [x] corners
  - [x] ~~cube~~ considered obsolete
  - [x] ~~cubeToCartesian (alias: toCartesian)~~ replaced with `hexToOffset()`
  - [x] equals
  - [x] fromPoint: `pointToCube()`
  - [x] height
  - [x] isFlat
  - [x] isPointy
  - [ ] lerp
  - [ ] nudge
  - [x] round
  - [ ] ?   set
  - [ ] ?   subtract
  - [ ] thirdCoordinate
  - [x] toString
  - [x] width
- [ ] grid functions (apply to multiple hexes):
  - [ ] ?   distance
  - [x] hexToPoint
  - [x] pointToHex
  - [x] get
  - [ ] hexesBetween: `between()` traverser
  - [ ] hexesInRange:
    - [ ] `ring()` traverser (always 1 hex thick)
    - [ ] `spiral()` traverser (uses `ring()` internally and offers an API to skip to the next ring)?
    - [ ] `rays()` traverser (produces hexes in straight lines from the start hex)
  - [ ] line (can be infinite): `move()` traverser. TODO: rename move() to line()?
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

### Grid

#### Terminology

- *grid instance*: an iterable object that represents hexes in a plane (possibly with infinite dimensions). ~~The order of iteration is not important?~~
- *stateful grid*: a grid with a non-empty `store`. The store can be filled when the grid is created by either passing a store or a traverser as the 2nd argument.
- *stateless grid*: a grid with an empty `store`. Create a stateless grid by only passing a hex prototype to the constructor.
- *concrete grid*: a grid instance with finite hexes stored as a concrete data type (array, object, string, etc)
- *grid-like*: an iterable that can be converted to a grid instance
- *traverser*: a ~~generator~~ (generators are not performant, so the built-in traversers are regular array-producing functions, but a traverser can still be a generator) function that determines how a grid instance is traversed. It produces hexes in a certain order.

  The result of a traversal is always a new grid (the traversed grid isn't mutated, the hexes in it can be mutated though), this can be added/subtracted/intersected/differenced, mapped/reduced or just ignored (in case of side-effects).
- *iterator method*: a grid method that iterates over the hexes in the grid (if any). A traverser is also an iterator. Stateful grids can always be iterated (using the store), stateless grids can only be iterated when traversed at least once.

#### API

- [x] **Creation**:
  - [x] `new Grid<T extends Hex>(hexPrototype: T, traverserOrStore?: Traverser<T> | Map<string, T>)`: ~~can be traversed indefinitely, determine default traverser (spiral?) the default traverser doesn't emit hexes~~ A grid without hexes isn't very helpful, so it makes sense to pass a traverser or store (`Map`) to the constructor.
  - [x] ~~`Grid.of<T extends Hex>(/* same args as constructor */)`~~
  - [x] `Grid.from<T extends Hex>(iterable: Iterable<T>)`
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
  - [ ] ? grid.some() whether any hex passes predicate
  - [ ] ? grid.every() whether all hexes pass predicate
- [ ] **Mutation/reduction**:
  - [ ] `grid.update((grid) => void)`
    ```typescript
    // the passed grid is already a clone, similar to Immer
    grid.update((grid) => {
      // grid.hexes() returns the hexes since the last run() call
      grid.store = new Map(grid.hexes().map((hex) => [hex.toString(), hex]))
    })
    ```
  - [ ] `grid.reduce<R>((R, hex, grid) => R, R): R`
  - [ ] `grid.toArray(): T[]`
  - [ ] ~~`grid.toJSON()`~~
  - [ ] ~~`grid.toString()` / `grid.serialize()`~~
  - [ ] ~~`grid.toLinkedList()`~~
  - [ ] ~~`grid.toRecord()`~~
  - [ ] ~~`grid.toMap()`~~ (just use `grid.store`)
  - [ ] ~~`grid.toSet()`~~

### ✅ Coordinates

- [x] Store coordinates as ~~"tuples" (arrays)~~ simple 3D objects. ~~Investigate whether arrays or objects (without prototype?) (maybe even strings, ArrayBuffer?) are more performant.~~
- [x] Take [Amit's advice](https://www.redblobgames.com/grids/hexagons/#coordinates-comparison) and use axial coordinates by default.
  - [x] ~~Use `x`, `y` and `z` for cube coordinates?~~
  - [x] ~~Rename cartesian to offset?~~
  - [ ] Also use [doubled coordinates](https://www.redblobgames.com/grids/hexagons/#coordinates-doubled)?
- [x] Problem: how to differentiate between 2D hex coordinate and 2D "pixel" coordinate?
  **Solution**: `CartesianCoordinates` is an alias of `Point`. A "coordinate" is a point in a grid, a "point" is any 2D/3D point in any system (e.g. a grid).
- [x] ~~Offer `Point()` function (with `add()` etc methods)? And/or a way to convert tuples to points/coordinates?~~ Converting from/to tuples is outside this lib's scope.

### ✅ Hex

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
  - [x] (Naming) conventions for these groups?
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
