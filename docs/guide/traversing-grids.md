# Traversing grids

The order in which hexes in a grid are iterated is the same as the order in which they were added to the grid. And because a grid represents a 2D map of hexes in contrast with a 1D list of things (like an array), it makes sense to iterate over a *portion* of the grid and in a *specific order*. This is why Honeycomb has traversers.

## What is a traverser?

A [traverser](/api/#Traverser) is a function that *produces* hexes in a specific order. When passed to a grid's `traverse()` method, it's a powerful way to iterate over a subset of hexes in a grid in a specific order.

::: details
More specifically, a traverser is a function that accepts a *hex factory* and an optional *cursor* and returns an iterable of hexes:

```typescript
type Traverser = (
  // hex factory: a function that creates a hex
  createHex: (coordinates?: HexCoordinates) => Hex,
  // cursor: so that the next traverser knows where to continue traversing
  cursor?: HexCoordinates,
) => Iterable<Hex>
```
:::

An example:

```typescript
const Hex = defineHex({ dimensions: 30 })
const grid = new Grid(Hex, rectangle({ width: 5, height: 5 }))
const spiralTraverser = spiral({ start: [0, 2], radius: 1 })

grid.traverse(spiralTraverser)
```

* Line 2: create a rectangular grid of 5⨉5 hexes.
* Line 3: create a traverser with the built-in `spiral()` function (`spiral()` *returns* a traverser). The spiral starts at the hex with coordinates `[0, 2]` and runs outward until its radius of 1 hex (excluding the center hex) is reached for a total of 7 hexes.
* Line 5: [`grid.traverse()`](/api/classes/Grid#traverse) internally calls `spiralTraverser` and loops over the hexes it produces. Only the hexes that are present in `grid` are returned in a new grid. In this example all hexes produced by the traverser are also present in `grid`.

This can be visualized like so:

<TileGrid :grid="grid" :traversal="spiral1" />

When the radius is increased from `1` to `2` it becomes apparent that only the hexes present in `grid` are traversed. You see that the traversal "jumps" from `[-2, 4]` to `[0, 0]`:

<TileGrid :grid="grid" :traversal="spiral2" />

After `[-2, 4]` the traverser would've wanted to go to `[-2, 3]` (North West of `[-2, 4]`) and then to `[-2, 2]` (another step NW), but these hexes don't exist in `grid` and are skipped. That's until `[0, 0]` is traversed, which *is* present and that also happens to finish the spiral.

## Bail a traversal

`grid.traverse()` accepts a second parameter that stops traversing when the traverser produces a hex that's not present in the grid.

```typescript
grid.traverse(spiralTraverser, { bail: true })
```

<TileGrid :grid="grid" :traversal="spiral3" />

Note that it didn't "jump" from `[-2, 4]` to `[0, 0]` this time. After `[-2, 4]` the traverser would've wanted to go to `[-2, 3]` (which is North West of `[-2, 4]` and not present in `grid`) and bailed.

## Combining traversers

Any function or method that accepts a traverser, also accepts an array of traversers. This makes it possible to create more complex traversals. For example, you could traverse a 5⨉5 grid with the outline of a square:

```typescript
const grid = new Grid(Hex, rectangle({ width: 5, height: 5 }))
const squareOutlineTraverser = [
  line({ direction: Direction.E, length: 4 }),
  line({ direction: Direction.S, length: 3 }),
  line({ direction: Direction.W, length: 3 }),
  line({ direction: Direction.N, length: 3 }),
]

grid.traverse(squareOutlineTraverser)
```

<TileGrid :grid="grid" :traversal="squareOutline1" />

Note that `line()` is never called with a `start` option. Most functions that create traversers, including `line()` and `rectangle()`, accept a `start` option. But it's optional. When it's not passed it either starts where the previous traverser left off (this happens on lines 4, 5, and 6 in the example above, that's why they have a length of `3`). Or if it's the first traverser (line 3 in the example above), `start` defaults to `[0, 0]`.

This is what happens when `start: [1, 1]` is passed to the first `line()`:

```typescript{2}
const squareOutlineTraverser = [
  line({ start: [1, 1], direction: Direction.E, length: 4 }),
  line({ direction: Direction.S, length: 3 }),
  line({ direction: Direction.W, length: 3 }),
  line({ direction: Direction.N, length: 3 }),
]
grid.traverse(squareOutlineTraverser)
```

<TileGrid :grid="grid" :traversal="squareOutline2" />

## Built-in traversers

Honeycomb has several functions to create traversers, they are: [`concat()`](#concat), [`fromCoordinates()`](#fromCoordinates), [`line()`](#line), [`move()`](#move), [`rectangle()`](#rectangle), [`repeat()`](#repeat), [`repeatWith()`](#repeatWith), [`ring()`](#ring) and [`spiral()`](#spiral).

### [`concat()`](/api/#concat)

This is mostly used internally to combine (*concatenate*) traversers. Putting some traversers in an array doesn't magically tie them together, that's what `concat()` is for:

```typescript
// this is just an array of traversers:
const traversers = [line({ … }), rectangle({ … })];
// [function lineTraverser() { … }, function rectangleTraverser() { … }]

// this composes them into a single traverser:
concat(traversers) // function concatTraverser() { … }
```

### [`fromCoordinates()`](/api/#fromCoordinates)

Probably the simplest traverser. It accepts any number of hex coordinates and returns a traverser that produces hexes with those coordinates:

```typescript
const someHexes = fromCoordinates(
  [1, 3],
  { q: 4, r: 0 },
  { col: 0, row: 2 }
)
grid.traverse(someHexes)
```

<TileGrid :grid="grid" :traversal="someHexes1" />

### [`line()`](/api/#line)

A line traverser can be created in two ways:

1. With ["vector options"](/api/interfaces/LineAsVectorOptions):

  ```typescript
  const vector = line({ start: [1, 0], direction: Direction.SE, length: 4 })
  grid.traverse(vector)
  ```

  <TileGrid :grid="grid" :traversal="line1" />

  When the direction is ambiguous (North and South for pointy hexes, West and East for flat hexes), the next hex is chosen based on the [offset setting](/api/interfaces/HexSettings#offset).

2. With ["between hexes options"](/api/interfaces/LineBetweenOptions):

  ```typescript
  const lineBetween = line({ start: [2, 0], stop: [1, 4] })
  grid.traverse(lineBetween)
  ```

  <TileGrid :grid="grid" :traversal="line2">
    <Line #before :from="line2.getHex([2, 0])" :to="line2.getHex([1, 4])" />
  </TileGrid>

  This uses interpolation to determine which hexes are on the line.

### [`move()`](/api/#move)

It only accepts a [direction](/api/enums/Direction) and can be used to "move" the cursor a single hex in that direction:

```typescript
const firstHex = fromCoordinates([1, 1])
const moveSouth = move(Direction.S)
const moveEast = move(Direction.E)

grid.traverse([firstHex, moveSouth, moveEast])
```

<TileGrid :grid="grid" :traversal="move1" />

It's equivalent to `line({ direction, length: 1 })` and can be used to make more complex traversers.

When the direction is ambiguous (North and South for pointy hexes, West and East for flat hexes), the hex is chosen based on the [offset setting](/api/interfaces/HexSettings#offset).

### [`rectangle()`](/api/#rectangle)

A rectangle traverser can be created in two ways:

1. With ["rectangle options"](/api/interfaces/RectangleOptions):

  ```typescript
  const square = rectangle({ start: [1, 1], width: 3, height: 3 })
  grid.traverse(square)
  ```

  <TileGrid :grid="grid" :traversal="square1" />

  It's possible to change the direction of the "rows":

  ```typescript{5}
  const square = rectangle({
    start: [0, 3],
    width: 3,
    height: 3,
    direction: Direction.N
  })
  grid.traverse(square)
  ```

  <TileGrid :grid="grid" :traversal="square2" />

  ::: warning
  When you pass an ordinal direction (NE, SE, SW or NW), you get a diamond shape:
  ```typescript{5}
  const square = rectangle({
    start: [0, 2],
    width: 3,
    height: 3,
    direction: Direction.NE
  })
  grid.traverse(square)
  ```
  <TileGrid :grid="grid" :traversal="diamond1" />
  :::

2. With opposing corners:

  ```typescript
  const rect = rectangle([-1, 4], [3, 1])
  grid.traverse(rect)
  ```

  <TileGrid :grid="grid" :traversal="rectangle1" />

### [`repeat()`](/api/#repeat)

Another "helper" traverser. It accepts a number and a traverser (or multiple traversers) to repeat those traverser(s) the given number of times:

```typescript
const fiveStepsSE = repeat(3, move(Direction.SE))
grid.traverse([fromCoordinates([2, 0]), fiveStepsSE])
```

<TileGrid :grid="grid" :traversal="repeat1" />

A more complex example:

```typescript{7}
const rightLeft = [
  line({ direction: Direction.E, length: 2 }),
  move(Direction.S),
  line({ direction: Direction.W, length: 2 }),
  move(Direction.S)
]
const zigZag = repeat(2, rightLeft)

grid.traverse([
  fromCoordinates([1, 0]),
  zigZag,
  line({ direction: Direction.E, length: 2 })
])
```

<TileGrid :grid="grid" :traversal="repeat2" />

### [`repeatWith()`](/api/#repeatWith)

Similar to `repeat()`, this traverser "multiplies" other traversers. However, `repeatWith()` takes a "source traverser" (or multiple "source traversers") and a "branch traverser" (or multiple "branch traversers"). It iterates over the hexes produced by the source traverser(s) and passes them as cursors to the branch traverser(s). The `rectangle()` function internally uses `repeatWith()` like so:

```typescript
const width = 3
const height = 3
const square = repeatWith(
  line({ start: [1, 1], direction: Direction.S, length: height }),
  line({ direction: Direction.E, length: width - 1 }),
)

grid.traverse(square)
```

<TileGrid :grid="grid" :traversal="repeatWith1" />

The source traverser (line 4) is a line going South and for each hex it produces, a line in a perpendicular direction (East) is created. Because the hexes from the source traverser are included, the branch traverser can be one hex shorter. `repeatWith()` accepts a third argument to exclude the hexes created by the source traverser(s). Here's the same square, but with `{ includeSource: false }`:

```typescript{4,6}
const width = 3
const height = 3
const square = repeatWith(
  line({ start: [0, 1], direction: Direction.S, length: height }),
  line({ direction: Direction.E, length: width }),
  { includeSource: false },
)

grid.traverse(square)
```

<TileGrid :grid="grid" :traversal="repeatWith2" />

Apart from the added third argument, two other things are different from the previous example. `start` on line 4 is shifted one hex to the West, because no hex from that `line()` is included in the result anymore. And `length` on line 5 can now just be `width`, again, because the first "column" of hexes from the source traverser is missing.

### [`ring()`](/api/#ring)

A ring traverser can be created in two ways:

1. With ["ring options"](/api/interfaces/RingOptions):

  ```typescript
  const someRing = ring({ start: [1, 4], center: [1, 2] })
  grid.traverse(someRing)
  ```

  <TileGrid :grid="grid" :traversal="ring1" />

  The direction of rotation can be changed as well:

  ```typescript
  const ccwRing = ring({
    start: [1, 4],
    center: [1, 2],
    rotation: Rotation.COUNTERCLOCKWISE
  })
  grid.traverse(ccwRing)
  ```

  <TileGrid :grid="grid" :traversal="ring2" />

2. With ["radius options"](/api/interfaces/RingFromRadiusOptions):

  ```typescript
  const radiusRing = ring({ center: [1, 2], radius: 2 })
  grid.traverse(radiusRing)
  ```

  <TileGrid :grid="grid" :traversal="ring3" />

  Note that when passing a radius, it's not possible to control where the ring starts (it'll always start East of the center).

### [`spiral()`](/api/#spiral)

A spiral has one required option: `radius`. But you may want to pass `start` as well. If you don't it'll start where the previous traverser left off, or at `[0, 0]` if there is no previous traverser.

```typescript
const spiralFrom1_2 = spiral({ start: [1, 2], radius: 2 })
grid.traverse(spiralFrom1_2)
```

<TileGrid :grid="grid" :traversal="spiral4" />

Just as with `ring()`, the radius excludes the center. And also just as with `ring()`, the rotation can be counterclockwise:

```typescript
const ccwSpiral = spiral({
  start: [1, 2],
  radius: 2
  rotation: Rotation.COUNTERCLOCKWISE
})
grid.traverse(ccwSpiral)
```

<TileGrid :grid="grid" :traversal="spiral5" />

<script setup lang="ts">
import { defineHex, Direction, fromCoordinates, Grid, line, move, rectangle, repeat, repeatWith, ring, Rotation, spiral } from '../../src';
import Line from '../components/Line.vue';
import TileGrid from '../components/TileGrid.vue';

const Hex = defineHex({ dimensions: 30 })
const grid = new Grid(Hex, rectangle({ width: 5, height: 5 }))
const spiral1 = grid.traverse(spiral({ start: [0, 2], radius: 1 }))
const spiral2 = grid.traverse(spiral({ start: [0, 2], radius: 2 }))
const spiral3 = grid.traverse(spiral({ start: [0, 2], radius: 2 }), { bail: true })
const squareOutline1 = grid.traverse([
  line({ direction: Direction.E, length: 4 }),
  line({ direction: Direction.S, length: 3 }),
  line({ direction: Direction.W, length: 3 }),
  line({ direction: Direction.N, length: 3 }),
])
const squareOutline2 = grid.traverse([
  line({ start: [1, 1], direction: Direction.E, length: 4 }),
  line({ direction: Direction.S, length: 3 }),
  line({ direction: Direction.W, length: 3 }),
  line({ direction: Direction.N, length: 3 }),
])
const someHexes1 = grid.traverse(fromCoordinates([1, 3], { q: 4, r: 0 }, { col: 0, row: 2 }))
const line1 = grid.traverse(line({ start: [1, 0], direction: Direction.SE, length: 4 }))
const line2 = grid.traverse(line({ start: [2, 0], stop: [1, 4] }))
const move1 = grid.traverse([fromCoordinates([1, 1]), move(Direction.S), move(Direction.E)])
const square1 = grid.traverse(rectangle({ start: [1, 1], width: 3, height: 3 }))
const square2 = grid.traverse(rectangle({ start: [0, 3], width: 3, height: 3, direction: Direction.N }))
const diamond1 = grid.traverse(rectangle({ start: [0, 2], width: 3, height: 3, direction: Direction.NE }))
const rectangle1 = grid.traverse(rectangle([-1, 4], [3, 1]))
const repeat1 = grid.traverse([fromCoordinates([2, 0]), repeat(3, move(Direction.SE))])
const repeat2 = grid.traverse([
  fromCoordinates([1, 0]),
  repeat(2, [
    line({ direction: Direction.E, length: 2 }),
    move(Direction.S),
    line({ direction: Direction.W, length: 2 }),
    move(Direction.S)
  ]),
  line({ direction: Direction.E, length: 2 })
])
const repeatWith1 = grid.traverse(repeatWith(
  line({ start: [1, 1], direction: Direction.S, length: 3 }),
  line({ direction: Direction.E, length: 2 }),
))
const repeatWith2 = grid.traverse(repeatWith(
  line({ start: [0, 1], direction: Direction.S, length: 3 }),
  line({ direction: Direction.E, length: 3 }),
  { includeSource: false },
))
const ring1 = grid.traverse(ring({ start: [1, 4], center: [1, 2] }))
const ring2 = grid.traverse(ring({ start: [1, 4], center: [1, 2], rotation: Rotation.COUNTERCLOCKWISE }))
const ring3 = grid.traverse(ring({ center: [1, 2], radius: 2 }))
const spiral4 = grid.traverse(spiral({ start: [1, 2], radius: 2 }))
const spiral5 = grid.traverse(spiral({ start: [1, 2], radius: 2, rotation: Rotation.COUNTERCLOCKWISE }))
</script>
