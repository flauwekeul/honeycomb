# Coordinate system

> With square grids, there's one obvious way to do it. With hexagons, there are multiple approaches.
>
> — <cite>[redblobgames.com](https://www.redblobgames.com/grids/hexagons/#coordinates)</cite>

## Four types

There are four types of coordinates:

1. **Cube**

  The most verbose type, but also the most explicit. All three coordinates must add up to 0.

  Example: `{ q: 1, r: 2, s: -3 }`.

  Inspired by [redblobgames](https://www.redblobgames.com/grids/hexagons/#coordinates-cube).

2. **Axial**

  The same as cube coordinates, but without the `s` coordinate. `s` is redundant (or any *one* of the coordinates); any combination of `q` and `r` (or any *two* coordinates) still represents a unique hex.

  Example: `{ q: 1, r: 2 }`.

  Inspired by [redblobgames](https://www.redblobgames.com/grids/hexagons/#coordinates-axial).

3. **Offset**

  This system has different coordinates depending on the hex's [`offset` setting](/api/interfaces/HexSettings#offset).

  Example: `{ col: 1, row: 2 }`.

  Inspired by [redblobgames](https://www.redblobgames.com/grids/hexagons/#coordinates-offset).

4. **Tuple**

  The same as cube or axial coordinates, but in a [tuple](https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types)

  Example: `[1, 2]` or `[1, 2, -3]`.

---

Internally, Honeycomb uses axial or cube coordinates mostly. Tuple coordinates are the most terse and convenient, so they're used primarily in the documentation.

You may also find points (e.g.: `{ x: 1, y: 2 }`) in the library. For example, a hex's `corners` property returns an array of the hex's six corner points.

A hex has properties for every type of coordinates (except tuple):

```typescript
const hex = new Hex([1, 2])

hex.q   // 1
hex.r   // 2
hex.s   // -3

hex.col // 2
hex.row // 2
```

Only the cube coordinates can be set, the offset coordinates are readonly.

::: warning
Be careful when setting cube coordinates, because **cube coordinates must always add up to 0**.
```typescript
const hex = new Hex([1, 2])
hex.q = 2
hex.q + hex.r + hex.s // ⚠️ 1, this must always be 0

hex.col = 2 // ❌ TypeError
```
:::

## `HexCoordinates`

Most functions/methods that require coordinates accept `HexCoordinates`, which is a [union type](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types) of the four coordinate types.

Because `HexCoordinates` can be any of the four types, you may use `toCube()` to convert `HexCoordinates` to `CubeCoordinates`:

```typescript
toCube(Hex.prototype, [1, 2])             // { q: 1, r: 2, s: -3 }
toCube(Hex.prototype, { col: 1, row: 2 }) // { q: 0, r: 2, s: -2 }
toCube(Hex.prototype, { s: 3, r: 4 })     // { q: -7, r: 4, s: 3 }
```

## Converting

There are some functions for converting between types of coordinates.

Converting to cube coordinates:

```typescript
offsetToCube(Hex.prototype, { col: 1, row: 2 })  // { q: 0, r: 2, s: -2 }
pointToCube(Hex.prototype, { x: 10, y: 20 })     // { q: -1, r: 13, s: -12 }
tupleToCube([1, 2])                             // { q: 1, r: 2, s: -3 }
```

Converting from a hex to something else:

```typescript
// set a hex's radius or side (they're equal) to 30
const Hex = defineHex({ dimensions: 30 })
const hex = new Hex([1, 2])

hexToOffset(hex)  // { col: 2, row: 2 }
hexToPoint(hex)   // { x: 103.92304845413263, y: 90 }
```
