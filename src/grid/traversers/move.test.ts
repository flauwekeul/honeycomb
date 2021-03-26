import { CompassDirection } from '../../compass'
import { createHex, createHexPrototype } from '../../hex'
import { move } from './move'

const hexPrototype = createHexPrototype()

test('returns a traverser that moves the cursor in the passed direction', () => {
  const hex = createHex(hexPrototype, { q: 1, r: 2 })
  const getHex = jest.fn((hex) => hex)

  expect(move(CompassDirection.E)(hex, getHex)).toEqual([{ q: 2, r: 2 }])
})

test('returns a traverser that moves the cursor in the passed direction the passed number of times', () => {
  const hex = createHex(hexPrototype, { q: 1, r: 2 })
  const getHex = jest.fn((coordinates) => createHex(hexPrototype, coordinates))

  expect(move(CompassDirection.NW, 3)(hex, getHex)).toMatchObject([
    { q: 1, r: 1 },
    { q: 1, r: 0 },
    { q: 1, r: -1 },
  ])
})
