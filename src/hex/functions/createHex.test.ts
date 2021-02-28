import { Hex } from '../types'
import { createHex } from './createHex'
import { createHexPrototype } from './createHexPrototype'

test('returns a new hex when passed a hex prototype', () => {
  const hexPrototype = createHexPrototype()
  const result = createHex(hexPrototype)

  expect(result).toMatchObject({ q: 0, r: 0 })
  expect(Object.getPrototypeOf(result)).toBe(hexPrototype)
})

test('returns a new hex with passed properties on the instance', () => {
  const hexPrototype = createHexPrototype<CustomHex>()
  const result = createHex(hexPrototype, { q: 1, r: 2, custom: 'A' })

  expect(result).toMatchObject({ q: 1, r: 2, custom: 'A' })
  expect(Object.getPrototypeOf(result)).not.toHaveProperty('custom')
})

test('returns a clone when a hex (instance) is passed', () => {
  const hexPrototype = createHexPrototype<CustomHex>()
  const hex = createHex(hexPrototype)
  const result = createHex(hex, { q: 1, r: 2, custom: 'A' })

  expect(result).toMatchObject({ q: 1, r: 2, custom: 'A' })
  expect(result).not.toBe(hex)
})

interface CustomHex extends Hex {
  custom: string
}
