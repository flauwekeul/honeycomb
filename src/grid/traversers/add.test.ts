import { createHexPrototype, Hex } from '../../hex'
import { Grid } from '../grid'
import { add } from './add'

test('accepts coordinates and returns a traverser that returns the hex with those coordinates', () => {
  const grid = new Grid(createHexPrototype())

  expect(add({ q: 1, r: 2 }, { q: 3, r: 4 })({} as Hex, grid.getHex)).toMatchObject([
    { q: 1, r: 2 },
    { q: 3, r: 4 },
  ])
})
