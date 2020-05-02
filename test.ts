import { defineGrid, extendHex } from './dist/honeycomb'

interface CustomHex {
  customMethod(): void
}

const Hex = extendHex<CustomHex>({
  size: 10,
  customMethod() {},
})

const hex = Hex()
hex.size
hex.customMethod()

const Grid = defineGrid(Hex)

const grid = Grid.rectangle({ width: 1, height: 1 })
grid[0].size
grid[0].customMethod
