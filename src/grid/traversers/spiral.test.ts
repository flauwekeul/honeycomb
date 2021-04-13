import { createHex, createHexPrototype } from '../../hex'
import { spiral } from './spiral'

const hexPrototype = createHexPrototype()
const getHex = jest.fn((coordinates) => createHex(hexPrototype, coordinates))
const cursor = createHex(hexPrototype, { q: 1, r: 2 })

describe('when called with a radius', () => {
  test('returns a traverser that returns hexes in a spiral around but excluding the cursor', () => {
    expect(spiral({ radius: 2 })(cursor, getHex)).toEqual([
      cursor.clone({ q: 2, r: 1 }),
      cursor.clone({ q: 2, r: 2 }),
      cursor.clone({ q: 1, r: 3 }),
      cursor.clone({ q: 0, r: 3 }),
      cursor.clone({ q: 0, r: 2 }),
      cursor.clone({ q: 1, r: 1 }),
      cursor.clone({ q: 2, r: 0 }),
      cursor.clone({ q: 3, r: 0 }),
      cursor.clone({ q: 3, r: 1 }),
      cursor.clone({ q: 3, r: 2 }),
      cursor.clone({ q: 2, r: 3 }),
      cursor.clone({ q: 1, r: 4 }),
      cursor.clone({ q: 0, r: 4 }),
      cursor.clone({ q: -1, r: 4 }),
      cursor.clone({ q: -1, r: 3 }),
      cursor.clone({ q: -1, r: 2 }),
      cursor.clone({ q: 0, r: 1 }),
      cursor.clone({ q: 1, r: 0 }),
    ])
  })
})

describe('when called with at coordinates', () => {
  test('returns a traverser that returns hexes in a spiral around but excluding the "at" coordinates', () => {
    expect(spiral({ at: { q: 1, r: 3 }, radius: 2 })(cursor, getHex)).toEqual([
      cursor.clone({ q: 1, r: 2 }),
      cursor.clone({ q: 2, r: 2 }),
      cursor.clone({ q: 2, r: 3 }),
      cursor.clone({ q: 1, r: 4 }),
      cursor.clone({ q: 0, r: 4 }),
      cursor.clone({ q: 0, r: 3 }),
      cursor.clone({ q: 2, r: 1 }),
      cursor.clone({ q: 3, r: 1 }),
      cursor.clone({ q: 3, r: 2 }),
      cursor.clone({ q: 3, r: 3 }),
      cursor.clone({ q: 2, r: 4 }),
      cursor.clone({ q: 1, r: 5 }),
      cursor.clone({ q: 0, r: 5 }),
      cursor.clone({ q: -1, r: 5 }),
      cursor.clone({ q: -1, r: 4 }),
      cursor.clone({ q: -1, r: 3 }),
      cursor.clone({ q: 0, r: 2 }),
      cursor.clone({ q: 1, r: 1 }),
    ])
  })
})

describe('when called with start coordinates', () => {
  test('returns a traverser that returns hexes in a spiral around and including the "start" coordinates', () => {
    expect(spiral({ start: { q: 2, r: 1 }, radius: 2 })(cursor, getHex)).toEqual([
      cursor.clone({ q: 2, r: 1 }),
      cursor.clone({ q: 2, r: 0 }),
      cursor.clone({ q: 3, r: 0 }),
      cursor.clone({ q: 3, r: 1 }),
      cursor.clone({ q: 2, r: 2 }),
      cursor.clone({ q: 1, r: 2 }),
      cursor.clone({ q: 1, r: 1 }),
      cursor.clone({ q: 3, r: -1 }),
      cursor.clone({ q: 4, r: -1 }),
      cursor.clone({ q: 4, r: 0 }),
      cursor.clone({ q: 4, r: 1 }),
      cursor.clone({ q: 3, r: 2 }),
      cursor.clone({ q: 2, r: 3 }),
      cursor.clone({ q: 1, r: 3 }),
      cursor.clone({ q: 0, r: 3 }),
      cursor.clone({ q: 0, r: 2 }),
      cursor.clone({ q: 0, r: 1 }),
      cursor.clone({ q: 1, r: 0 }),
      cursor.clone({ q: 2, r: -1 }),
    ])
  })
})

describe('when called with a counterclockwise rotation', () => {
  test('returns a traverser that returns hexes in a spiral around the cursor in a counterclockwise rotation', () => {
    expect(spiral({ radius: 2, rotation: 'counterclockwise' })(cursor, getHex)).toEqual([
      cursor.clone({ q: 2, r: 1 }),
      cursor.clone({ q: 1, r: 1 }),
      cursor.clone({ q: 0, r: 2 }),
      cursor.clone({ q: 0, r: 3 }),
      cursor.clone({ q: 1, r: 3 }),
      cursor.clone({ q: 2, r: 2 }),
      cursor.clone({ q: 2, r: 0 }),
      cursor.clone({ q: 1, r: 0 }),
      cursor.clone({ q: 0, r: 1 }),
      cursor.clone({ q: -1, r: 2 }),
      cursor.clone({ q: -1, r: 3 }),
      cursor.clone({ q: -1, r: 4 }),
      cursor.clone({ q: 0, r: 4 }),
      cursor.clone({ q: 1, r: 4 }),
      cursor.clone({ q: 2, r: 3 }),
      cursor.clone({ q: 3, r: 2 }),
      cursor.clone({ q: 3, r: 1 }),
      cursor.clone({ q: 3, r: 0 }),
    ])
  })
})
