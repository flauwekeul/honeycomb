import { CompassDirection } from '../../compass'
import { createHex, createHexPrototype } from '../../hex'
import { rectangle } from './rectangle'

const hexPrototype = createHexPrototype()
const cursor = createHex(hexPrototype, { q: 1, r: 2 })
const getHex = jest.fn((coordinates) => createHex(hexPrototype, coordinates))

describe('when only passed width and height', () => {
  test('returns a traverser that returns hexes in a rectangular shape without the cursor', () => {
    expect(rectangle({ width: 2, height: 2 })(cursor, getHex)).toMatchObject([
      { q: 2, r: 2 },
      { q: 1, r: 3 },
      { q: 2, r: 3 },
    ])
  })
})

describe('when passed at', () => {
  test('returns a traverser that returns hexes in a rectangular shape at the "at" coordinates', () => {
    expect(rectangle({ at: { q: 0, r: 0 }, width: 2, height: 2 })(cursor, getHex)).toMatchObject([
      { q: 1, r: 0 },
      { q: 0, r: 1 },
      { q: 1, r: 1 },
    ])
  })
})

describe('when passed start', () => {
  test('returns a traverser that returns hexes in a rectangular shape at and including the "start" coordinates', () => {
    expect(rectangle({ start: { q: 0, r: 0 }, width: 2, height: 2 })(cursor, getHex)).toMatchObject([
      { q: 0, r: 0 },
      { q: 1, r: 0 },
      { q: 0, r: 1 },
      { q: 1, r: 1 },
    ])
  })
})

describe('when passed direction', () => {
  test('returns a traverser that returns hexes in a rectangular shape in order of the passed direction', () => {
    expect(rectangle({ width: 2, height: 2, direction: CompassDirection.S })(cursor, getHex)).toMatchObject([
      { q: 1, r: 3 },
      { q: 0, r: 2 },
      { q: 0, r: 3 },
    ])
  })
})

describe('when passed two opposing corners', () => {
  test('returns a traverser that returns hexes in a rectangular shape within those corners', () => {
    expect(rectangle({ q: 1, r: 2 }, { q: 2, r: 3 })(cursor, getHex)).toMatchObject([
      { q: 1, r: 2 },
      { q: 2, r: 2 },
      { q: 1, r: 3 },
      { q: 2, r: 3 },
    ])
  })
})

describe('when passed two opposing corners and false', () => {
  test('returns a traverser that returns hexes in a rectangular shape within those corners, excluding the first corner', () => {
    expect(rectangle({ q: 1, r: 2 }, { q: 2, r: 3 }, false)(cursor, getHex)).toMatchObject([
      { q: 2, r: 2 },
      { q: 1, r: 3 },
      { q: 2, r: 3 },
    ])
  })
})
