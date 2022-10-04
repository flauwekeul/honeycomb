# Other grid methods

This page lists some properties/methods of a grid instance that can be very convenient. For all properties of grids, see the [API docs](/api/classes/Grid).

## [`getHex()`](/api/classes/Grid#getHex)

It returns the hex in the grid from the passed hex coordinates or `undefined` if the hex doesn't exist in the grid.

```typescript
const grid = new Grid(Hex, rectangle({ width: 5, height: 5 }))
grid.getHex([0, 0])             // Hex {q: 0, r: 0}
grid.getHex({ col: 4, row: 4 }) // Hex {q: 2, r: 4}
grid.getHex([20, 30])           // undefined
```

## [`setHexes()`](/api/classes/Grid#setHexes)

This can be used to update (the hexes in) a grid. It accepts an [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol) of hex coordinates or hexes, and sets those hexes. Hexes that weren't present in the grid before are added.

```typescript
class Tile extends defineHex({ dimensions: 30 }) {
  terrain!: Terrain
}

const grid = new Grid(Tile, rectangle({ width: 5, height: 5 }))

const tilesWithTerrain = grid.map((tile) => {
  return { ...tile, terrain: createTerrain(tile) } as Tile
})

grid.setHexes(tilesWithTerrain)
```

Lines 7-11 above could be simplified (at the expense of mutating `grid` in-place) with `forEach()`:

```typescript
grid.forEach((tile) => {
  tile.terrain = createTerrain(tile)
})
```

## [`pointToHex()`](/api/classes/Grid#pointToHex)

When you need to map a point to a hex in a grid, `pointToHex()` is what you should use. See [Point → hex](/guide/point-to-hex) for an example.

## [`distance()`](/api/classes/Grid#distance)

The `distance()` method returns the distance (in hexes) between the two passed hex coordinates (excluding the first hex, including the last hex). Just like `pointToHex()`, it accepts a third argument to indicate if only hexes in the grid are allowed (defaults to `false`).

```typescript
const grid = new Grid(Hex, rectangle({ width: 5, height: 5 }))
grid.distance([0, 1], [4, 1])   // 4
grid.distance([-1, 3], [10, 0]) // 11
grid.distance([-1, 3], [10, 0], { allowOutside: false }) // undefined
```

## [`neighborOf()`](/api/classes/Grid#neighborOf)

This method returns the adjacent hex from hex coordinates in a particular direction. When the direction is ambiguous (North and South for pointy hexes, West and East for flat hexes), the neighboring hex is chosen based on the [offset setting](/api/interfaces/HexSettings#offset). It accepts an optional `{ allowOutside }` option to limit the result to hexes in the grid.

```typescript
const grid = new Grid(Hex, rectangle({ width: 5, height: 5 }))
grid.neighborOf([1, 2], Direction.SW) // Hex {q: 0, r: 3}
grid.neighborOf([1, 2], Direction.N)  // Hex {q: 2, r: 1}
grid.neighborOf([2, 4], Direction.E, { allowOutside: false }) // undefined
```
