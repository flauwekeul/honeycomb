# (De)serializing

In JavaScript, serializing is usually done with [`JSON.stringify()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) and deserializing with [`JSON.parse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse).

## Serializing

`Grid` has a `toJSON()` method that's automatically called when passing a grid to `JSON.stringify()`. `toJSON()` returns an object with the [hex settings](/api/interfaces/HexSettings) (dimensions, orientation, origin and offset) and all its hexes. When this object is *stringified* by `JSON.stringify()`, the resulting string contains only the essential information to represent the grid.

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

## Deserializing

When you want to turn a string returned by `JSON.stringify(grid)` into a grid again, you have to pass it to `JSON.parse()` first and then to the `fromJSON()` static method of `Grid`:

```typescript
const grid1 = new Grid(Hex, rectangle({ width: 2, height: 2 }))
const serializedGrid = JSON.stringify(grid1)

const deserializedGrid = JSON.parse(serializedGrid)

// this returns a grid with the same Hex class and hexes as grid1
const grid2 = Grid.fromJSON(deserializedGrid)
```
