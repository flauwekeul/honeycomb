# (De)serializing

In JavaScript, serializing is usually done with [`JSON.stringify()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) and deserializing with [`JSON.parse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse).

## Serializing

`Grid` has a `toJSON()` method that's **automatically called** when passing a grid to `JSON.stringify()`. `toJSON()` returns an object with the [hex settings](/api/interfaces/HexSettings) (dimensions, orientation, origin and offset) and all its hexes. When this object is *stringified* by `JSON.stringify()`, the resulting string contains only the essential information to represent the grid.

:::details
The hexes in the serialized grid only contain instance properties, which by default are each hex's [axial coordinates](/api/interfaces/AxialCoordinates) and any custom properties in case of [custom hexes](/guide/custom-hexes).
:::

```typescript
const Hex = defineHex({ dimensions: 50, orientation: Orientation.FLAT })
const grid = new Grid(Hex, rectangle({ width: 2, height: 2 }))

grid.toJSON()
// {
//    hexSettings: {dimensions: {…}, orientation: 'FLAT', origin: {…}, offset: -1}
//    coordinates: (4) [Hex, Hex, Hex, Hex]
// }

JSON.stringify(grid)
// {"hexSettings":{"dimensions":{"xRadius":50,"yRadius":50},"orientation":"FLAT","origin":{"x":0,"y":0},"offset":-1},"coordinates":[{"q":0,"r":0},{"q":1,"r":0},{"q":0,"r":1},{"q":1,"r":1}]}
```

:::tip
You should rarely need to call `grid.toJSON()` yourself, because it's automatically called when passing the grid to `JSON.stringify()`.
:::

## Deserializing

When you want to turn a string returned by `JSON.stringify(grid)` into a grid again, you have to pass it to `JSON.parse()` first and then to the `fromJSON()` static method of `Grid`:

```typescript
const grid1 = new Grid(Hex, rectangle({ width: 2, height: 2 }))
const serializedGrid = JSON.stringify(grid1)

// JSON.parse() always has `any` as its return type, so it's wise to manually type it
const deserializedGrid: GridAsJSON = JSON.parse(serializedGrid)

// this returns a grid with the same Hex class and hexes as grid1
const grid2 = Grid.fromJSON(deserializedGrid)
```

`Grid.fromJSON()` also accepts an optional function as a 2nd argument that's used to create the hexes in the grid:

```typescript
class CustomHex extends defineHex() {
  static create(coordinates: HexCoordinates, custom: string) {
    const hex = new CustomHex(coordinates)
    hex.custom = custom
    return hex
  }

  custom!: string
}

const hexes = [[0, 0], [1, 0], [0, 1]].map((coordinates) => CustomHex.create(coordinates as HexCoordinates, 'custom'))
const grid1 = new Grid(CustomHex, hexes)

const serializedGrid = JSON.stringify(grid1)

const deserializedGrid: GridAsJSON<CustomHex> = JSON.parse(serializedGrid)
// {
//    hexSettings: …,
//    coordinates: [
//      {
//        "q": 0,
//        "r": 0,
//        "custom": "custom" 👈 custom property
//      },
//      …
//    ]
// }

const grid2 = Grid.fromJSON(deserializedGrid, ({ q, r, custom }) => CustomHex.create([q, r], custom))
grid2.toArray()
// [
//   {
//     "q": 0,
//     "r": 0,
//     "custom": "custom" 👈 custom property is retained through (de)serialization
//   },
//   …
// ]
```
