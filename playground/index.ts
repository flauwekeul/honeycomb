import { defineHex, Grid, GridAsJSON, HexCoordinates } from '../src'

class CustomHex extends defineHex() {
  static create(coordinates: HexCoordinates, custom: string) {
    const hex = new CustomHex(coordinates)
    hex.custom = custom
    return hex
  }

  custom!: string
}

const hexes = [
  [0, 0],
  [1, 0],
  [0, 1],
].map((coordinates) => CustomHex.create(coordinates as HexCoordinates, 'custom'))
const grid1 = new Grid(CustomHex, hexes)
const serializedGrid = JSON.stringify(grid1)

// console.log({ serializedGrid })

const deserializedGrid: GridAsJSON<CustomHex> = JSON.parse(serializedGrid)

// console.log({ deserializedGrid })

const grid2 = Grid.fromJSON(deserializedGrid, ({ q, r, custom }) => CustomHex.create([q, r], custom))

console.log(grid2.toArray())
