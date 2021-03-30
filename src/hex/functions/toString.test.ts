import { toString } from './toString'

test('returns a string representation of the hex coordinates', () => {
  expect(toString({ q: 1, r: 2 })).toBe('1,2')
  expect(toString({ q: 1, r: 2, s: -3 })).toBe('1,2')
})
