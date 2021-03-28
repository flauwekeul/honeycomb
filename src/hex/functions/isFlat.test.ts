import { createHex } from './createHex'
import { createHexPrototype } from './createHexPrototype'
import { isFlat } from './isFlat'

test('returns whether the passed hex has a flat orientation', () => {
  const pointyHexPrototype = createHexPrototype({ orientation: 'POINTY' })
  const pointyHex = createHex(pointyHexPrototype)
  const flatHexPrototype = createHexPrototype({ orientation: 'FLAT' })
  const flatHex = createHex(flatHexPrototype)

  expect(isFlat(pointyHex)).toBe(false)
  expect(isFlat(flatHex)).toBe(true)
})
