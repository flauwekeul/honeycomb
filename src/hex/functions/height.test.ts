import { createHex } from './createHex'
import { createHexPrototype } from './createHexPrototype'
import { height } from './height'

test(`returns the hex's height`, () => {
  const pointyHexPrototype = createHexPrototype({ orientation: 'pointy', dimensions: { xRadius: 1, yRadius: 1 } })
  const pointyHex = createHex(pointyHexPrototype)
  const flatHexPrototype = createHexPrototype({ orientation: 'flat', dimensions: { xRadius: 1, yRadius: 1 } })
  const flatHex = createHex(flatHexPrototype)

  expect(height(pointyHex)).toBe(2)
  expect(height(flatHex)).toBe(1.7320508075688772)
})
