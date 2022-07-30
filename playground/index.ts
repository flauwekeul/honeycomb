import { createHexPrototype, Grid, Hex, rectangle } from '../src'
import { render } from './render'

interface CustomHex extends Hex {
  custom: string
}

const hexPrototype = createHexPrototype<CustomHex>({
  dimensions: 30,
  orientation: 'pointy',
  origin: 'topLeft',
})
const grid = new Grid(hexPrototype, rectangle({ width: 10, height: 10 }))

/**
 * todo: change how directions work: with degrees by default? Compass direction converts to degrees, or maybe drop compass direction altogether?
 * todo: add integration tests for concatenating traversers
 * todo: traverser should adhere to rules:
 * - when a cursor is passed, but no start: skip the first hex (doesn't apply to all traversers)
 */

let i = 0
for (const hex of grid) {
  render(hex, i++)
}
