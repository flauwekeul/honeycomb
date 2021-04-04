import { center } from './center'
import { createHex } from './createHex'
import { createHexPrototype } from './createHexPrototype'

test('returns the center point relative to the hex with coordinates {q: 0, r: 0}, when a hex is passed', () => {
  const hexPrototype = createHexPrototype({ dimensions: 10, origin: 'topLeft' })
  const hex = createHex(hexPrototype, { q: 1, r: 2 })

  expect(center(hex)).toEqual({ x: -34.64101615137754, y: -30 })
})

test(`returns the center point relative to any hex's origin, when a hex prototype is passed`, () => {
  const hexPrototype = createHexPrototype({ dimensions: 10, origin: { x: 1, y: 2 } })
  expect(center(hexPrototype)).toEqual({ x: 7.6602540378443855, y: 8 })
})
