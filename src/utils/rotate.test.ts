import { expect, test } from 'vitest'
import { rotate } from './rotate'

test('returns NE when current direction is N and steps is 1', () => {
  expect(rotate('N', 1)).toBe('NE')
})

test('returns N when current direction is NE and steps is -1', () => {
  expect(rotate('NE', -1)).toBe('N')
})

test('returns N when current direction is NW and steps is 1', () => {
  expect(rotate('NW', 1)).toBe('N')
})

test('returns NW when current direction is N and steps is -1', () => {
  expect(rotate('N', -1)).toBe('NW')
})
