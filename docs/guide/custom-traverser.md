# Creating your own traverser

::: tip
If you haven't already, please read [Traversing grids](/guide/traversing-grids) first.
:::

A traverser is a function that accepts a hex factory (a function that creates hexes) and an optional cursor hex. That cursor is passed by the previous traverser when traversers are combined. A traverser must return an iterable of hexes. An array is a fine choice in nearly all cases, but a generator is valid too (albeit less performant in most cases).

```typescript
type Traverser = (
  // hex factory: a function that creates a hex
  createHex: (coordinates?: HexCoordinates) => Hex,
  // cursor: so that the next traverser knows where to continue traversing
  cursor?: HexCoordinates,
) => Iterable<Hex>
```

As an example, we're going to pretend the [`spiral()` traverser](/guide/traversing-grids#spiral) doesn't exist yet and we're going to create it ourselves.

## Recreating `spiral()`

I think it's good practice to use an [options object](https://www.codereadability.com/what-are-javascript-options-objects/) once a function accepts three or more arguments. The function we're going to make accepts a (optional) `start`, `radius` and (optional) `rotation`. `start` will be the center of the spiral, unless it's not passed, then `cursor` will be the center, unless that doesn't exist either, then the center will default to `[0, 0]`.

This is the "empty" version of our `spiral()`:

```typescript
import { Hex, HexCoordinates, Rotation, Traverser } from "honeycomb-grid";

interface SpiralOptions {
  start?: HexCoordinates
  radius: number
  rotation?: Rotation
}

function spiral<T extends Hex>(options: SpiralOptions): Traverser<T> {
  return function spiralTraverser(createHex, cursor) {
    return []
  }
}
```

Let's review the code:

* Lines 3-7: the options are defined in the `SpiralOptions` interface
* Line 9: the [generic](https://www.typescriptlang.org/docs/handbook/2/generics.html) `T` is needed for the return type `Traverser<T>`. It's the subtype of `Hex` this traverser will return and it enables custom hexes.
* Line 10: `spiral()` is a function that *returns* a traverser, that's what's happening here.
* Line 11: for now, we're returning an empty array, but here's where we should make the traverser return a spiral of hexes.

Before implementing the core of the traverser it's wise to think about how to best solve the issue. The center hex coordinates are either `start` or `cursor` or `[0, 0]`. Then the algorithm should produce a ring around the center (in the desired `rotation`) and continue producing concentric rings outward until the desired `radius` is reached. Since we need rings, it would be nice if the `ring()` traverser can be used (spoiler: it can!). But how do we make concentric rings? We need a line starting at the center with length `radius` and each hex in the line is the start for a ring. We need to *repeat* *ring*s with a *line*.

Let's update the code to use [`ring()`](/guide/traversing-grids#ring), [`line()`](/guide/traversing-grids#line) and [`repeatWith()`](/guide/traversing-grids#repeatWith).

```typescript{3-8}
function spiral<T extends Hex>(options: SpiralOptions): Traverser<T> {
  return function spiralTraverser(createHex, cursor) {
    const center = start ?? cursor ?? [0, 0]
    const lineTraverser = line({ start, direction: Direction.N, length: radius + 1 })
    const ringTraverser = ring({ center, rotation })
    const repeatRingWithLine = repeatWith<T>(lineTraverser, ringTraverser)

    return repeatRingWithLine(createHex, cursor)
  }
}
```

* Line 3: the `center` coordinates are either `start`, `cursor` or `[0, 0]`.
* Line 4: create a line traverser that starts at `start`, has an arbitrary `direction` and a length of `radius + 1` (because the spiral's radius is without its center).
* Line 5: create a ring traverser with `center` and `rotation`. `repeatWith()` is going to make sure each starts at the right coordinates (by passing a cursor internally).
* Line 6: `repeatWith()` ties the other two traversers together just as we want to: for each hex in the line start a ring at that hex's position.
* Line 8: return the hexes by calling the final traverser, passing `createHex` and `cursor`.

And that's it: we recreated `spiral()`. There's actually one edge-case left that needs fixing: when `spiral()` is called without `start` but with a `cursor`, `line()` will be one hex too long (see [Combining traversers](/guide/traversing-grids#combining-traversers)). So in that specific case, `length` should just be `radius`:

```typescript{4-5}
function spiral<T extends Hex>(options: SpiralOptions): Traverser<T> {
  return function spiralTraverser(createHex, cursor) {
    // ...
    const length = !start && cursor ? radius : radius + 1
    const lineTraverser = line({ start, direction: Direction.N, length })
    // ...
  }
}
```

Most traversers that accept a `start` have these kinds of "exceptions". Because when there's no `start` but there is a `cursor` (`!start && cursor`), the first hex needs to be skipped to *prevent duplicate hexes* when traversers are combined.
