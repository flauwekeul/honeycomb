import { expect, test, vi } from 'vitest'
import { Hex, HexCoordinates } from '../../hex'
import { repeatWith } from './repeatWith'

const cursor: HexCoordinates = [1, 2]
const createHex = (coordinates?: HexCoordinates) => new Hex(coordinates)

test('accepts a source traverser and branch traverser and returns a traverser that returns hexes from the branch traverser repeated for each hex of the source traverser', () => {
  const sourceTraverser = vi.fn(() => [new Hex([0, 0]), new Hex([1, 1])])
  const branchTraverser = vi.fn((_, cursor?: HexCoordinates) => [new Hex(cursor)])
  expect(repeatWith(sourceTraverser, branchTraverser)(createHex, cursor)).toMatchInlineSnapshot(`
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
        "q": 1,
        "r": 1,
      },
      Hex {
        "q": 1,
        "r": 1,
      },
    ]
  `)
})

test('accepts a source traverser, branch traverser and an option to exclude hexes from the source traverser and returns a traverser that returns hexes from the branch traverser repeated for each hex of the source traverser', () => {
  const sourceTraverser = vi.fn(() => [new Hex([0, 0]), new Hex([1, 1])])
  const branchTraverser = vi.fn((_, cursor?: HexCoordinates) => [new Hex(cursor)])
  expect(repeatWith(sourceTraverser, branchTraverser, { includeSource: false })(createHex, cursor))
    .toMatchInlineSnapshot(`
    [
      Hex {
        "q": 0,
        "r": 0,
      },
      Hex {
        "q": 1,
        "r": 1,
      },
    ]
  `)
})
