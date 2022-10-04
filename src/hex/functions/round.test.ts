import { expect, test } from 'vitest'
import { round } from './round'

test('rounds the passed axial or cube coordinates', () => {
  expect(round({ q: 1.5, r: 1.1 })).toEqual({ q: 2, r: 1, s: -3 })
  expect(round({ q: 1.1, r: 1.5 })).toEqual({ q: 1, r: 2, s: -3 })
  expect(round({ q: 1.1, r: 1.1 })).toEqual({ q: 1, r: 1, s: -2 })
})
