import { CompassDirection } from '../../compass'
import { createHex, createHexPrototype } from '../../hex'
import { line } from './line'

const hexPrototype = createHexPrototype()
const cursor = createHex(hexPrototype, { q: 1, r: 2 })
const getHex = jest.fn((coordinates) => createHex(hexPrototype, coordinates))

describe('when called with only a direction', () => {
  test('returns a traverser that returns a hex in the passed direction relative to the cursor', () => {
    expect(line({ direction: CompassDirection.E })(cursor, getHex)).toMatchObject([{ q: 2, r: 2 }])
  })
})

describe('when called with at', () => {
  test('returns a traverser that returns a hex in the passed direction relative to the "at" coordinates', () => {
    expect(line({ direction: CompassDirection.E, at: { q: 3, r: 4 } })(cursor, getHex)).toMatchObject([{ q: 4, r: 4 }])
  })
})

describe('when called with start', () => {
  test('returns a traverser that returns the start and a hex in the passed direction relative to the "start" coordinates', () => {
    expect(line({ direction: CompassDirection.E, start: { q: 3, r: 4 } })(cursor, getHex)).toMatchObject([
      { q: 3, r: 4 },
      { q: 4, r: 4 },
    ])
  })
})

describe('when called with length', () => {
  test('returns a traverser that returns the passed amount of hexes in the passed direction relative to the cursor', () => {
    expect(line({ direction: CompassDirection.NW, length: 3 })(cursor, getHex)).toMatchObject([
      { q: 1, r: 1 },
      { q: 1, r: 0 },
      { q: 1, r: -1 },
    ])
  })
})
