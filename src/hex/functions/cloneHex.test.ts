import { Hex } from '../types'
import { cloneHex } from './cloneHex'
import { createHex } from './createHex'
import { createHexPrototype } from './createHexPrototype'

const prototypeOptions = { origin: { x: 10, y: 10 } }
const hexPrototype = createHexPrototype<CustomHex>(prototypeOptions)
const hex = createHex(hexPrototype, { q: 1, r: 2 })

test('returns a clone of the passed hex', () => {
  const result = cloneHex(hex)

  expect(result).toMatchObject(hex)
  expect(result).not.toBe(hex)
  expect(Object.getPrototypeOf(result)).toBe(hexPrototype)
  expect(result.origin).toStrictEqual(prototypeOptions.origin)
})

test('returns a clone of the passed hex with the passed properties', () => {
  const newProps = { q: 3, r: 4, custom: 'A' }
  expect(cloneHex(hex, newProps)).toMatchObject(newProps)
})

test('returns a clone of the passed hex with the passed properties containing offset coordinates', () => {
  const newProps = { col: 3, row: 4, custom: 'B' }
  expect(cloneHex(hex, newProps)).toMatchObject({ q: 1, r: 4, custom: 'B' })
})

test('returns a clone of the passed hex with the passed tuple coordinates', () => {
  const newProps = [3, 4]
  expect(cloneHex(hex, newProps)).toMatchObject({ q: 3, r: 4 })
})

interface CustomHex extends Hex {
  custom: string
}
