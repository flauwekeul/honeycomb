import { createHex, createHexPrototype } from '../../hex'
import { ring } from './ring'

const hexPrototype = createHexPrototype()
const getHex = jest.fn((coordinates) => createHex(hexPrototype, coordinates))
const cursor = createHex(hexPrototype, { q: 1, r: 2 })

describe('when called with center coordinates', () => {
  test('returns a traverser that returns hexes in a ring around the center starting at but excluding the cursor', () => {
    expect(ring({ center: { q: 1, r: 3 } })(cursor, getHex)).toEqual([
      cursor.clone({ q: 2, r: 2 }),
      cursor.clone({ q: 2, r: 3 }),
      cursor.clone({ q: 1, r: 4 }),
      cursor.clone({ q: 0, r: 4 }),
      cursor.clone({ q: 0, r: 3 }),
    ])
  })
})

describe('when called with at coordinates', () => {
  test('returns a traverser that returns hexes in a ring around the cursor starting at but excluding the "at" coordinates', () => {
    expect(ring({ at: { q: 1, r: 4 }, center: { q: 1, r: 3 } })(cursor, getHex)).toEqual([
      cursor.clone({ q: 0, r: 4 }),
      cursor.clone({ q: 0, r: 3 }),
      cursor.clone({ q: 1, r: 2 }),
      cursor.clone({ q: 2, r: 2 }),
      cursor.clone({ q: 2, r: 3 }),
    ])
  })
})

describe('when called with start coordinates', () => {
  test('returns a traverser that returns hexes in a ring around the cursor starting at and including the start coordinates', () => {
    expect(ring({ start: { q: 1, r: 4 }, center: { q: 1, r: 3 } })(cursor, getHex)).toEqual([
      cursor.clone({ q: 1, r: 4 }),
      cursor.clone({ q: 0, r: 4 }),
      cursor.clone({ q: 0, r: 3 }),
      cursor.clone({ q: 1, r: 2 }),
      cursor.clone({ q: 2, r: 2 }),
      cursor.clone({ q: 2, r: 3 }),
    ])
  })
})

describe('when called with a counterclockwise rotation', () => {
  test('returns a traverser that returns hexes in a ring around the cursor in a counterclockwise rotation', () => {
    expect(ring({ center: { q: 1, r: 3 }, rotation: 'counterclockwise' })(cursor, getHex)).toEqual([
      cursor.clone({ q: 0, r: 3 }),
      cursor.clone({ q: 0, r: 4 }),
      cursor.clone({ q: 1, r: 4 }),
      cursor.clone({ q: 2, r: 3 }),
      cursor.clone({ q: 2, r: 2 }),
    ])
  })
})
