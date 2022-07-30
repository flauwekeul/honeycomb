import { expect, test } from 'vitest'
import { createHexPrototype } from '../../hex'
import { distance } from './distance'

test('returns the number of hexes between the passed 2 hexes (excluding the last hex)', () => {
  const hexPrototype = createHexPrototype({ orientation: 'pointy' })
  const result = distance(hexPrototype, { q: 1, r: 3 }, { q: 8, r: 7 })

  expect(result).toBe(11)
})
