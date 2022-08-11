import { describe, expect, test } from 'vitest'
import { CompassDirection } from '../../compass'
import { defineHex, Hex, Orientation } from '../../hex'
import { neighborOf } from './neighborOf'

test('returns a hex', () => {
  const hex = new Hex()
  expect(neighborOf(hex, CompassDirection.E)).toBeInstanceOf(Hex)
})

describe('pointy hexes', () => {
  test(`returns the neighboring hex in unambiguous directions (bordering on the hex's side)`, () => {
    const PointyHex = defineHex({ orientation: Orientation.POINTY })
    const pointyHex = new PointyHex([1, 2])

    expect(neighborOf(pointyHex, CompassDirection.NE)).toStrictEqual(new PointyHex({ q: 2, r: 1 }))
    expect(neighborOf(pointyHex, CompassDirection.E)).toStrictEqual(new PointyHex({ q: 2, r: 2 }))
    expect(neighborOf(pointyHex, CompassDirection.SE)).toStrictEqual(new PointyHex({ q: 1, r: 3 }))
    expect(neighborOf(pointyHex, CompassDirection.SW)).toStrictEqual(new PointyHex({ q: 0, r: 3 }))
    expect(neighborOf(pointyHex, CompassDirection.W)).toStrictEqual(new PointyHex({ q: 0, r: 2 }))
    expect(neighborOf(pointyHex, CompassDirection.NW)).toStrictEqual(new PointyHex({ q: 1, r: 1 }))
  })

  test(`returns the neighboring hex in ambiguous directions (N and S) for a hex with a negative offset`, () => {
    const PointyNegativeOffsetHex = defineHex({ orientation: Orientation.POINTY, offset: -1 })
    const evenRowHex = new PointyNegativeOffsetHex([1, 2])
    const oddRowHex = new PointyNegativeOffsetHex([0, 3])

    expect(neighborOf(evenRowHex, CompassDirection.N)).toStrictEqual(new PointyNegativeOffsetHex({ q: 2, r: 1 }))
    expect(neighborOf(evenRowHex, CompassDirection.S)).toStrictEqual(new PointyNegativeOffsetHex({ q: 1, r: 3 }))
    expect(neighborOf(oddRowHex, CompassDirection.N)).toStrictEqual(new PointyNegativeOffsetHex({ q: 0, r: 2 }))
    expect(neighborOf(oddRowHex, CompassDirection.S)).toStrictEqual(new PointyNegativeOffsetHex({ q: -1, r: 4 }))
  })

  test(`returns the neighboring hex in ambiguous directions (N and S) for a hex with a positive offset`, () => {
    const PointyPositiveOffsetHex = defineHex({ orientation: Orientation.POINTY, offset: 1 })
    const evenRowHex = new PointyPositiveOffsetHex([1, 2])
    const oddRowHex = new PointyPositiveOffsetHex([0, 3])

    expect(neighborOf(evenRowHex, CompassDirection.N)).toStrictEqual(new PointyPositiveOffsetHex({ q: 1, r: 1 }))
    expect(neighborOf(evenRowHex, CompassDirection.S)).toStrictEqual(new PointyPositiveOffsetHex({ q: 0, r: 3 }))
    expect(neighborOf(oddRowHex, CompassDirection.N)).toStrictEqual(new PointyPositiveOffsetHex({ q: 1, r: 2 }))
    expect(neighborOf(oddRowHex, CompassDirection.S)).toStrictEqual(new PointyPositiveOffsetHex({ q: 0, r: 4 }))
  })
})

describe('flat hexes', () => {
  test(`returns the neighboring hex in unambiguous directions (bordering on the hex's side)`, () => {
    const FlatHex = defineHex({ orientation: Orientation.FLAT })
    const flatHex = new FlatHex([1, 2])

    expect(neighborOf(flatHex, CompassDirection.N)).toStrictEqual(new FlatHex({ q: 1, r: 1 }))
    expect(neighborOf(flatHex, CompassDirection.NE)).toStrictEqual(new FlatHex({ q: 2, r: 1 }))
    expect(neighborOf(flatHex, CompassDirection.SE)).toStrictEqual(new FlatHex({ q: 2, r: 2 }))
    expect(neighborOf(flatHex, CompassDirection.S)).toStrictEqual(new FlatHex({ q: 1, r: 3 }))
    expect(neighborOf(flatHex, CompassDirection.SW)).toStrictEqual(new FlatHex({ q: 0, r: 3 }))
    expect(neighborOf(flatHex, CompassDirection.NW)).toStrictEqual(new FlatHex({ q: 0, r: 2 }))
  })

  test(`returns the neighboring hex in ambiguous directions (E and W) for a hex with a negative offset`, () => {
    const FlatNegativeOffsetHex = defineHex({ orientation: Orientation.FLAT, offset: -1 })
    const evenColHex = new FlatNegativeOffsetHex([2, 0])
    const oddColHex = new FlatNegativeOffsetHex([1, 1])

    expect(neighborOf(evenColHex, CompassDirection.E)).toStrictEqual(new FlatNegativeOffsetHex({ q: 3, r: 0 }))
    expect(neighborOf(evenColHex, CompassDirection.W)).toStrictEqual(new FlatNegativeOffsetHex({ q: 1, r: 1 }))
    expect(neighborOf(oddColHex, CompassDirection.E)).toStrictEqual(new FlatNegativeOffsetHex({ q: 2, r: 0 }))
    expect(neighborOf(oddColHex, CompassDirection.W)).toStrictEqual(new FlatNegativeOffsetHex({ q: 0, r: 1 }))
  })

  test(`returns the neighboring hex in ambiguous directions (E and W) for a hex with a positive offset`, () => {
    const FlatPositiveOffsetHex = defineHex({ orientation: Orientation.FLAT, offset: 1 })
    const evenColHex = new FlatPositiveOffsetHex([2, 0])
    const oddColHex = new FlatPositiveOffsetHex([1, 1])

    expect(neighborOf(evenColHex, CompassDirection.E)).toStrictEqual(new FlatPositiveOffsetHex({ q: 3, r: -1 }))
    expect(neighborOf(evenColHex, CompassDirection.W)).toStrictEqual(new FlatPositiveOffsetHex({ q: 1, r: 0 }))
    expect(neighborOf(oddColHex, CompassDirection.E)).toStrictEqual(new FlatPositiveOffsetHex({ q: 2, r: 1 }))
    expect(neighborOf(oddColHex, CompassDirection.W)).toStrictEqual(new FlatPositiveOffsetHex({ q: 0, r: 2 }))
  })
})
