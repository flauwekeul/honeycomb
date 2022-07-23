import { createHexPrototype, Hex } from '../../hex'
import { Grid } from '../grid'
import { fromCoordinates } from './fromCoordinates'

test('accepts coordinates and returns a traverser that returns the hexes with those coordinates', () => {
  const hexPrototype = createHexPrototype()
  const grid = new Grid(hexPrototype)
  const actual = fromCoordinates({ q: 1, r: 2 }, { q: 3, r: 4 })(grid.createHex, {} as Hex)

  expect(actual).toMatchObject([
    { q: 1, r: 2 },
    { q: 3, r: 4 },
  ])
  actual.forEach((hex) => {
    expect(Object.getPrototypeOf(hex)).toBe(hexPrototype)
  })
})
