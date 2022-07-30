import { describe, expect, test } from 'vitest'
import { CompassDirection } from '../../compass'
import { createHex, createHexPrototype } from '../../hex'
import { neighborOf } from './neighborOf'

test('returns a hex', () => {
  const hexPrototype = createHexPrototype()
  const hex = createHex(hexPrototype)
  const result = neighborOf(hex, CompassDirection.E)

  expect(Object.getPrototypeOf(result)).toBe(hexPrototype)
})

describe('pointy hexes', () => {
  test(`returns the neighboring hex in unambiguous directions (bordering on the hex's side)`, () => {
    const hexPrototype = createHexPrototype({ orientation: 'pointy' })
    const pointyHex = createHex(hexPrototype, { q: 1, r: 2 })

    expect(neighborOf(pointyHex, CompassDirection.NE)).toMatchObject(pointyHex.clone({ q: 2, r: 1 }))
    expect(neighborOf(pointyHex, CompassDirection.E)).toMatchObject(pointyHex.clone({ q: 2, r: 2 }))
    expect(neighborOf(pointyHex, CompassDirection.SE)).toMatchObject(pointyHex.clone({ q: 1, r: 3 }))
    expect(neighborOf(pointyHex, CompassDirection.SW)).toMatchObject(pointyHex.clone({ q: 0, r: 3 }))
    expect(neighborOf(pointyHex, CompassDirection.W)).toMatchObject(pointyHex.clone({ q: 0, r: 2 }))
    expect(neighborOf(pointyHex, CompassDirection.NW)).toMatchObject(pointyHex.clone({ q: 1, r: 1 }))
  })

  test(`returns the neighboring hex in ambiguous directions (N and S) for a hex with a negative offset`, () => {
    const negativeOffsetHexPrototype = createHexPrototype({ orientation: 'pointy', offset: -1 })
    const evenRowHex = createHex(negativeOffsetHexPrototype, { q: 1, r: 2 })
    const oddRowHex = createHex(negativeOffsetHexPrototype, { q: 0, r: 3 })

    expect(neighborOf(evenRowHex, CompassDirection.N)).toMatchObject(evenRowHex.clone({ q: 2, r: 1 }))
    expect(neighborOf(evenRowHex, CompassDirection.S)).toMatchObject(evenRowHex.clone({ q: 1, r: 3 }))
    expect(neighborOf(oddRowHex, CompassDirection.N)).toMatchObject(oddRowHex.clone({ q: 0, r: 2 }))
    expect(neighborOf(oddRowHex, CompassDirection.S)).toMatchObject(oddRowHex.clone({ q: -1, r: 4 }))
  })

  test(`returns the neighboring hex in ambiguous directions (N and S) for a hex with a positive offset`, () => {
    const positiveOffsetHexPrototype = createHexPrototype({ orientation: 'pointy', offset: 1 })
    const evenRowHex = createHex(positiveOffsetHexPrototype, { q: 1, r: 2 })
    const oddRowHex = createHex(positiveOffsetHexPrototype, { q: 0, r: 3 })

    expect(neighborOf(evenRowHex, CompassDirection.N)).toMatchObject(evenRowHex.clone({ q: 1, r: 1 }))
    expect(neighborOf(evenRowHex, CompassDirection.S)).toMatchObject(evenRowHex.clone({ q: 0, r: 3 }))
    expect(neighborOf(oddRowHex, CompassDirection.N)).toMatchObject(oddRowHex.clone({ q: 1, r: 2 }))
    expect(neighborOf(oddRowHex, CompassDirection.S)).toMatchObject(oddRowHex.clone({ q: 0, r: 4 }))
  })
})

describe('flat hexes', () => {
  test(`returns the neighboring hex in unambiguous directions (bordering on the hex's side)`, () => {
    const flatHexPrototype = createHexPrototype({ orientation: 'flat' })
    const flatHex = createHex(flatHexPrototype, { q: 1, r: 2 })

    expect(neighborOf(flatHex, CompassDirection.N)).toMatchObject(flatHex.clone({ q: 1, r: 1 }))
    expect(neighborOf(flatHex, CompassDirection.NE)).toMatchObject(flatHex.clone({ q: 2, r: 1 }))
    expect(neighborOf(flatHex, CompassDirection.SE)).toMatchObject(flatHex.clone({ q: 2, r: 2 }))
    expect(neighborOf(flatHex, CompassDirection.S)).toMatchObject(flatHex.clone({ q: 1, r: 3 }))
    expect(neighborOf(flatHex, CompassDirection.SW)).toMatchObject(flatHex.clone({ q: 0, r: 3 }))
    expect(neighborOf(flatHex, CompassDirection.NW)).toMatchObject(flatHex.clone({ q: 0, r: 2 }))
  })

  test(`returns the neighboring hex in ambiguous directions (E and W) for a hex with a negative offset`, () => {
    const negativeOffsetHexPrototype = createHexPrototype({ orientation: 'flat', offset: -1 })
    const evenColHex = createHex(negativeOffsetHexPrototype, { q: 2, r: 0 })
    const oddColHex = createHex(negativeOffsetHexPrototype, { q: 1, r: 1 })

    expect(neighborOf(evenColHex, CompassDirection.E)).toMatchObject(evenColHex.clone({ q: 3, r: 0 }))
    expect(neighborOf(evenColHex, CompassDirection.W)).toMatchObject(evenColHex.clone({ q: 1, r: 1 }))
    expect(neighborOf(oddColHex, CompassDirection.E)).toMatchObject(oddColHex.clone({ q: 2, r: 0 }))
    expect(neighborOf(oddColHex, CompassDirection.W)).toMatchObject(oddColHex.clone({ q: 0, r: 1 }))
  })

  test(`returns the neighboring hex in ambiguous directions (E and W) for a hex with a positive offset`, () => {
    const positiveOffsetHexPrototype = createHexPrototype({ orientation: 'flat', offset: 1 })
    const evenRowHex = createHex(positiveOffsetHexPrototype, { q: 2, r: 0 })
    const oddRowHex = createHex(positiveOffsetHexPrototype, { q: 1, r: 1 })

    expect(neighborOf(evenRowHex, CompassDirection.E)).toMatchObject(evenRowHex.clone({ q: 3, r: -1 }))
    expect(neighborOf(evenRowHex, CompassDirection.W)).toMatchObject(evenRowHex.clone({ q: 1, r: 0 }))
    expect(neighborOf(oddRowHex, CompassDirection.E)).toMatchObject(oddRowHex.clone({ q: 2, r: 1 }))
    expect(neighborOf(oddRowHex, CompassDirection.W)).toMatchObject(oddRowHex.clone({ q: 0, r: 2 }))
  })
})
