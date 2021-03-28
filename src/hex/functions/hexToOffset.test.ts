import { createHex } from './createHex'
import { createHexPrototype } from './createHexPrototype'
import { hexToOffset } from './hexToOffset'

test(`returns a hex's offset (col, row) coordinates`, () => {
  const pointyOddOffsetHexPrototype = createHexPrototype({ orientation: 'POINTY', offset: -1 })
  const pointyOddOffsetHex = createHex(pointyOddOffsetHexPrototype, { q: 1, r: 3 })
  const pointyEvenOffsetHexPrototype = createHexPrototype({ orientation: 'POINTY', offset: 1 })
  const pointyEvenOffsetHex = createHex(pointyEvenOffsetHexPrototype, { q: 1, r: 3 })
  const flatOddOffsetHexPrototype = createHexPrototype({ orientation: 'FLAT', offset: -1 })
  const flatOddOffsetHex = createHex(flatOddOffsetHexPrototype, { q: 1, r: 3 })
  const flatEvenOffsetHexPrototype = createHexPrototype({ orientation: 'FLAT', offset: 1 })
  const flatEvenOffsetHex = createHex(flatEvenOffsetHexPrototype, { q: 1, r: 3 })

  expect(hexToOffset(pointyOddOffsetHex)).toEqual({ col: 2, row: 3 })
  expect(hexToOffset(pointyEvenOffsetHex)).toEqual({ col: 3, row: 3 })
  expect(hexToOffset(flatOddOffsetHex)).toEqual({ col: 1, row: 3 })
  expect(hexToOffset(flatEvenOffsetHex)).toEqual({ col: 1, row: 4 })
})
