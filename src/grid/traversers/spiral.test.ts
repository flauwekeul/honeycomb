import { describe, expect, test, vi } from 'vitest'
import { Hex, HexCoordinates } from '../../hex'
import { Rotation } from '../types'
import { spiral } from './spiral'

const cursor: HexCoordinates = [1, 2]
const createHex = vi.fn((coordinates?: HexCoordinates) => new Hex(coordinates))

describe('when called with a radius', () => {
  describe('without cursor', () => {
    test('returns a traverser that returns hexes in a spiral starting at [0, 0]', () => {
      expect(spiral({ radius: 2 })(createHex)).toMatchInlineSnapshot(`
        [
          Hex {
            "q": 0,
            "r": 0,
          },
          Hex {
            "q": 1,
            "r": -1,
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
            "q": -1,
            "r": 1,
          },
          Hex {
            "q": -1,
            "r": 0,
          },
          Hex {
            "q": 0,
            "r": -1,
          },
        ]
      `)
    })
  })

  describe('with cursor', () => {
    test('returns a traverser that returns hexes in a spiral starting at the cursor, excluding the cursor', () => {
      expect(spiral({ radius: 1 })(createHex, cursor)).toMatchInlineSnapshot(`
        [
          Hex {
            "q": 2,
            "r": 1,
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
            "q": 0,
            "r": 3,
          },
          Hex {
            "q": 0,
            "r": 2,
          },
          Hex {
            "q": 1,
            "r": 1,
          },
        ]
      `)
    })
  })
})

describe('when called with a radius and start', () => {
  describe('without cursor', () => {
    test('returns a traverser that returns hexes in a spiral starting at start', () => {
      expect(spiral({ radius: 2, start: [1, 0] })(createHex)).toMatchInlineSnapshot(`
        [
          Hex {
            "q": 1,
            "r": 0,
          },
          Hex {
            "q": 2,
            "r": -1,
          },
          Hex {
            "q": 2,
            "r": 0,
          },
          Hex {
            "q": 1,
            "r": 1,
          },
          Hex {
            "q": 0,
            "r": 1,
          },
          Hex {
            "q": 0,
            "r": 0,
          },
          Hex {
            "q": 1,
            "r": -1,
          },
        ]
      `)
    })
  })

  describe('with cursor', () => {
    test('returns a traverser that returns hexes in a spiral starting at start', () => {
      expect(spiral({ radius: 2, start: [1, 1] })(createHex, cursor)).toMatchInlineSnapshot(`
        [
          Hex {
            "q": 1,
            "r": 1,
          },
          Hex {
            "q": 1,
            "r": 0,
          },
          Hex {
            "q": 2,
            "r": 0,
          },
          Hex {
            "q": 2,
            "r": 1,
          },
          Hex {
            "q": 1,
            "r": 2,
          },
          Hex {
            "q": 0,
            "r": 2,
          },
          Hex {
            "q": 0,
            "r": 1,
          },
        ]
      `)
    })
  })
})

describe('when called with a radius and rotation', () => {
  test('returns a traverser that returns hexes in a spiral with the given rotation', () => {
    expect(spiral({ radius: 2, rotation: Rotation.COUNTERCLOCKWISE })(createHex)).toMatchInlineSnapshot(`
      [
        Hex {
          "q": 0,
          "r": 0,
        },
        Hex {
          "q": 1,
          "r": -1,
        },
        Hex {
          "q": 0,
          "r": -1,
        },
        Hex {
          "q": -1,
          "r": 0,
        },
        Hex {
          "q": -1,
          "r": 1,
        },
        Hex {
          "q": 0,
          "r": 1,
        },
        Hex {
          "q": 1,
          "r": 0,
        },
      ]
    `)
  })
})
