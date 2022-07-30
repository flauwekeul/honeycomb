import { expect, test } from 'vitest'
import { createHex } from './createHex'
import { createHexPrototype } from './createHexPrototype'
import { isHex } from './isHex'

test('returns whether the passed value is a hex (i.e. an object with the hex prototype)', () => {
  const hexPrototype = createHexPrototype()
  const hex = createHex(hexPrototype)

  expect(isHex(hex)).toBe(true)
  expect(isHex(hexPrototype)).toBe(false)
  expect(isHex({})).toBe(false)
  expect(isHex(1)).toBe(false)
})
