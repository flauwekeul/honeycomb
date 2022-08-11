import { expect, test } from 'vitest'
import { Hex } from '../../hex'
import { distance } from './distance'

test('returns the number of hexes between the passed 2 hexes (excluding the last hex)', () => {
  const hexPrototype = Hex.prototype
  expect(distance(hexPrototype, { q: 1, r: 3 }, { q: 8, r: 7 })).toBe(11)
})
