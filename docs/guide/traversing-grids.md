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
const Hex = defineHex({ dimensions: 30, origin: 'topLeft' })
const grid = new Grid(Hex, rectangle({ width: 5, height: 5 }))
const spiralTraverser = spiral({ start: [2, 3], radius: 2 })

grid.traverse(spiralTraverser)
```

* Line 2: create a rectangular grid of 5⨉5 hexes.
* Line 3: create a traverser with the built-in `spiral()` function that, once called, returns hexes in a spiral order. The spiral starts at the hex with coordinates `[2, 3]` and runs outward until its radius of 2 hexes (including the center hex) is reached for a total of 7 hexes.
* Line 5: `grid` internally calls `spiralTraverser` and loops over the hexes it produces. Then it gets the hexes that are present in the grid and returns a new grid with only those hexes. In this example all hexes produced by the traverser are also present in the grid.
