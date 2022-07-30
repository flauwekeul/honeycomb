import { expect, test } from 'vitest'
import { createHex } from './createHex'
import { createHexPrototype } from './createHexPrototype'
import { isPointy } from './isPointy'

test('returns whether the passed hex has a flat orientation', () => {
  const pointyHexPrototype = createHexPrototype({ orientation: 'pointy' })
  const pointyHex = createHex(pointyHexPrototype)
  const flatHexPrototype = createHexPrototype({ orientation: 'flat' })
  const flatHex = createHex(flatHexPrototype)

  expect(isPointy(pointyHex)).toBe(true)
  expect(isPointy(flatHex)).toBe(false)
})
