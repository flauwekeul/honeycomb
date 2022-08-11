import { describe, expect, test, vi } from 'vitest'
import { CompassDirection } from '../../compass'
import { Hex, HexCoordinates } from '../../hex'
import { rectangle } from './rectangle'

const cursor = new Hex([1, 2])
const createHex = vi.fn((coordinates?: HexCoordinates) => new Hex(coordinates))

describe('when called with width and height', () => {
  describe('without cursor', () => {
    test('returns a traverser that returns hexes in a rectangular shape starting at [0, 0]', () => {
      expect(rectangle({ width: 2, height: 2 })(createHex)).toMatchInlineSnapshot(`
        [
          Hex {
            "q": 0,
            "r": 0,
          },
          Hex {
            "q": 1,
            "r": 0,
          },
          Hex {
            "q": 0,
            "r": 1,
          },
          Hex {
            "q": 1,
            "r": 1,
          },
        ]
      `)
    })
  })

  describe('with cursor', () => {
    test('returns a traverser that returns hexes in a rectangular shape starting at the cursor, excluding the cursor', () => {
      expect(rectangle({ width: 2, height: 2 })(createHex, cursor)).toMatchInlineSnapshot(`
        [
          Hex {
            "q": 2,
            "r": 2,
          },
          Hex {
            "q": 1,
            "r": 3,
          },
          Hex {
            "q": 2,
            "r": 3,
          },
        ]
      `)
    })
  })
})

describe('when called with width, height and start', () => {
  describe('without cursor', () => {
    test('returns a traverser that returns hexes in a rectangular shape starting at start', () => {
      expect(rectangle({ width: 2, height: 2, start: [1, 2] })(createHex)).toMatchInlineSnapshot(`
        [
          Hex {
            "q": 1,
            "r": 2,
          },
          Hex {
            "q": 2,
            "r": 2,
          },
          Hex {
            "q": 1,
            "r": 3,
          },
          Hex {
            "q": 2,
            "r": 3,
          },
        ]
      `)
    })
  })

  describe('with cursor', () => {
    test('returns a traverser that returns hexes in a rectangular shape starting at start', () => {
      expect(rectangle({ width: 2, height: 2, start: [1, 2] })(createHex, cursor)).toMatchInlineSnapshot(`
        [
          Hex {
            "q": 1,
            "r": 2,
          },
          Hex {
            "q": 2,
            "r": 2,
          },
          Hex {
            "q": 1,
            "r": 3,
          },
          Hex {
            "q": 2,
            "r": 3,
          },
        ]
      `)
    })
  })
})

describe('when called with width, height and direction', () => {
  describe('without cursor', () => {
    test('returns a traverser that returns hexes in a rectangular shape in the given direction starting at [0, 0]', () => {
      expect(rectangle({ width: 2, height: 2, direction: CompassDirection.S })(createHex)).toMatchInlineSnapshot(`
        [
          Hex {
            "q": 0,
            "r": 0,
          },
          Hex {
            "q": 0,
            "r": 1,
          },
          Hex {
            "q": -1,
            "r": 0,
          },
          Hex {
            "q": -1,
            "r": 1,
          },
        ]
      `)
    })
  })

  describe('with cursor', () => {
    test('returns a traverser that returns hexes in a rectangular shape in the given direction starting at the cursor, excluding the cursor', () => {
      expect(rectangle({ width: 2, height: 2, direction: CompassDirection.S })(createHex, cursor))
        .toMatchInlineSnapshot(`
        [
          Hex {
            "q": 1,
            "r": 3,
          },
          Hex {
            "q": 0,
            "r": 2,
          },
          Hex {
            "q": 0,
            "r": 3,
          },
        ]
      `)
    })
  })
})

describe('when called with opposing corners', () => {
  describe('without cursor', () => {
    test('returns a traverser that returns hexes in a rectangular shape from one corner to the other, inclusive', () => {
      expect(rectangle([1, 4], [3, 3])(createHex)).toMatchInlineSnapshot(`
        [
          Hex {
            "q": 1,
            "r": 4,
          },
          Hex {
            "q": 2,
            "r": 3,
          },
          Hex {
            "q": 2,
            "r": 4,
          },
          Hex {
            "q": 3,
            "r": 3,
          },
        ]
      `)
    })
  })

  describe('with cursor', () => {
    test('returns a traverser that returns hexes in a rectangular shape from one corner to the other, ignoring the cursor', () => {
      expect(rectangle([0, -1], [0, 0])(createHex, cursor)).toMatchInlineSnapshot(`
        [
          Hex {
            "q": 0,
            "r": -1,
          },
          Hex {
            "q": 1,
            "r": -1,
          },
          Hex {
            "q": -1,
            "r": 0,
          },
          Hex {
            "q": 0,
            "r": 0,
          },
        ]
      `)
    })
  })
})
