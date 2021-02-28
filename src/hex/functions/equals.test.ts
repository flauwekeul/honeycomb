import { equals } from './equals'

test('returns whether the 2 passed axial coordinates are the same', () => {
  expect(equals({ q: 1, r: 2 }, { q: 1, r: 2 })).toBe(true)
  expect(equals({ q: 1, r: 2 }, { q: 3, r: 4 })).toBe(false)
})
