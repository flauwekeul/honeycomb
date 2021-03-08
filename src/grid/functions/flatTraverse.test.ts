import { CompassDirection } from '../../compass'
import { createHex, createHexPrototype } from '../../hex'
import { at, move } from '../traversers'
import { flatTraverse } from './flatTraverse'

const hexPrototype = createHexPrototype()
const cursor = createHex(hexPrototype)

test('returns an array of hexes if only a single traverser is passed', () => {
  const traverser = move(CompassDirection.E, 2)
  const result = flatTraverse(traverser)(cursor, (coordinates) => createHex(hexPrototype, coordinates))

  expect(result).toEqual([createHex(hexPrototype, { q: 1, r: 0 }), createHex(hexPrototype, { q: 2, r: 0 })])
})

test('flattens the passed traversers into a single traverser and returns it', () => {
  const traversers = [at({ q: 1, r: 2 }), move(CompassDirection.S, 2)]
  const result = flatTraverse(traversers)(cursor, (coordinates) => createHex(hexPrototype, coordinates))

  expect(result).toEqual([
    createHex(hexPrototype, { q: 1, r: 2 }),
    createHex(hexPrototype, { q: 1, r: 3 }),
    createHex(hexPrototype, { q: 0, r: 4 }),
  ])
})
