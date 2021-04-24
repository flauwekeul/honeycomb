import { CompassDirection } from '../../compass'
import { createHex, createHexPrototype } from '../../hex'
import { line } from './line'

const hexPrototype = createHexPrototype()
const cursor = createHex(hexPrototype, { q: 1, r: 2 })
const getHex = jest.fn((coordinates) => createHex(hexPrototype, coordinates))

describe('when called with only until', () => {
  test('returns a traverser that returns hexes between the cursor and until (excluding until)', () => {
    expect(line({ until: { q: -2, r: 6 } })(cursor, getHex)).toMatchObject([
      { q: 0, r: 3 },
      { q: 0, r: 4 },
      { q: -1, r: 5 },
    ])
  })
})

describe('when called with at and until', () => {
  test('returns a traverser that returns hexes between at and until (excluding at and until)', () => {
    expect(line({ at: { q: 0, r: 1 }, until: { q: 3, r: 3 } })(cursor, getHex)).toMatchObject([
      { q: 1, r: 1 },
      { q: 1, r: 2 },
      { q: 2, r: 2 },
      { q: 2, r: 3 },
    ])
  })
})

describe('when called with start and through', () => {
  test('returns a traverser that returns hexes between start and through (including start and through)', () => {
    expect(line({ start: { q: 8, r: 1 }, through: { q: 5, r: 3 } })(cursor, getHex)).toMatchObject([
      { q: 8, r: 1 },
      { q: 7, r: 2 },
      { q: 6, r: 2 },
      { q: 5, r: 3 },
    ])
  })
})

describe('when called with only a direction', () => {
  test('returns a traverser that returns a hex in the passed direction relative to the cursor', () => {
    expect(line({ direction: CompassDirection.E })(cursor, getHex)).toMatchObject([{ q: 2, r: 2 }])
  })
})

describe('when called with a direction and at', () => {
  test('returns a traverser that returns a hex in the passed direction relative to the "at" coordinates', () => {
    expect(line({ direction: CompassDirection.E, at: { q: 3, r: 4 } })(cursor, getHex)).toMatchObject([{ q: 4, r: 4 }])
  })
})

describe('when called with a direction and start', () => {
  test('returns a traverser that returns the start and a hex in the passed direction relative to the "start" coordinates', () => {
    expect(line({ direction: CompassDirection.E, start: { q: 3, r: 4 } })(cursor, getHex)).toMatchObject([
      { q: 3, r: 4 },
      { q: 4, r: 4 },
    ])
  })
})

describe('when called with a direction and length', () => {
  test('returns a traverser that returns the passed amount of hexes in the passed direction relative to the cursor', () => {
    expect(line({ direction: CompassDirection.NW, length: 3 })(cursor, getHex)).toMatchObject([
      { q: 1, r: 1 },
      { q: 1, r: 0 },
      { q: 1, r: -1 },
    ])
  })
})
