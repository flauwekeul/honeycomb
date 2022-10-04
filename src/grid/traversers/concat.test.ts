import { expect, test, vi } from 'vitest'
import { Hex, HexCoordinates } from '../../hex'
import { concat } from './concat'

const cursor: HexCoordinates = [1, 2]
const createHex = (coordinates?: HexCoordinates) => new Hex(coordinates)

test('accepts a traverser and returns it', () => {
  const traverser = vi.fn()
  expect(concat(traverser)).toBe(traverser)
})

test('accepts multiple traversers in an array and returns a single traverser', () => {
  const traverser = vi.fn((_, cursor?: HexCoordinates) => [new Hex(cursor)])
  expect(concat([traverser, traverser, traverser])(createHex, cursor)).toMatchInlineSnapshot(`
    [
      Hex {
        "q": 1,
        "r": 2,
      },
      Hex {
        "q": 1,
        "r": 2,
      },
      Hex {
        "q": 1,
        "r": 2,
      },
    ]
  `)
})
