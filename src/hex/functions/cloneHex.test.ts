import { Hex } from '../types'
import { cloneHex } from './cloneHex'
import { createHex } from './createHex'
import { createHexPrototype } from './createHexPrototype'

const prototypeOptions = { origin: { x: 10, y: 10 } }
const hexPrototype = createHexPrototype<CustomHex>(prototypeOptions)
const hex = createHex(hexPrototype, { q: 1, r: 2 })

test('returns a clone of the passed hex with the passed properties', () => {
  const newProps = { q: 3, r: 4, custom: 'A' }
  const result = cloneHex(hex, newProps)

  expect(result).toMatchObject(newProps)
  expect(result).not.toBe(hex)
  expect(Object.getPrototypeOf(result)).toBe(hexPrototype)
  expect(result.origin).toStrictEqual(prototypeOptions.origin)
})

test('returns a clone of the passed hex with the passed properties containing offset coordinates', () => {
  const newProps = { col: 3, row: 4, custom: 'B' }
  const result = cloneHex(hex, newProps)

  expect(result).toMatchObject({ q: 1, r: 4, custom: 'B' })
  expect(result).not.toBe(hex)
  expect(Object.getPrototypeOf(result)).toBe(hexPrototype)
  expect(result.origin).toStrictEqual(prototypeOptions.origin)
})

interface CustomHex extends Hex {
  custom: string
}
