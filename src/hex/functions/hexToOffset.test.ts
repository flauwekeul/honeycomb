import { expect, test } from 'vitest'
import { defineHex } from './defineHex'
import { hexToOffset } from './hexToOffset'

test(`returns a hex's offset (col, row) coordinates`, () => {
  const PointyOddOffsetHex = defineHex({ orientation: 'pointy', offset: -1 })
  const PointyEvenOffsetHex = defineHex({ orientation: 'pointy', offset: 1 })
  const FlatOddOffsetHex = defineHex({ orientation: 'flat', offset: -1 })
  const FlatEvenOffsetHex = defineHex({ orientation: 'flat', offset: 1 })

  expect(hexToOffset(new PointyOddOffsetHex({ q: 1, r: 3 }))).toEqual({ col: 2, row: 3 })
  expect(hexToOffset(new PointyEvenOffsetHex({ q: 1, r: 3 }))).toEqual({ col: 3, row: 3 })
  expect(hexToOffset(new FlatOddOffsetHex({ q: 1, r: 3 }))).toEqual({ col: 1, row: 3 })
  expect(hexToOffset(new FlatEvenOffsetHex({ q: 1, r: 3 }))).toEqual({ col: 1, row: 4 })
})
