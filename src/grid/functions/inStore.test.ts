import { createHex, createHexPrototype } from '../../hex'
import { Grid } from '../grid'
import { at } from '../traversers'
import { inStore } from './inStore'

test('returns whether the passed hex is present in the passed store', () => {
  const hexPrototype = createHexPrototype()
  const hex = createHex(hexPrototype, { q: 1, r: 2 })

  expect(inStore(hex, new Grid(hexPrototype, new Map([[hex.toString(), hex]])))).toBe(true)
  expect(inStore(hex, new Grid(hexPrototype, at({ q: 3, r: 4 })))).toBe(false)
  expect(inStore(hex, new Grid(hexPrototype))).toBe(false)
})
