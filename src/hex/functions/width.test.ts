import { expect, test } from 'vitest'
import { createHex } from './createHex'
import { createHexPrototype } from './createHexPrototype'
import { width } from './width'

test(`returns the hex's width`, () => {
  const pointyHexPrototype = createHexPrototype({ orientation: 'pointy', dimensions: { xRadius: 1, yRadius: 1 } })
  const pointyHex = createHex(pointyHexPrototype)
  const flatHexPrototype = createHexPrototype({ orientation: 'flat', dimensions: { xRadius: 1, yRadius: 1 } })
  const flatHex = createHex(flatHexPrototype)

  expect(width(pointyHex)).toBe(1.7320508075688772)
  expect(width(flatHex)).toBe(2)
})
