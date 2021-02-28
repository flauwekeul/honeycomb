import { cloneHex } from './cloneHex'
import { createHex } from './createHex'
import { createHexPrototype } from './createHexPrototype'

test('returns a clone of the passed hex with the passed coordinates', () => {
  const prototypeOptions = { origin: { x: 10, y: 10 } }
  const hexPrototype = createHexPrototype(prototypeOptions)
  const hex = createHex(hexPrototype, { q: 1, r: 2 })
  const newCoordinates = { q: 3, r: 4 }

  const result = cloneHex(hex, newCoordinates)

  expect(result).toMatchObject(newCoordinates)
  expect(result).not.toBe(hex)
  expect(Object.getPrototypeOf(result)).toBe(hexPrototype)
  expect(result.origin).toStrictEqual(prototypeOptions.origin)
})
