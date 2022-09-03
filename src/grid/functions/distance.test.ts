import { expect, test } from 'vitest'
import { defaultHexSettings } from '../../hex'
import { distance } from './distance'

test('returns the number of hexes between the passed 2 hexes (excluding the last hex)', () => {
  expect(distance(defaultHexSettings, { q: 1, r: 3 }, { q: 8, r: 7 })).toBe(11)
})
