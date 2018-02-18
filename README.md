# Honeycomb

[![Gitter](https://img.shields.io/gitter/room/flauwekeul/honeycomb.svg)](https://gitter.im/honeycomb-grid)
[![NPM version](https://badge.fury.io/js/honeycomb-grid.svg)](https://www.npmjs.com/package/honeycomb-grid)
[![dependencies](https://david-dm.org/flauwekeul/honeycomb.svg)](https://david-dm.org/flauwekeul/honeycomb)
[![devDependencies](https://david-dm.org/flauwekeul/honeycomb/dev-status.svg)](https://david-dm.org/flauwekeul/honeycomb?type=dev)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/flauwekeul/honeycomb/blob/master/LICENSE)

Another hex grid library made in JavaScript, heavily inspired by [Red Blob Games'](http://www.redblobgames.com/grids/hexagons/) blog posts and code samples.

All existing JS hex grid libraries I could find are coupled with some form of view. Most often a `<canvas>` element or the browser DOM. I want more separation of concerns...and a new hobby project to spend countless hours on.

### Features

-   🙌 Works in (modern) browsers and in Node.js.
-   📐 Create hex grids in different shapes: ▭ rectangles, △ triangles, ⬡ hexagons and ▱ parallelograms.
-   🌐 2 coordinate systems: cartesian (`x` and `y`) and cube (`q`, `r` and `s`).
-   ✨ Create your own hexes by extending the built-in Hex.
-   🗺 Convert points to hexes and vice versa.
-   ⬢ Pointy and ⬣ flat hexes.
-   🖥 Lets you decide how hexes are rendered.

## Installation

NPM:

```bash
npm i --save honeycomb-grid
```

Yarn:

```bash
yarn add honeycomb-grid
```

## Getting started

### Browser

```html
<script src="honeycomb.js"></script>

<script>
    const Grid = Honeycomb.defineGrid()
    Grid.rectangle({ width: 4, height: 4 })
</script>
```

### Node.js

```javascript
const Honeycomb = require('honeycomb-grid')

const Grid = Honeycomb.defineGrid()
Grid.rectangle({ width: 4, height: 4 })
```

## Examples

### Basic usage

Create a hex grid in 3 steps:

```javascript
// 1.  (optionally) create a Hex factory by extending the default:
const Hex = Honeycomb.extendHex({
    size: 30,           // default: 1
    orientation: 'flat' // default: 'pointy'
})

// 2.  create a Grid factory that uses the Hex factory:
const Grid = Honeycomb.defineGrid(Hex)

// 3a. create a grid with a "shape" method:
const grid1 = Grid.rectangle({ width: 4, height: 4 })
// [
//    { x: 0, y: 0 },
//    { x: 0, y: 1 },
//    { x: 0, y: 2 },
//    …
// ]

// 3b. or create a grid from individual hexes:
const grid2 = Grid(Hex(1, 2), Hex(3, 4))
// [
//    { x: 1, y: 2 },
//    { x: 3, y: 4 }
// ]
```

#### Grids extend `Array.prototype`

Most properties/methods of grids are the same as their Array counterpart:

```javascript
const grid = Grid.rectangle({ width: 4, height: 4 })

grid.length // 16
grid.pop()  // { x: 3, y: 3 }
grid.length // 15
grid[4]     // { x: 1, y: 0 }
```

Some Grid methods are augmented. For example: [`Array#includes()`](https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) always returns `false` when passed an object literal because it uses [strict equality](https://developer.mozilla.org/nl/docs/Web/JavaScript/Equality_comparisons_and_sameness) internally. [`Grid#includes()`](#gridincludes) _only_ accepts object literals (in the form of [points](#point-1)):

```javascript
const array = [{ x: 1, y: 0 }]
array.includes({ x: 1, y: 0 })  // false

const grid = Grid(Hex(1, 0))
grid.includes({ x: 1, y: 0 })   // true
```

#### Mutating grid methods

Methods that mutate the grid in-place ([Grid#push](#gridpush), [Grid#splice](#gridsplice) and [Grid#unshift](#gridunshift)) only accept valid hexes to prevent "grid corruption" 👮‍ ([Grid#fill](#gridfill) isn't implemented at all).

```javascript
const grid = Grid()             // []

// this silently fails:
grid.push('invalid hex')        // 0 <- the grid's length, which remains 0
grid.includes('invalid hex')    // false
```

#### Be carefull with bracket notation!

It's possible to add an invalid hex to a grid when using bracket notation:

```javascript
const grid = Grid(Hex())

grid[0]                     // { x: 0, y: 0 }
grid[0] = 'invalid hex'
grid[0]                     // 'invalid hex' ⚠️
```

Use [`Grid#get`](#gridget) and [`Grid#set`](#gridset) instead:

```javascript
const grid = Grid(Hex())

grid.get(0)                 // { x: 0, y: 0 }
grid.set(0, 'invalid hex')
grid.get(0)                 // { x: 0, y: 0 } <- invalid hex is ignored

// Grid#set() also accepts a point:
grid.set({ x: 0, y: 0 }, Hex(-1, 3))
// …as does Grid#get():
grid.get([-1, 3])           // { x: -1, y: 3 }
```

### Rendering

Honeycomb comes without the ability to render hexes to screen. Fortunately, it isn't very hard. Especially if you use a dedicated rendering library.

#### With [PixiJS](http://www.pixijs.com/)

```javascript
const app = new PIXI.Application({ transparent: true })
const graphics = new PIXI.Graphics()

const Hex = Honeycomb.extendHex({ size: 5 })
const Grid = Honeycomb.defineGrid(Hex)

document.body.appendChild(app.view)
// set a line style of 1px wide and color #999
graphics.lineStyle(1, 0x999999)

// render 10,000 hexes
Grid.rectangle({ width: 100, height: 100 }).forEach(hex => {
    const point = hex.toPoint()
    // add the hex's position to each of its corner points
    const corners = hex.corners().map(corner => corner.add(point))
    // separate the first from the other corners
    const [firstCorner, ...otherCorners] = corners

    // move the "pen" to the first corner
    graphics.moveTo(firstCorner.x, firstCorner.y)
    // draw lines to the other corners
    otherCorners.forEach(({ x, y }) => graphics.lineTo(x, y))
    // finish at the first corner
    graphics.lineTo(firstCorner.x, firstCorner.y)

    app.stage.addChild(graphics)
})
```

[Try it in JSFiddle](https://jsfiddle.net/Flauwekeul/qmfgey44/).

#### With [SVG.js](http://svgjs.com/)

```javascript
const draw = SVG(document.body)

const Hex = Honeycomb.extendHex({ size: 5 })
const Grid = Honeycomb.defineGrid(Hex)
// get the corners of a hex (they're the same for all hexes created with the same Hex factory)
const corners = Hex().corners()
// an SVG symbol can be reused
const hexSymbol = draw.symbol()
    // map the corners' positions to a string and create a polygon
    .polygon(corners.map(({ x, y }) => `${x},${y}`))
    .fill('none')
    .stroke({ width: 1, color: '#999' })

// render 10,000 hexes
Grid.rectangle({ width: 100, height: 100 }).forEach(hex => {
    const { x, y } = hex.toPoint()
    // use hexSymbol and set its position for each hex
    draw.use(hexSymbol).translate(x, y)
})
```

[Try it in JSFiddle](https://jsfiddle.net/Flauwekeul/0vm2azj2/).

### Hex ↔ Point

Translating a point (pixel) in the grid to the corresponding hex is possible with [`Grid.pointToHex()`](#pointtohex).

```javascript
const Hex = Honeycomb.extendHex({ size: 30 })
const Grid = Honeycomb.defineGrid(Hex)
const grid = Grid.rectangle({ width: 10, height: 10 })

document.addEventListener('click', ({ offsetX, offsetY }) => {
    // convert point to hex (coordinates)
    const hexCoordinates = Grid.pointToHex([offsetX, offsetY])
    // get the actual hex from the grid
    console.log(grid.get(hexCoordinates))
})
```

See a more elaborate example in [JSFiddle](https://jsfiddle.net/Flauwekeul/3bd6sa9r/).

### Grid shapes

Honeycomb offers 4 shape methods: [rectangle](#rectangle), [triangle](#triangle), [hexagon](#hexagon) and [parallelogram](#parallelogram). [Try them out in JSFiddle](https://jsfiddle.net/Flauwekeul/arxo1vqo/).

### Coordinate systems

The standard coordinate system is a [cartesian](https://en.wikipedia.org/wiki/Cartesian_coordinate_system) one. It's intuitive and easy to reason about. A lot of methods internally use a "cube" coordinate system. See [this redblobgames.com blog post](https://www.redblobgames.com/grids/hexagons/#coordinates) for an explanation between the two (he calls the cartesian system "offset coordinates").

Hexes have getters for each of the cube coordinates `q`, `r` and `s`:

```javascript
const Hex = Honeycomb.extendHex()
const hex = Hex(3, 4)

hex.q           // 1
hex.r           // 4
hex.s           // -5

hex.cartesian() // { x: 3, y: 4 }
hex.cube()      // { q: 1, r: 4, s: -5 }
```

There are methods for converting between cartesian and cube:

```javascript
const Hex = Honeycomb.extendHex()
const hex = Hex()

hex.toCube({ x: 3, y: 4 })      // { q: 1, r: 4, s: -5 }
// Hex#toCartesian() doesn't require the s coordinate:
hex.toCartesian({ q: 1, r: 4 }) // { x: 3, y: 4 }
```

> These methods always require coordinates to be passed and don't work on a hex instance, even though they're instance methods. This will be fixed in a future release 🙃

Hexes can also be created from cube coordinates:

```javascript
const Hex = Honeycomb.extendHex()
Hex({ q: 1, r: 4, s: -5 })  // { x: 3, y: 4 }
```

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [Honeycomb](#honeycomb)
    -   [defineGrid](#definegrid)
    -   [extendHex](#extendhex)
    -   [Point](#point)
-   [Grid](#grid)
    -   [concat](#concat)
    -   [copyWithin](#copywithin)
    -   [entries](#entries)
    -   [every](#every)
    -   [fill](#fill)
    -   [filter](#filter)
    -   [find](#find)
    -   [findIndex](#findindex)
    -   [forEach](#foreach)
    -   [get](#get)
    -   [hexesBetween](#hexesbetween)
    -   [includes](#includes)
    -   [indexOf](#indexof)
    -   [join](#join)
    -   [keys](#keys)
    -   [lastIndexOf](#lastindexof)
    -   [map](#map)
    -   [neighborsOf](#neighborsof)
    -   [pop](#pop)
    -   [push](#push)
    -   [reduce](#reduce)
    -   [reduceRight](#reduceright)
    -   [reverse](#reverse)
    -   [set](#set)
    -   [shift](#shift)
    -   [some](#some)
    -   [sort](#sort)
    -   [splice](#splice)
    -   [toLocaleString](#tolocalestring)
    -   [toString](#tostring)
    -   [unshift](#unshift)
    -   [values](#values)
    -   [Hex](#hex)
    -   [hexagon](#hexagon)
    -   [isValidHex](#isvalidhex)
    -   [parallelogram](#parallelogram)
    -   [pointToHex](#pointtohex)
    -   [rectangle](#rectangle)
    -   [triangle](#triangle)
-   [Hex](#hex-1)
    -   [add](#add)
    -   [cartesian](#cartesian)
    -   [cartesianToCube](#cartesiantocube)
    -   [center](#center)
    -   [coordinates](#coordinates)
    -   [corners](#corners)
    -   [cube](#cube)
    -   [cubeToCartesian](#cubetocartesian)
    -   [distance](#distance)
    -   [equals](#equals)
    -   [height](#height)
    -   [isFlat](#isflat)
    -   [isPointy](#ispointy)
    -   [lerp](#lerp)
    -   [nudge](#nudge)
    -   [offset](#offset)
    -   [oppositeCornerDistance](#oppositecornerdistance)
    -   [oppositeSideDistance](#oppositesidedistance)
    -   [orientation](#orientation)
    -   [origin](#origin)
    -   [q](#q)
    -   [r](#r)
    -   [round](#round)
    -   [s](#s)
    -   [set](#set-1)
    -   [size](#size)
    -   [subtract](#subtract)
    -   [toCartesian](#tocartesian)
    -   [toCube](#tocube)
    -   [toPoint](#topoint)
    -   [toString](#tostring-1)
    -   [width](#width)
    -   [thirdCoordinate](#thirdcoordinate)
-   [Point](#point-1)
    -   [add](#add-1)
    -   [divide](#divide)
    -   [multiply](#multiply)
    -   [subtract](#subtract-1)
-   [Instances](#instances)
    -   [grid](#grid-1)
    -   [hex](#hex-2)
    -   [point](#point-2)
-   [Constants](#constants)
    -   [OFFSET](#offset-1)
    -   [ORIENTATION](#orientation-1)
    -   [COMPASS_DIRECTION](#compass_direction)
-   [Other](#other)
    -   [onCreate](#oncreate)

### Honeycomb

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### defineGrid

This function can be used to create [Grid](#grid) factories by passing it a [Hex](#hex) factory.

**Parameters**

-   `Hex` **[Hex](#hex)** A [Hex](#hex) factory.
                                             If nothing is passed, the default Hex factory is used by calling `Honeycomb.extendHex()` internally. (optional, default `Honeycomb.extendHex()`)

**Examples**

```javascript
// create a Grid factory that uses the default Hex Factory:
const Grid = Honeycomb.defineGrid()
const hex = Grid.Hex()
hex.size     // 1

// create your own Hex factory
const CustomHex = Honeycomb.extendHex({ size: 10, custom: '🤓' })
// …and pass it to defineGrid() to create a Grid factory that produces your custom hexes
const CustomGrid = Honeycomb.defineGrid(CustomHex)
const customHex = CustomGrid.Hex()
hex.size     // 10
hex.custom   // 🤓
```

Returns **[Grid](#grid)** A Grid factory.

#### extendHex

This function can be used to create custom hexes by extending the default Hex prototype.

All properties of the object passed to `extendHex()` will be added to the prototype of the resulting [Hex](#hex) factory.
To add properties to individual hexes (instances), pass them to the [Hex](#hex) factory.

**Parameters**

-   `prototype` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** An object that's used as the prototype for all hexes in a grid.
                                     **Warning:** properties in this object will overwrite properties with the same name in the default prototype. (optional, default `{}`)

**Examples**

```javascript
const Hex = Honeycomb.extendHex({
    size: 50,
    orientation: 'flat',
    customProperty: `I'm custom 😃`,
    customMethod() {
        return `${this.customProperty} and called from a custom method 😎`
    }
})
const hex = Hex(5, -1)

hex.coordinates()    // { x: 5, y: -1 }
hex.size             // 50
hex.customProperty   // I'm custom 😃
hex.customMethod()   // I'm custom 😃 and called from a custom method 😎

// every hex created with Hex() shares these properties:
const hex2 = Hex(3, 0)
hex2.size            // 50
hex2.customProperty  // I'm custom 😃

// to set properties on individual hexes, pass them to Hex():
const hex3 = Hex(-2, -1, { instanceProperty: `I'm a unique snowflake 😌` })
hex3.instanceProperty    // I'm a unique snowflake 😌
```

Returns **[Hex](#hex)** A function to produce hexes that are all linked to the same prototype.

#### Point

See [Point](#point).

### Grid

A function to create hex [grid](#grid)s and perform various operations on them.

A Grid factory has several static methods that return [grid](#grid)s of hexes in a certain shape.
It can also be called with 1 or more hexes or an array of hexes to construct/clone a [grid](#grid) containing those hexes.

A [grid](#grid) extends `Array.prototype`, with some methods overwritten and some new methods added.

**Parameters**

-   `arrayOrHex` **([Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[hex](#hex)> | [hex](#hex))?** An array or a hex. Any invalid hexes are filtered out.
-   `hexes` **...[hex](#hex)?** More hexes. Any invalid hexes are filtered out.

**Examples**

```javascript
const Grid = Honeycomb.defineGrid()
// the Hex factory used by the Grid to produce hexes is available as a property
const Hex = Grid.Hex

Grid(Hex(3, -1), Hex(2, 0))      // [{ x: 3, y: -1 }, { x: 2, y: 0 }]
Grid([Hex(3, -1), Hex(2, 0)])    // [{ x: 3, y: -1 }, { x: 2, y: 0 }]

// invalid hexes are filtered out:
Grid('no hex', { x: 3, y: -1 })  // []
Grid(['no hex', Hex(1, -1)])     // [{ x: 1, y: -1 }]

// clone a grid:
const grid = Grid(Hex(), Hex(1), Hex(2))
const clonedGrid = Grid(grid)    // [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }]
grid === clonedGrid              // false
```

Returns **[grid](#grid)** A grid instance containing only valid hexes.

#### concat

Identical to [Array#concat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat).

#### copyWithin

Identical to [Array#copyWithin](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin).

#### entries

Identical to [Array#entries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries).

#### every

Identical to [Array#every](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every).

#### fill

-   Throws **[TypeError](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/TypeError)** It makes no sense for a grid to fill it with arbitrary values, because it should only contain valid hexes.

Returns **[TypeError](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/TypeError)** An error.

#### filter

Identical to [Array#filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter).

#### find

Identical to [Array#find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find).

#### findIndex

Identical to [Array#findIndex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex).

#### forEach

Identical to [Array#forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).

#### get

Get a hex from a grid.

**Parameters**

-   `keyOrPoint` **([number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [point](#point))** An index/key or a point.

**Examples**

```javascript
const Grid = Honeycomb.defineGrid()
const Hex = Grid.Hex
const grid = Grid.rectangle({ width: 2, height: 2 })

grid.get(0)              // { x: 0, y: 0 }
grid.get(Hex(0, 1))      // { x: 0, y: 1 }
grid.get({ x: 0, y: 1 }) // { x: 0, y: 1 }
grid.get([0, 1])         // { x: 0, y: 1 }

grid.get(42)             // undefined
grid.get(Hex(6, -2))     // undefined
```

Returns **[hex](#hex)** The found hex or `undefined`.

#### hexesBetween

-   **See: [redblobgames.com](https://www.redblobgames.com/grids/hexagons/#line-drawing)**

**Parameters**

-   `firstHex` **[hex](#hex)** The first hex.
-   `lastHex` **[hex](#hex)** The last hex.

**Examples**

```javascript
const Grid = Honeycomb.defineGrid()
const Hex = Grid.Hex
const grid = Grid.rectangle({ width: 4, height: 4 })

grid.hexesBetween(Hex(), Hex(3)) // [
                                 //    { x: 0, y: 0 },
                                 //    { x: 0, y: 1 },
                                 //    { x: 1, y: 1 },
                                 //    { x: 2, y: 2 },
                                 //    { x: 3, y: 2 },
                                 //    { x: 3, y: 3 },
                                 // ]
```

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[hex](#hex)>** Array (not a [grid](#grid)) of hexes in a straight line from `firstHex` to (and including) `lastHex`.

#### includes

Identical to [Array#includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes),
but searches the passed hex (which can also be a [point](#point).

**Parameters**

-   `point` **[point](#point)** The coordinates to search for.
-   `fromIndex` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Optional index to start searching. (optional, default `0`)

**Examples**

```javascript
const Grid = Honeycomb.defineGrid()
const Hex = Grid.Hex
const grid = Grid(Hex(0))    // [ { x: 0, y: 0 } ]

grid.includes(Hex(0))        // true
grid.includes([0, 0])        // true
grid.includes(Hex(0), 1)     // false
grid.includes(Hex(5, 7))     // false
```

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Whether the hex is included in the grid.

#### indexOf

Identical to [Array#indexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf),
but accepts a [point](#point) and internally uses [Hex#equals](#hexequals) as a comparator.

**Parameters**

-   `point` **[point](#point)** The coordinates to search for.
-   `fromIndex` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Optional index to start searching.
                                     If negative, it is taken as the offset from the end of the grid. (optional, default `0`)

**Examples**

```javascript
const Grid = Honeycomb.defineGrid()
const Hex = Grid.Hex
const grid = Grid(Hex(0), Hex(1), Hex(0))
// [
//    { x: 0, y: 0 },
//    { x: 1, y: 1 },
//    { x: 0, y: 0 }
// ]

grid.indexOf(Hex(0))     // 0
grid.indexOf([0, 0])     // 0
grid.indexOf(Hex(0), 1)  // 2
grid.indexOf(Hex(5, 7))  // -1
```

Returns **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The index of the found hex (first from the left) or -1 if the hex wasn't found.

#### join

Identical to [Array#join](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join).

#### keys

Identical to [Array#keys](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/keys).

#### lastIndexOf

Identical to [Array#lastIndexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf),
but accepts a [point](#point) and internally uses [Hex#equals](#hexequals) as a comparator.

Because all hexes will have different coordinates in most grids, this method behaves the same as [Grid#indexOf](#gridindexof).
This method might have a slightly better performance if you know the search hex is at the end of the grid.

**Parameters**

-   `point` **[point](#point)** The coordinates to search for.
-   `fromIndex` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Optional index to start searching back from.
                                         If negative, it is taken as the offset from the end of the grid. (optional, default `length-1`)

**Examples**

```javascript
const Grid = Honeycomb.defineGrid()
const Hex = Grid.Hex
const grid = Grid(Hex(0), Hex(1), Hex(0))
// [
//    { x: 0, y: 0 },
//    { x: 1, y: 1 },
//    { x: 0, y: 0 }
// ]

grid.lastIndexOf(Hex(0))     // 2
grid.lastIndexOf([0, 0])     // 2
grid.lastIndexOf(Hex(0), 1)  // 0
grid.lastIndexOf(Hex(5, 7))  // -1
```

Returns **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The last index of the found hex or -1 if the hex wasn't found.

#### map

Identical to [Array#map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).

#### neighborsOf

-   **See: [redblobgames.com](https://www.redblobgames.com/grids/hexagons/#neighbors)**

**Parameters**

-   `hex` **[hex](#hex)** A hex to get 1 or more neighbors from.
-   `directions` **([Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;([COMPASS_DIRECTION](#compass_direction) \| [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number))> | [COMPASS_DIRECTION](#compass_direction) \| [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) | all)** 1 or more directions. Either (an array of) [compass directions](#compass_direction) or numbers or the string `'all'`. (optional, default `all`)
-   `diagonal` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Whether to get the diagonal neighbor. See [redblobgames.com](https://www.redblobgames.com/grids/hexagons/#neighbors-diagonal). (optional, default `false`)

**Examples**

```javascript
const Hex = Honeycomb.extendHex({ orientation: 'pointy' })
const Grid = Honeycomb.defineGrid(Hex)
// conveniently creates a grid consisting of a hex surrounded by 6 hexes:
const grid = Grid.hexagon({ radius: 1 })

// all neighbors:
grid.neighborsOf(Hex())          // [
                                 //    { x: 1, y: 0 },
                                 //    { x: 0, y: 1 },
                                 //    { x: -1, y: 1 },
                                 //    { x: -1, y: 0 },
                                 //    { x: -1, y: -1 },
                                 //    { x: 0, y: -1 },
                                 // ]
// specific neighbor:
grid.neighborsOf(Hex(), 'NW')    // [{ x: -1, y: -1 }]
grid.neighborsOf(Hex(), 4)       // [{ x: -1, y: -1 }]

// multiple neighbors:
grid.neighborsOf(Hex(), ['SE', 'SW'])    // [
                                         //    { x: 0, y: 1 },
                                         //    { x: -1, y: 1 }
                                         // ]

grid.neighborsOf(Hex(), [1, 2])          // [
                                         //    { x: 0, y: 1 },
                                         //    { x: -1, y: 1 }
                                         // ]
// diagonal neighbor:
grid.neighborsOf(Hex(-1, 0), 'E', true)  // [{ x: 0, y: -1 }]

// only returns hexes that exist in the grid:
grid.neighborsOf(Hex(-1, -1), 'NW')      // []
```

-   Throws **[Error](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error)** When no valid hex is passed.
-   Throws **[Error](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error)** When the direction is invalid for the hex.

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[hex](#hex)>** An array of 0 up to 6 neighboring hexes. Only hexes that are present in the grid are returned.

#### pop

Identical to [Array#pop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop).

#### push

Identical to [Array#push](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push),
but filters out any passed invalid hexes.

**Parameters**

-   `hexes` **...[hex](#hex)?** Hexes to add to the end of the grid. Invalid hexes are ignored.

**Examples**

```javascript
const Grid = Honeycomb.defineGrid()
const Hex = Grid.Hex

const grid = Grid(Hex(0))    // [{ x: 0, y: 0 }]
grid.push(Hex(1))            // 2
grid                         // [{ x: 0, y: 0 }, { x: 1, y: 1 }]

grid.push('invalid')         // 2
grid                         // [{ x: 0, y: 0 }, { x: 1, y: 1 }]
```

Returns **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The new length of the grid.

#### reduce

Identical to [Array#reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce).

#### reduceRight

Identical to [Array#reduceRight](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight).

#### reverse

Identical to [Array#reverse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse).

#### set

Replace a hex with another hex. This is a safe alternative to using bracket notation (`grid[0] = 'invalid'`).

If the target hex isn't present in the grid, the new hex is added (using [Grid#push](#gridpush)) to the grid.
If the new hex is invalid, nothing changes.

**Parameters**

-   `keyOrPoint` **([number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [point](#point))** The coordinates of the hex that must be replaced.
-   `newHex` **[hex](#hex)** The replacing hex.

**Examples**

```javascript
const Grid = Honeycomb.defineGrid()
const Hex = Grid.Hex
const grid = Grid(Hex(0, 0)) // [ { x: 0, y: 0 } ]

// replace a hex:
grid.set(0, Hex(1, 1))
grid                         // [ { x: 1, y: 1 } ]
// the target hex can also be a point:
grid.set([1, 1], Hex(2, 2))
grid                         // [ { x: 2, y: 2 } ]

// invalid replace values are ignored:
grid.set(0, 'invalid')
grid                         // [ { x: 2, y: 2 } ]

// when the target hex isn't present in the grid, the replacing hex is added instead:
grid.set({ x: 9, y: 9 }, Hex(3, 3))
grid                         // [ { x: 2, y: 2 }, { x: 3, y: 3 } ]
```

Returns **[grid](#grid)** Itself.

#### shift

Identical to [Array#shift](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift).

#### some

Identical to [Array#some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some).

#### sort

Identical to [Array#sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).

#### splice

Identical to [Array#splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice),
but filters out any passed invalid hexes.

**Parameters**

-   `start` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Index at which to start changing the grid.
-   `deleteCount` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Amount of hexes to delete. (optional, default `length-start`)
-   `hexes` **...[hex](#hex)** The hexes to add to the grid, beginning at the `start`. (optional, default `[]`)

**Examples**

```javascript
const Grid = Honeycomb.defineGrid()
const Hex = Grid.Hex
const grid = Grid.rectangle({ width: 2, height: 1 })
// [
//    { x: 0, y: 0 },
//    { x: 1, y: 0 },
//    { x: 0, y: 1 },
//    { x: 1, y: 1 }
// ]

grid.splice(2)               // [{ x: 0, y: 1 }, { x: 1, y: 1 }] <- deleted hexes
grid                         // [{ x: 0, y: 0 }, { x: 1, y: 0 }] <- leftover hexes

grid.splice(2, 1)            // [{ x: 0, y: 1 }]
grid                         // [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }]

grid.splice(2, 1, Hex(2))    // [{ x: 0, y: 1 }]
grid
// [
//    { x: 0, y: 0 },
//    { x: 1, y: 0 },
//    { x: 2, y: 2 },
//    { x: 1, y: 1 }
// ]
```

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[hex](#hex)>** A grid with the deleted hexes (if any).

#### toLocaleString

Identical to [Array#toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString).

#### toString

Identical to [Array#toString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toString).

#### unshift

Identical to [Array#unshift](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift),
but filters out any passed invalid hexes.

**Parameters**

-   `hexes` **...[hex](#hex)?** Hexes to add to the start of the grid. Invalid hexes are ignored.

**Examples**

```javascript
const Grid = Honeycomb.defineGrid()
const Hex = Grid.Hex

const grid = Grid(Hex(0))    // [{ x: 0, y: 0 }]
grid.unshift(Hex(1))         // 2
grid                         // [{ x: 1, y: 1 }, { x: 0, y: 0 }]

grid.unshift('invalid')      // 2
grid                         // [{ x: 1, y: 1 }, { x: 0, y: 0 }]
```

Returns **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The new length of the grid.

#### values

Identical to [Array#values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/values).

#### Hex

The [Hex](#hex) factory the Grid factory was created with.

#### hexagon

-   **See: [redblobgames.com](https://www.redblobgames.com/grids/hexagons/implementation.html#map-shapes)**

Creates a grid in the shape of a [hexagon](https://en.wikipedia.org/wiki/Hexagon) ⬡.

**Parameters**

-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** An options object.
    -   `options.radius` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The radius (in hexes) _excluding_ the center hex.
    -   `options.center` **[hex](#hex)** The center hex.
                                                     Each direction corresponds to a different arrangement of hexes. (optional, default `Hex(0)`)
    -   `options.onCreate` **[onCreate](#oncreate)** Callback that's called for each hex. Defaults to a [no-op](https://en.wikipedia.org/wiki/NOP). (optional, default `no-op`)

Returns **[grid](#grid)** Grid of hexes in a hexagon arrangement.

#### isValidHex

**Parameters**

-   `value` **any** Any value.

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Whether the passed value is a valid hex.

#### parallelogram

-   **See: [redblobgames.com](https://www.redblobgames.com/grids/hexagons/implementation.html#map-shapes)**

Creates a grid in the shape of a [parallelogram](https://en.wikipedia.org/wiki/Parallelogram) ▱.

**Parameters**

-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** An options object.
    -   `options.width` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The width (in hexes).
    -   `options.height` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The height (in hexes).
    -   `options.start` **[hex](#hex)** The start hex. (optional, default `Hex(0)`)
    -   `options.direction` **(`1` \| `3` \| `5`)** The direction (from the start hex) in which to create the shape.
                                                     Each direction corresponds to a different arrangement of hexes. (optional, default `1`)
    -   `options.onCreate` **[onCreate](#oncreate)** Callback that's called for each hex. Defaults to a [no-op](https://en.wikipedia.org/wiki/NOP). (optional, default `no-op`)

Returns **[grid](#grid)** Grid of hexes in a parallelogram arrangement.

#### pointToHex

-   **See: [redblobgames.com](https://www.redblobgames.com/grids/hexagons/#pixel-to-hex)**

Converts the passed [point](#point) to a hex.

**Parameters**

-   `point` **[point](#point)** The point to convert from.

**Examples**

```javascript
const Hex = Honeycomb.extendHex({ size: 50 })
const Grid = Honeycomb.defineGrid(Hex)

Grid.pointToHex({ x: 120, y: 280 })  // { x: 1, y: 4 }
Grid.pointToHex([ 120, 280 ])        // { x: 1, y: 4 }

const Point = Honeycomb.Point
Grid.pointToHex(Point(120, 280))     // { x: 1, y: 4 }
```

Returns **[hex](#hex)** A hex (with rounded coordinates) that contains the passed point.

#### rectangle

-   **See: [redblobgames.com](https://www.redblobgames.com/grids/hexagons/implementation.html#map-shapes)**

Creates a grid in the shape of a [rectangle](https://en.wikipedia.org/wiki/Rectangle) ▭.

**Parameters**

-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** An options object.
    -   `options.width` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The width (in hexes).
    -   `options.height` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The height (in hexes).
    -   `options.start` **[hex](#hex)** The start hex. (optional, default `Hex(0)`)
    -   `options.direction` **([COMPASS_DIRECTION](#compass_direction) \| [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number))** The direction (from the start hex) in which to create the shape.
        Defaults to `0` (`E`) for pointy hexes and `1` (`S`) for flat hexes.
        Each direction corresponds to a different arrangement of hexes. (optional, default `E|S`)
    -   `options.onCreate` **[onCreate](#oncreate)** Callback that's called for each hex. Defaults to a [no-op](https://en.wikipedia.org/wiki/NOP). (optional, default `no-op`)

Returns **[grid](#grid)** Grid of hexes in a rectangular arrangement.

#### triangle

-   **See: [redblobgames.com](https://www.redblobgames.com/grids/hexagons/implementation.html#map-shapes)**

Creates a grid in the shape of a [(equilateral) triangle](https://en.wikipedia.org/wiki/Equilateral_triangle) △.

**Parameters**

-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** An options object.
    -   `options.size` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The side length (in hexes).
    -   `options.start` **[hex](#hex)** The start hex. **Note**: it's not the first hex, but rather a hex relative to the triangle. (optional, default `Hex(0)`)
    -   `options.direction` **(`1` \| `5`)** The direction in which to create the shape. Each direction corresponds to a different arrangement of hexes. In this case a triangle pointing up (`direction: 1`) or down (`direction: 5`) (with pointy hexes) or right (`direction: 1`) or left (`direction: 5`) (with flat hexes).
                                                     Each direction corresponds to a different arrangement of hexes. (optional, default `1`)
    -   `options.onCreate` **[onCreate](#oncreate)** Callback that's called for each hex. Defaults to a [no-op](https://en.wikipedia.org/wiki/NOP). (optional, default `no-op`)

Returns **[grid](#grid)** Grid of hexes in a triangle arrangement.

### Hex

-   **See: [https://www.redblobgames.com/grids/hexagons/#coordinates](redblobgames.com)**

Factory function to create hexes. Use [Honeycomb.extendHex](#honeycombextendhex) to create a Hex factory.

**Parameters**

-   `xOrProps` **([number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) \| [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>)?** The x coordinate,
                                                     **or** an object containing _any_ of the cartesian (`x` and `y`) coordinates and optional custom properties,
                                                     **or** an object containing _all_ of the cube (`q`, `r`, and `s`) coordinates and optional custom properties,
                                                     **or** an array containing _any_ of the cartesian (x and y) coordinates.
    -   `xOrProps.x` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)?** The x coordinate.
    -   `xOrProps.y` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)?** The y coordinate.
-   `y` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)?** The y coordinate.
-   `customProps` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Any custom properties. The coordinates are merged into this object, ignoring any coordinates present in `customProps`. (optional, default `{}`)

**Examples**

```javascript
const Hex = Honeycomb.extendHex()

// passing numbers:
Hex()                        // { x: 0, y: 0 }
Hex(1)                       // { x: 1, y: 1 }
Hex(1, 2)                    // { x: 1, y: 2 }

// passing an object with cartesian coordinates:
Hex({})                      // { x: 0, y: 0 }
Hex({ x: 1 })                // { x: 1, y: 1 }
Hex({ y: 2 })                // { x: 2, y: 2 }
Hex({ x: 1, y: 2 })          // { x: 1, y: 2 }

// passing an object with cube coordinates:
Hex({ q: 1, r: 2, s: -3 })   // { x: 2, y: 2 }
Hex({ q: 1 })                // throws an error because of missing cube coordinates

// passing an array:
Hex([])                      // { x: 0, y: 0 }
Hex([1])                     // { x: 1, y: 1 }
Hex([1, 2])                  // { x: 1, y: 2 }

// custom properties:
Hex(1, 2, { a: 3 })          // { a: 3, x: 1, y: 2 }
Hex({ x: 1, y: 2, a: 3 })    // { a: 3, x: 1, y: 2 }

// cloning a hex:
const someHex = Hex(4, -2)   // { x: 4, y: -2 }
const clone = Hex(someHex)   // { x: 4, y: -2 }
someHex === clone            // false
```

Returns **[hex](#hex)** A hex. It _always_ contains _only_ the cartesian (x and y) coordinates and any custom properties.

#### add

**Parameters**

-   `point` **[point](#point)** The hex (or point) that will be added to the current.

Returns **[hex](#hex)** A _new_ hex where the passed hex's coordinates are added to the current.
                     Any custom properties are copied.

#### cartesian

Alias for [Hex#coordinates](#hexcoordinates).

#### cartesianToCube

**Parameters**

-   `cartesianCoordinates` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** The `x` and `y` cartesian coordinate.
    -   `cartesianCoordinates.x` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The `x` cartesian coordinate.
    -   `cartesianCoordinates.y` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The `y` cartesian coordinate.

**Examples**

```javascript
const Hex = Honeycomb.extendHex()

Hex().cartesianToCube({ x: 4, y: -2 }) // { q: 5, r: -2, s: -3 }
```

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** The hex's cube `q`, `r` and `s` coordinates.

#### center

**Examples**

```javascript
const Hex1 = Honeycomb.extendHex({ size: 10 })
Hex1().center()  // { x: 8.660254037844386, y: 10 }

const Hex2 = Honeycomb.extendHex({ size: 10, origin: [5, 5] })
Hex2().center()  // { x: 3.6602540378443855, y: 5 }
```

Returns **[point](#point)** Point relative to the [hex's origin](#hexorigin).
Note that the default origin is the top left corner, so the default center is
`{ x: hexWidth / 2, y: hexHeight / 2 }`.

#### coordinates

**Examples**

```javascript
const Hex = Honeycomb.extendHex()

Hex().coordinates()      // { x: 0, y: 0 }
Hex(1, 2).coordinates()  // { x: 1, y: 2 }
```

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** The hex's cartesian `x` and `y` coordinates.

#### corners

**Examples**

```javascript
// a hex's origin defaults to its top left corner (as if it's a rectangle)
const Hex1 = Honeycomb.extendHex({ size: 30 })
Hex1().corners() // [
                 //    { x: 51.96152422706631, y: 15 },
                 //    { x: 51.96152422706631, y: 45 },
                 //    { x: 25.980762113533157, y: 60 },
                 //    { x: 0, y: 45 },
                 //    { x: 0, y: 15 },
                 //    { x: 25.980762113533157, y: 0 }
                 // ]

// set the origin to a hex's center
const Hex2 = Honeycomb.extendHex({ size: 30, origin: [25.980762113533157, 30] })
Hex2().corners() // [
                 //    { x: 25.980762113533157, y: -15 },
                 //    { x: 25.980762113533157, y: 15 },
                 //    { x: 0, y: 30 },
                 //    { x: -25.980762113533157, y: 15 },
                 //    { x: -25.980762113533157, y: -15 },
                 //    { x: 0, y: -30 }
                 // ]
```

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[point](#point)>** Array of corner points relative to the [hex's origin](#hexorigin).
Starting at the top right corner for pointy hexes and the right corner for flat hexes.

#### cube

**Examples**

```javascript
const Hex = Honeycomb.extendHex()

Hex().cube()     // { q: 0, r: 0, s: 0 }
Hex(1, 2).cube() // { q: 0, r: 2, s: -2 }
```

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** The hex's cube `q`, `r` and `s` coordinates.

#### cubeToCartesian

**Parameters**

-   `cubeCoordinates` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** At least the `q` and `r` cube coordinates.
    -   `cubeCoordinates.q` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The `q` cube coordinate.
    -   `cubeCoordinates.r` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The `r` cube coordinate.
    -   `cubeCoordinates.s` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)?** The optional `s` cube coordinate.

**Examples**

```javascript
const Hex = Honeycomb.extendHex()

Hex().cubeToCartesian({ q: 1, r: 2, s: -3 }) // { x: 2, y: 2 }
// the `s` coordinate isn't required:
Hex().cubeToCartesian({ q: -3, r: 5 })       // { x: -1, y: 5 }
```

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** The hex's cartesian `x` and `y` coordinates.

#### distance

-   **See: [redblobgames.com](https://www.redblobgames.com/grids/hexagons/#distances)**

**Parameters**

-   `hex` **[hex](#hex)** The last hex (cannot be a [point](#point)).

**Examples**

```javascript
const Hex = Honeycomb.extendHex()

Hex().distance(Hex(1, 0))        // 1
Hex(-2, -2).distance(Hex(4, 1))  // 8
```

Returns **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The amount of hexes from the current to (and excluding) the last hex.

#### equals

**Parameters**

-   `point` **[point](#point)** The hex (or point) whose coordinates will be compared against the current hex.

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Whether the coordinates of the current and the passed point are equal.

#### height

Returns **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The (vertical) height of a hex.

#### isFlat

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Whether hexes have a flat ⬣ orientation.

#### isPointy

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Whether hexes have a pointy ⬢ orientation.

#### lerp

Returns an interpolation between the current hex and the passed hex for a `t` between 0 and 1.
More info on [wikipedia](https://en.wikipedia.org/wiki/Linear_interpolation).

**Parameters**

-   `hex` **[hex](#hex)** The other hex (cannot be a [point](#point)).
-   `t` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** A "parameter" between 0 and 1.

Returns **[hex](#hex)** A new hex (likely with floating point coordinates).
                     Any custom properties are copied.

#### nudge

-   **See: [redblobgames.com](https://www.redblobgames.com/grids/hexagons/#line-drawing)**

Returns **[hex](#hex)** A _new_ hex with a tiny offset from the current hex.
                 Useful for interpolating in a consistent direction.

#### offset

-   **See: OFFSET**

Used to calculate the coordinates of rows for pointy hexes and columns for flat hexes.
Defaults to `-1` (odd offset).
See [OFFSET](#offset) for details.
See [redblobgames.com](https://www.redblobgames.com/grids/hexagons/#coordinates-offset) why this is needed.

#### oppositeCornerDistance

Returns **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The distance between opposite corners of a hex.

#### oppositeSideDistance

Returns **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The distance between opposite sides of a hex.

#### orientation

Either pointy or flat. Defaults to `pointy`.

#### origin

Distance from a hex's top left corner (as if it were a rectange). Defaults to `Point(0)`.
Can be anything the [Honeycomb.Point](#honeycombpoint) factory accepts.
When a [hex is converted to a point](#hextopoint), it is converted to this origin.

#### q

Getter for `q` cube coordinate. Calls [Hex#cartesianToCube](#hexcartesiantocube) internally.

#### r

Getter for `r` cube coordinate. Calls [Hex#cartesianToCube](#hexcartesiantocube) internally.

#### round

-   **See: [redblobgames.com](https://www.redblobgames.com/grids/hexagons/#rounding)**

Rounds the current floating point hex coordinates to their nearest integer hex coordinates.

**Examples**

```javascript
const Hex = Honeycomb.extendHex()
Hex(3.1415, 0.5).round() // { x: 3, y: 1 }
```

Returns **[hex](#hex)** A _new_ hex with rounded coordinates.
                 Any custom properties are copied.

#### s

Getter for `s` cube coordinate. Calls [Hex#cartesianToCube](#hexcartesiantocube) internally.

#### set

**Parameters**

-   `coordinates` **any** Same parameters as the [Hex](#hex) factory.

**Examples**

```javascript
const Hex = Honeycomb.extendHex()

const hex = Hex({ x: 1, y: 2, a: 3, b: 4 })          // { a: 3, b: 4, x: 1, y: 2 }
const updatedHex = hex.set({ x: 0, y: -1, b: 5 })    // { a: 3, b: 5, x: 0, y: -1 }
hex === updatedHex                                   // true: hex is updated in-place
```

Returns **[hex](#hex)** Itself with the passed parameters merged into it.

#### size

A hex's radius or the length of any of its sides. Defaults to `1`.

#### subtract

**Parameters**

-   `point` **[point](#point)** The hex (or point) that will be subtracted from the current.

Returns **[hex](#hex)** A _new_ hex where the passed hex's coordinates are subtracted from the current.
                     Any custom properties are copied.

#### toCartesian

Alias for [Hex#cubeToCartesian](#hexcubetocartesian).

#### toCube

Alias for [Hex#cartesianToCube](#hexcartesiantocube).

#### toPoint

**Examples**

```javascript
const Hex = Honeycomb.extendHex({ size: 30 })
Hex().toPoint()          // { x: 0, y: 0 }
Hex(-2, -5).toPoint()    // { x: -77.94228634059947, y: -225 }
```

Returns **[point](#point)** The hex's origin point.

#### toString

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** A string representation of the hex.

#### width

Returns **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The (horizontal) width of a hex.

#### thirdCoordinate

Calculates the third cube coordinate from the other two. The sum of all three coordinates must be 0.

**Parameters**

-   `firstCoordinate` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The first other cube coordinate.
-   `secondCoordinate` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The second other cube coordinate.

**Examples**

```javascript
const Hex = Honeycomb.extendHex()
Hex.thirdCoordinate(3, -2)   // -1
```

Returns **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The third cube coordinate.

### Point

Factory function for creating two-dimensional points.

**Parameters**

-   `pointOrX` **([number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)> | [point](#point))?** The x coordinate or an array with 2 numbers or an object with an `x` and `y` coordinate.
    -   `pointOrX.x` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)?** The x coordinate.
    -   `pointOrX.y` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)?** The y coordinate.
-   `y` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)?** The y coordinate.

**Examples**

```javascript
const Point = Honeycomb.Point

Point()                  // { x: 0, y: 0 }
Point(1)                 // { x: 1, y: 1 }
Point(1, 2)              // { x: 1, y: 2 }

Point([])                // { x: 0, y: 0 }
Point([1])               // { x: 1, y: 1 }
Point([1, 2])            // { x: 1, y: 2 }

Point({})                // { x: 0, y: 0 }
Point({ x: 1 })          // { x: 1, y: 1 }
Point({ y: 2 })          // { x: 2, y: 2 }
Point({ x: 1, y: 2 })    // { x: 1, y: 2 }
```

Returns **[point](#point)** A point.

#### add

**Parameters**

-   `point` **[point](#point)** The point to add to the current point.

Returns **[point](#point)** The sum of the passed point's coordinates to the current point's.

#### divide

**Parameters**

-   `point` **[point](#point)** The point where the current point is divided by.

Returns **[point](#point)** The division of the current point's coordinates and the passed point's.

#### multiply

**Parameters**

-   `point` **[point](#point)** The point to multiply with the current point.

Returns **[point](#point)** The multiplication of the passed point's coordinates and the current point's.

#### subtract

**Parameters**

-   `point` **[point](#point)** The point to subtract from the current point.

Returns **[point](#point)** The difference between the passed point's coordinates and the current point's.

### Instances




#### grid

**Extends Array**

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

**Properties**

-   `length` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Amount of hexes in the grid.

#### hex

An object with x and y properties and several methods in its prototype chain, created by a [Hex](#hex) factory.

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

**Properties**

-   `x` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Cartesian x coordinate.
-   `y` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Cartesian y coordinate.

#### point

An object with just an `x` and a `y` property.

Create your own:

```javascript
const point = { x: 1, y: 2 }
```

Or use the included [Point](#point) factory:

```javascript
const point = Honeycomb.Point(1, 2)
```

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

**Properties**

-   `x` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** (horizontal) x coordinate
-   `y` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** (vertical) y coordinate

### Constants




#### OFFSET

-   **See: [redblobgames.com](https://www.redblobgames.com/grids/hexagons/#coordinates-offset)**

How rows/columns of hexes are placed relative to each other.

An even offset:

-   places **even rows** of **pointy hexes** half a hex right of the odd rows;
-   places **even columns** of **flat hexes** half a hex down of the odd rows;

An odd offset:

-   places **odd rows** of **pointy hexes** half a hex right of the even rows;
-   places **odd columns** of **flat hexes** half a hex down of the even rows;

**Properties**

-   `even` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** \+1
-   `odd` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** \-1

#### ORIENTATION

The different orientations hexes can have.

**Properties**

-   `pointy` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** ⬢
-   `flat` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** ⬣

#### COMPASS_DIRECTION

There's an (approximate) compass direction for each side of a hex. The right side of a pointy hex has the east (`'E'`) compass direction.
The bottom right side the southeast (`'SE'`) direction, etc. This also means that pointy hexes don't have a north and south compass direction
and flat hexes don't have a west and east compass direction.

Number directions map to a side of a hex. A pointy hex's right side is `0`, its bottom right side `1`, its bottom left side `2`, etc.
Number directions of flat hexes start at their bottom right side (`0`), their bottom side is `1`, etc.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

**Properties**

-   `E` **[COMPASS_DIRECTION](#compass_direction)** → east
-   `SE` **[COMPASS_DIRECTION](#compass_direction)** ↘ southeast
-   `S` **[COMPASS_DIRECTION](#compass_direction)** ↓ south
-   `SW` **[COMPASS_DIRECTION](#compass_direction)** ↙ southwest
-   `W` **[COMPASS_DIRECTION](#compass_direction)** ← west
-   `NW` **[COMPASS_DIRECTION](#compass_direction)** ↖ northwest
-   `N` **[COMPASS_DIRECTION](#compass_direction)** ↑ north
-   `NE` **[COMPASS_DIRECTION](#compass_direction)** ↗ northeast

### Other




#### onCreate

Callback of a [Grid](#grid) shape method.
Gets called for each hex that's about to be added to the grid.

Type: [Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)

**Parameters**

-   `hex` **[hex](#hex)** The freshly created hex, just before it's added to the grid.
-   `grid` **[grid](#grid)** The grid (for as far as it's created).

Returns **void** Nothing.

## Backlog

### 🐛 Bugs

### 🚀 Features

1.  Make more methods accept points (instead of hexes). Also: instead of filtering invalid hexes, attempt to convert values to hexes (by passing them to `Hex()`)?
2.  Make some methods getters (e.g. `Hex#width`)?
3.  Hex methods that do nothing with a hex's coordinates should be static (e.g. `cubeToCartesian`, `isPointy`, `width`)?
4.  Make methods that accept points, also accept `x` and `y` as separate parameters?
5.  Maybe make entities immutable?
6.  Make some Grid instance methods also Grid static methods and vice versa?
7.  Add logger that "renders" a grid using `console.log`.
8.  Overwrite `Grid#sort` so it can sort by 1 or more dimensions, ascending/descending (and also accepts a custom comparator)?
9.  Add `Grid.union`, `Grid.subtract`, `Grid.intersect` and `Grid.difference` (or maybe as prototype methods?). [More info](https://www.sketchapp.com/docs/shapes/boolean-operations/).
10. Shiny github.io pages 😎
11. Maybe add possibility to [stretch hexes](http://www.redblobgames.com/grids/hexagons/implementation.html#layout-test-size-tall); they needn't be regularly shaped. This is an [actual request](https://github.com/flauwekeul/honeycomb/issues/1) as well. Might be a problem that needs solvin' in the view (and not in Honeycomb).
12. Maybe `Honeycomb.defineGrid` should accept a prototype too (as a second parameter).
13. Maybe `Honeycomb` should (also) be a function that accepts a hex prototype and returns a Grid factory?
14. Investigate how instance properties are set vs prototype properties. When creating a custom hex it should be possible to set properties that are copied when creating new hexes and properties that only exist in the prototype. Similar to how [stampit](https://github.com/stampit-org/stampit) solves this.
15. Add type definition files? Potential tools: [dts-gen](https://github.com/Microsoft/dts-gen), [dtsmake](https://github.com/ConquestArrow/dtsmake).

### 🛠 Refactorings

1.  Only inject what's needed, instead of whole factories (see `Grid.colSize` for example).
2.  Don't use `this` at all and just inject a context. Functional programming yo 🤓.
