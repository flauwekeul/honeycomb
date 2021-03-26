import { createHex, createHexPrototype, Hex } from '../../hex'
import { Traverser } from '../types'
import { branch } from './branch'

const hexPrototype = createHexPrototype()

test('returns the hexes of the passed branch traverser for each hex in the passed source traverser', () => {
  const sourceTraverser: Traverser<Hex> = (cursor, getHex) => [cursor, getHex({ q: cursor.q + 1, r: cursor.r })]
  const branchTraverser: Traverser<Hex> = (cursor, getHex) => [getHex({ q: cursor.q, r: cursor.r + 1 })]
  const getHex = jest.fn((coordinates) => createHex(hexPrototype, coordinates))
  const startHex = createHex(hexPrototype, { q: 1, r: 2 })

  expect(branch(sourceTraverser, branchTraverser)(startHex, getHex)).toMatchObject([
    startHex,
    startHex.clone({ q: 1, r: 3 }),
    startHex.clone({ q: 2, r: 2 }),
    startHex.clone({ q: 2, r: 3 }),
  ])
})
