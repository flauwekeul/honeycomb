import { expect, test } from 'vitest'
import { defineHex } from './defineHex'
import { toCube } from './toCube'

const Hex = defineHex()
const hex = new Hex()

test('converts tuple coordinates to cube coordinates', () => {
  expect(toCube(hex, [1, 2])).toEqual({ q: 1, r: 2, s: -3 })
  expect(toCube(hex, [0, 2, -2])).toEqual({ q: 0, r: 2, s: -2 })
})

test('converts offset coordinates to cube coordinates', () => {
  expect(toCube(hex, { col: 1, row: 2 })).toEqual({ q: 0, r: 2, s: -2 })
})

test('converts partial cube coordinates to cube coordinates', () => {
  expect(toCube(hex, { q: 1, r: 2 })).toEqual({ q: 1, r: 2, s: -3 })
  expect(toCube(hex, { q: 1, s: 2 })).toEqual({ q: 1, r: -3, s: 2 })
  expect(toCube(hex, { r: 1, s: 2 })).toEqual({ q: -3, r: 1, s: 2 })
})
