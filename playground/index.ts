// don't import from '../src' because it's not optimized for performance
import { createHex, createHexPrototype, Hex, HexCoordinates, rectangle } from '../dist'
import { createSuite } from './benchmark'
import { render } from './render'

interface CustomHex extends Hex {
  custom: string
}

const hexPrototype = createHexPrototype<CustomHex>({
  dimensions: 30,
  orientation: 'pointy',
  origin: 'topLeft',
})
// const hex = createHex(hexPrototype, { q: 4, r: 3 })

const start: HexCoordinates = [0, 2]
const cursor: HexCoordinates = [0, 0]
// const grid = line({ stop: [3, 3] })((c) => createHex(hexPrototype, c))
const grid = rectangle({ start, width: 10, height: 10 })((c) => createHex(hexPrototype, c))

/**
 * todo: add integration tests for concatenating traversers
 * todo: traverser should adhere to rules:
 * - when a cursor is passed, but no start: skip the first hex (doesn't apply to all traversers)
 * - max iteration (with sensible default) to prevent infinite loops
 *
 * grid.clone(transformer, grid.traverse()?): newGrid -> grid.clone() only clones the grid, a transformer like map(cloneHex) is needed to also clone the hexes
 * ?? add to grid (ignore existing hexes, this should be able with grid.update(reject(h => grid.has(h))), otherGrid)
 * ?? subtract from grid
 */

for (const hex of grid) {
  render(hex)
}

createSuite().add('', function () {
  /* */
})
