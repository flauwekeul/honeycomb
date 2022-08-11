import { expect, test } from 'vitest'
import { Hex, HexCoordinates } from '../../hex'
import { fromCoordinates } from './fromCoordinates'

const createHex = (coordinates?: HexCoordinates) => new Hex(coordinates)

test('accepts coordinates and returns a traverser that returns the hexes with those coordinates', () => {
  expect(fromCoordinates([1, 2], [3, 4])(createHex)).toMatchInlineSnapshot(`
    [
      Hex {
        "q": 1,
        "r": 2,
      },
      Hex {
        "q": 3,
        "r": 4,
      },
    ]
  `)
})

test('ignores the cursor', () => {
  expect(fromCoordinates([1, 2], [3, 4])(createHex, [20, 10])).not.toContain(new Hex([20, 10]))
})
