// don't import from '../src' because it's not optimized for performance
import { createHexPrototype, Grid, Hex, rays } from '../dist'
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
const grid = new Grid(hexPrototype, rays({ start: [7, 4], firstStop: [4, 7] }))

/**
 * todo: change how directions work: with degrees by default? Compass direction converts to degrees, or maybe drop compass direction altogether?
 * todo: after rewriting most traversers, test what generally performs better: when they return either arrays or iterators.
 *       Maybe rewrite tank game project to find out
 * todo: add integration tests for concatenating traversers
 * todo: traverser should adhere to rules:
 * - when a cursor is passed, but no start: skip the first hex (doesn't apply to all traversers)
 *
 * Transforms that make sense: drop(), dropWhile(), filter(), map(), remove(), take(), takeWhile()
 * Reducers that make sense: every(), find(), forEach()?, some(), reduce()
 *
 * grid.clone(transformer, grid.traverse()?): newGrid -> grid.clone() only clones the grid, a transformer like map(cloneHex) is needed to also clone the hexes
 * ?? add to grid (ignore existing hexes, this should be able with grid.update(reject(h => grid.has(h))), otherGrid)
 * ?? subtract from grid
 */

let i = 0
for (const hex of grid) {
  render(hex, i++)
}

createSuite().add('', function () {
  /* */
})
