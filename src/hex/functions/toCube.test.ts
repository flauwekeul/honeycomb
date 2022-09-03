import { expect, test } from 'vitest'
import { defaultHexSettings } from '../hex'
import { toCube } from './toCube'

test('converts tuple coordinates to cube coordinates', () => {
  expect(toCube(defaultHexSettings, [1, 2])).toEqual({ q: 1, r: 2, s: -3 })
  expect(toCube(defaultHexSettings, [0, 2, -2])).toEqual({ q: 0, r: 2, s: -2 })
})

test('converts offset coordinates to cube coordinates', () => {
  expect(toCube(defaultHexSettings, { col: 1, row: 2 })).toEqual({ q: 0, r: 2, s: -2 })
})

test('converts partial cube coordinates to cube coordinates', () => {
  expect(toCube(defaultHexSettings, { q: 1, r: 2 })).toEqual({ q: 1, r: 2, s: -3 })
  expect(toCube(defaultHexSettings, { q: 1, s: 2 })).toEqual({ q: 1, r: -3, s: 2 })
  expect(toCube(defaultHexSettings, { r: 1, s: 2 })).toEqual({ q: -3, r: 1, s: 2 })
})
