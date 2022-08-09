import { expect, test } from 'vitest'
import { completeCube } from './completeCube'

test('returns complete cube coordinates', () => {
  expect(completeCube({ q: 1, r: 2, s: -3 })).toEqual({ q: 1, r: 2, s: -3 })
})

test('converts partial cube coordinates to complete cube coordinates', () => {
  expect(completeCube({ q: 1, r: 2 })).toEqual({ q: 1, r: 2, s: -3 })
  expect(completeCube({ q: 1, s: 2 })).toEqual({ q: 1, r: -3, s: 2 })
  expect(completeCube({ r: 1, s: 2 })).toEqual({ q: -3, r: 1, s: 2 })
})

test('throws when passed less than 2 coordinates', () => {
  // @ts-expect-error
  expect(() => completeCube({ q: 1 })).toThrowError(
    TypeError(
      `Can't determine three cube coordinates from less than two coordinates. Received: { q: 1, r: undefined, s: undefined }.`,
    ),
  )
})
