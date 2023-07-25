import { expect, test } from 'vitest'
import { Hex, HexCoordinates } from '../../hex'
import { move } from './move'

const cursor: HexCoordinates = [1, 2]
const createHex = (coordinates?: HexCoordinates) => new Hex(coordinates)

test('accepts a direction and returns a traverser that returns a neighboring hex in that direction from the cursor', () => {
  expect(move('E')(createHex, cursor)).toMatchInlineSnapshot(`
    [
      Hex {
        "q": 2,
        "r": 2,
      },
    ]
  `)
})
