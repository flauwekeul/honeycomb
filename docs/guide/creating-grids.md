# Creating grids

There are five ways to create a grid.

## `new Grid(Hex)`

Passing a Hex class creates an empty grid:

```typescript
const Hex = defineHex()
const grid = new Grid(Hex)

grid.size // 0
```

## `new Grid(Hex, Traverser)`

A Hex class and a [traverser](/guide/traversing-grids) produces a grid with the hexes produced by the traverser:

```typescript
const Hex = defineHex()
const rectangularGrid = new Grid(Hex, rectangle({ width: 5, height: 5 }))

rectangularGrid.size // 25
```

Like any function that accepts a single traverser, `Grid` also accepts multiple traversers by wrapping them in an array:

```typescript
const Hex = defineHex()
const triangularGrid = new Grid(Hex, [
  line({ stop: [5, 0] }),
  line({ stop: [0, 5] }),
  line({ stop: [0, 1] }),
])

triangularGrid.size // 15
```

## `new Grid(Hex, Iterable)`

A Hex class and an [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol) of hex coordinates produces a grid with hexes created from the coordinates in the iterable. Valid iterables are Arrays, Sets, generators and any object that has a `[Symbol.iterator]()` method.

```typescript
const Hex = defineHex()

const gridFromArray = new Grid(Hex, [[1, 2], [3, 4]])
const gridFromSet = new Grid(Hex, new Set<HexCoordinates>([[1, 2], [3, 4]]))
const gridFromGenerator = new Grid(Hex, generator())

function* generator(): Generator<HexCoordinates> {
  yield [1, 2]
  yield [3, 4]
}

gridFromArray.size      // 2
gridFromSet.size        // 2
gridFromGenerator.size  // 2
```

::: details
The example above uses [tuples](/guide/coordinate-system) for hex coordinates. Some additional typing is needed to "convince" TypeScript that those are in fact tuples and not `number[]`. That's why you see the added `HexCoordinates` type.
:::

## `new Grid(Grid)`

Passing an existing grid to the constructor creates a copy of the grid. Any hexes it contains are *not* copied.

```typescript
const Hex = defineHex()
const grid1 = new Grid(Hex, rectangle({ width: 5, height: 5 }))
const grid2 = new Grid(grid1)

grid1.size      // 25
grid2.size      // 25
grid1 === grid2 // false
grid1.getHex([0, 0]) === grid2.getHex([0, 0]) // true
```

## `Grid.fromIterable(Iterable)`

It's also possible to create a grid with the static method `fromIterable()`. Note that it doesn't accept *hex coordinates* (a grid requires a Hex class, which it can't extract from hex coordinates).

```typescript
const Hex = defineHex()
const hexes = [new Hex([1, 2]), new Hex([3, 4])]

const grid = Grid.fromIterable(hexes)
```
