import { createHex, createHexPrototype } from '../../hex'
import { ring } from './ring'

const hexPrototype = createHexPrototype()
const getHex = jest.fn((coordinates) => createHex(hexPrototype, coordinates))

describe('when called without arguments', () => {
  test('returns a traverser that returns hexes in a ring around the cursor starting at the hex NE of the cursor', () => {
    const cursor = createHex(hexPrototype, { q: 1, r: 2 })
    expect(ring()(cursor, getHex)).toEqual([
      cursor.clone({ q: 1, r: 1 }),
      cursor.clone({ q: 2, r: 1 }),
      cursor.clone({ q: 2, r: 2 }),
      cursor.clone({ q: 1, r: 3 }),
      cursor.clone({ q: 0, r: 3 }),
      cursor.clone({ q: 0, r: 2 }),
    ])
  })
})

describe('when called with start coordinates', () => {
  test('returns a traverser that returns hexes in a ring around the cursor starting at the start coordinates', () => {
    const cursor = createHex(hexPrototype, { q: 4, r: 4 })
    expect(ring({ start: { q: 2, r: 6 } })(cursor, getHex)).toEqual([
      cursor.clone({ q: 2, r: 6 }),
      cursor.clone({ q: 2, r: 5 }),
      cursor.clone({ q: 2, r: 4 }),
      cursor.clone({ q: 3, r: 3 }),
      cursor.clone({ q: 4, r: 2 }),
      cursor.clone({ q: 5, r: 2 }),
      cursor.clone({ q: 6, r: 2 }),
      cursor.clone({ q: 6, r: 3 }),
      cursor.clone({ q: 6, r: 4 }),
      cursor.clone({ q: 5, r: 5 }),
      cursor.clone({ q: 4, r: 6 }),
      cursor.clone({ q: 3, r: 6 }),
    ])
  })
})

describe('when called with a counterclockwise rotation', () => {
  test('returns a traverser that returns hexes in a ring around the cursor in a counterclockwise rotation', () => {
    const cursor = createHex(hexPrototype, { q: 1, r: 2 })
    expect(ring({ rotation: 'counterclockwise' })(cursor, getHex)).toEqual([
      cursor.clone({ q: 1, r: 1 }),
      cursor.clone({ q: 0, r: 2 }),
      cursor.clone({ q: 0, r: 3 }),
      cursor.clone({ q: 1, r: 3 }),
      cursor.clone({ q: 2, r: 2 }),
      cursor.clone({ q: 2, r: 1 }),
    ])
  })
})
