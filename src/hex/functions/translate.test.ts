import { expect, test } from 'vitest'
import { Hex } from '../hex'
import { translate } from './translate'

test('returns a clone of the passed hex with the delta partial cube coordinates', () => {
  const hex = new Hex()
  const result = translate(hex, { q: -1, r: 1 })

  expect(result).toBeInstanceOf(Hex)
  expect(result).not.toBe(Hex)
  expect(result).toContain({ q: -1, r: 1, s: 0 })
})

test('returns translated cube coordinates from partial cube coordinates', () => {
  const input = { r: 2, s: -3 } // resolves to { q: 1, r: 2, s: -3 }
  const delta = { q: -3, s: 1 } // resolves to { q: -3, r: 2, s: 1 }
  const result = translate(input, delta)

  expect(result).toEqual({ q: -2, r: 4, s: -2 })
})
