import { map } from 'transducist'
import { Compass, concat, createHexPrototype, fromCoordinates, Grid, Hex, line, move, repeat } from '../src'
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

const grid = new Grid(hexPrototype, [
  fromCoordinates([2, 0]),
  repeat(
    2,
    concat(
      line({ length: 4, direction: Compass.E }),
      move(Compass.S),
      line({ length: 4, direction: Compass.W }),
      move(Compass.S),
    ),
  ),
  line({ length: 4, direction: Compass.E }),
])

/**
 * todo: decide between update(grid.traverse(), transformer) and grid.update(transformer, grid.traverse()?)
 * todo: traverser should adhere to rules:
 * - max iteration (with sensible default) to prevent infinite loops
 *
 * update(grid, transformer): void                          -> transduce(grid, transformer, grid)
 * update(grid.traverse(), transformer): void
 * clone(grid, transformer?): newGrid                       -> transduce(grid, transformer, toGrid)
 * clone(grid.traverse(), transformer?): newGrid
 * ?? merge(grid, otherGrid, transformer?): void            -> transduce(otherGrid, transformer, grid)
 * ?? merge(grid.traverse(), otherGrid, transformer?): void
 *
 * or:
 * grid.update(transformer, traverser?): grid
 * grid.clone(transformer, traverser?): newGrid -> grid.clone() only clones the grid, a transformer like map(cloneHex) is needed to also clone the hexes
 * ?? merge(grid, otherGrid): grid
 * ?? add to grid
 * ?? subtract from grid
 */

grid.update(
  map((h) => {
    const c = h.clone()
    c.custom = 'custom'
    return c
  }),
  grid.traverse(line({ length: 10, direction: Compass.E })),
)
// grid.toArray().forEach((h) => console.log(h))

for (const hex of grid) {
  render(hex)
}

createSuite().add('', function () {
  /* */
})
