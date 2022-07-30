import { describe, expect, test, vi } from 'vitest'
import { CompassDirection } from '../../compass'
import { createHex, createHexPrototype } from '../../hex'
import { line } from './line'

const hexPrototype = createHexPrototype()
const cursor = createHex(hexPrototype, { q: 1, r: 2 })
const _createHex = vi.fn((coordinates) => createHex(hexPrototype, coordinates))

describe('when called with a direction and length', () => {
  describe('without cursor', () => {
    test('returns a traverser that returns length hexes in passed direction starting at [0, 0]', () => {
      const actual = [...line({ direction: CompassDirection.SE, length: 3 })(_createHex)]
      const expected = [
        { q: 0, r: 0 },
        { q: 0, r: 1 },
        { q: 0, r: 2 },
      ]
      expect(actual).toMatchObject(expected)
    })
  })

  describe('with cursor', () => {
    test('returns a traverser that returns length hexes in passed direction starting at the cursor, excluding the cursor', () => {
      const actual = [...line({ direction: CompassDirection.NW, length: 3 })(_createHex, cursor)]
      const expected = [
        { q: 1, r: 1 },
        { q: 1, r: 0 },
        { q: 1, r: -1 },
      ]
      expect(actual).toMatchObject(expected)
    })
  })
})

describe('when called with a direction, length and start', () => {
  describe('without cursor', () => {
    test('returns a traverser that returns length hexes in passed direction relative to start, including start', () => {
      const actual = [...line({ direction: CompassDirection.S, length: 3, start: { q: 2, r: 0 } })(_createHex)]
      const expected = [
        { q: 2, r: 0 },
        { q: 2, r: 1 },
        { q: 1, r: 2 },
      ]
      expect(actual).toMatchObject(expected)
    })
  })

  describe('with cursor', () => {
    test('returns a traverser that returns length hexes in passed direction relative to start, including start', () => {
      const actual = [...line({ direction: CompassDirection.E, length: 3, start: { q: 3, r: 4 } })(_createHex, cursor)]
      const expected = [
        { q: 3, r: 4 },
        { q: 4, r: 4 },
        { q: 5, r: 4 },
      ]
      expect(actual).toMatchObject(expected)
    })
  })
})

describe('when called with stop', () => {
  describe('without cursor', () => {
    test('returns a traverser that returns the hexes between [0, 0] and stop (inclusive)', () => {
      const actual = [...line({ stop: { q: 2, r: 1 } })(_createHex)]
      const expected = [
        { q: 0, r: 0 },
        { q: 1, r: 0 },
        { q: 1, r: 1 },
        { q: 2, r: 1 },
      ]
      expect(actual).toMatchObject(expected)
    })
  })

  describe('with cursor', () => {
    test('returns a traverser that returns the hexes between cursor and stop (excluding cursor, including stop)', () => {
      const actual = [...line({ stop: { q: 2, r: -1 } })(_createHex, cursor)]
      const expected = [
        { q: 1, r: 1 },
        { q: 2, r: 0 },
        { q: 2, r: -1 },
      ]
      expect(actual).toMatchObject(expected)
    })
  })
})

describe('when called with start and stop', () => {
  describe('without cursor', () => {
    test('returns a traverser that returns the hexes between start and stop (inclusive)', () => {
      const actual = [...line({ start: { q: 3, r: 5 }, stop: { q: 4, r: 7 } })(_createHex)]
      const expected = [
        { q: 3, r: 5 },
        { q: 3, r: 6 },
        { q: 4, r: 6 },
        { q: 4, r: 7 },
      ]
      expect(actual).toMatchObject(expected)
    })
  })

  describe('with cursor', () => {
    test('returns a traverser that returns the hexes between start and stop (inclusive)', () => {
      const actual = [...line({ start: { q: 5, r: 4 }, stop: { q: 4, r: 2 } })(_createHex, cursor)]
      const expected = [
        { q: 5, r: 4 },
        { q: 5, r: 3 },
        { q: 4, r: 3 },
        { q: 4, r: 2 },
      ]
      expect(actual).toMatchObject(expected)
    })
  })
})
