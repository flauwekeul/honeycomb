import { expect, test, vi } from 'vitest'
import { Hex, HexCoordinates } from '../../hex'
import { repeat } from './repeat'

const cursor: HexCoordinates = [1, 2]
const createHex = (coordinates?: HexCoordinates) => new Hex(coordinates)

test('accepts a number and one or more traversers and returns a traverser that repeats the passed traversers', () => {
  const traverser = vi.fn(() => [new Hex()])
  const result = repeat(3, traverser)(createHex, cursor)

  expect(traverser).toBeCalledTimes(3)
  expect(result).toMatchInlineSnapshot(`
    [
      Hex {
        "q": 0,
        "r": 0,
      },
      Hex {
        "q": 0,
        "r": 0,
      },
      Hex {
        "q": 0,
        "r": 0,
      },
    ]
  `)
})
