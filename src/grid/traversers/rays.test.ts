import { describe, expect, test, vi } from 'vitest'
import { createHex, createHexPrototype, Hex } from '../../hex'
import { rays } from './rays'

const hexPrototype = createHexPrototype()
const cursor = createHex(hexPrototype, { q: 1, r: 2 })
const getHex = vi.fn((coordinates) => createHex(hexPrototype, coordinates))

describe('when called with only length', () => {
  test('returns a traverser that returns all (unique) hexes around the cursor with radius length', () => {
    const result = [...rays({ length: 2 })(cursor, getHex)]
    expect(result).toMatchObject([
      { q: 1, r: 1 },
      { q: 1, r: 0 },
      { q: 2, r: 1 },
      { q: 2, r: 0 },
      { q: 3, r: 0 },
      { q: 2, r: 2 },
      { q: 3, r: 1 },
      { q: 3, r: 2 },
      { q: 2, r: 3 },
      { q: 1, r: 3 },
      { q: 1, r: 4 },
      { q: 0, r: 4 },
      { q: 0, r: 3 },
      { q: -1, r: 4 },
      { q: -1, r: 3 },
      { q: 0, r: 2 },
      { q: -1, r: 2 },
      { q: 0, r: 1 },
    ])
  })
})

describe('when called with start and length', () => {
  test('returns a traverser that returns all (unique) hexes around and including the start with radius length', () => {
    const result = [...rays({ start: [3, 2], length: 2 })(cursor, getHex)]
    expect(result).toMatchObject([
      { q: 3, r: 2 },
      { q: 3, r: 1 },
      { q: 3, r: 0 },
      { q: 4, r: 1 },
      { q: 4, r: 0 },
      { q: 5, r: 0 },
      { q: 4, r: 2 },
      { q: 5, r: 1 },
      { q: 5, r: 2 },
      { q: 4, r: 3 },
      { q: 3, r: 3 },
      { q: 3, r: 4 },
      { q: 2, r: 4 },
      { q: 2, r: 3 },
      { q: 1, r: 4 },
      { q: 1, r: 3 },
      { q: 2, r: 2 },
      { q: 1, r: 2 },
      { q: 2, r: 1 },
    ])
  })
})

describe('when called with at and length', () => {
  test('returns a traverser that returns all (unique) hexes around the at with radius length', () => {
    const result = [...rays({ at: [1, 4], length: 2 })(cursor, getHex)]
    expect(result).toMatchObject([
      { q: 1, r: 3 },
      { q: 1, r: 2 },
      { q: 2, r: 3 },
      { q: 2, r: 2 },
      { q: 3, r: 2 },
      { q: 2, r: 4 },
      { q: 3, r: 3 },
      { q: 3, r: 4 },
      { q: 2, r: 5 },
      { q: 1, r: 5 },
      { q: 1, r: 6 },
      { q: 0, r: 6 },
      { q: 0, r: 5 },
      { q: -1, r: 6 },
      { q: -1, r: 5 },
      { q: 0, r: 4 },
      { q: -1, r: 4 },
      { q: 0, r: 3 },
    ])
  })
})

describe('updateRay callback', () => {
  test('is called with each ray', () => {
    const updateRay = vi.fn<Hex[], [Hex[]]>((ray) => ray.filter((hex) => hex.q < 1))
    const result = [...rays({ length: 2, updateRay })(cursor, getHex)]

    expect(updateRay.mock.calls).toMatchObject([
      [
        [
          { q: 1, r: 1 },
          { q: 1, r: 0 },
        ],
      ],
      [
        [
          { q: 2, r: 1 },
          { q: 2, r: 0 },
        ],
      ],
      [
        [
          { q: 2, r: 1 },
          { q: 3, r: 0 },
        ],
      ],
      [
        [
          { q: 2, r: 2 },
          { q: 3, r: 1 },
        ],
      ],
      [
        [
          { q: 2, r: 2 },
          { q: 3, r: 2 },
        ],
      ],
      [
        [
          { q: 2, r: 2 },
          { q: 2, r: 3 },
        ],
      ],
      [
        [
          { q: 1, r: 3 },
          { q: 1, r: 4 },
        ],
      ],
      [
        [
          { q: 1, r: 3 },
          { q: 0, r: 4 },
        ],
      ],
      [
        [
          { q: 0, r: 3 },
          { q: -1, r: 4 },
        ],
      ],
      [
        [
          { q: 0, r: 3 },
          { q: -1, r: 3 },
        ],
      ],
      [
        [
          { q: 0, r: 2 },
          { q: -1, r: 2 },
        ],
      ],
      [
        [
          { q: 0, r: 2 },
          { q: 0, r: 1 },
        ],
      ],
    ])
    expect(result).toMatchObject([
      { q: 0, r: 4 },
      { q: 0, r: 3 },
      { q: -1, r: 4 },
      { q: -1, r: 3 },
      { q: 0, r: 2 },
      { q: -1, r: 2 },
      { q: 0, r: 1 },
    ])
  })
})
