import { expect, test } from 'vitest'
import { Orientation } from '../types'
import { offsetToCube } from './offsetToCube'

test('returns axial coordinates bases on the passed offset coordinates', () => {
  expect(offsetToCube({ offset: -1, orientation: Orientation.POINTY }, { col: 1, row: 4 })).toEqual({
    q: -1,
    r: 4,
    s: -3,
  })
  expect(offsetToCube({ offset: 1, orientation: Orientation.POINTY }, { col: 1, row: 4 })).toEqual({
    q: -1,
    r: 4,
    s: -3,
  })
  expect(offsetToCube({ offset: -1, orientation: Orientation.FLAT }, { col: 1, row: 4 })).toEqual({ q: 1, r: 4, s: -5 })
  expect(offsetToCube({ offset: 1, orientation: Orientation.FLAT }, { col: 1, row: 4 })).toEqual({ q: 1, r: 3, s: -4 })

  expect(offsetToCube({ offset: -1, orientation: Orientation.POINTY }, { col: 4, row: 1 })).toEqual({
    q: 4,
    r: 1,
    s: -5,
  })
  expect(offsetToCube({ offset: 1, orientation: Orientation.POINTY }, { col: 4, row: 1 })).toEqual({
    q: 3,
    r: 1,
    s: -4,
  })
  expect(offsetToCube({ offset: -1, orientation: Orientation.FLAT }, { col: 4, row: 1 })).toEqual({
    q: 4,
    r: -1,
    s: -3,
  })
  expect(offsetToCube({ offset: 1, orientation: Orientation.FLAT }, { col: 4, row: 1 })).toEqual({ q: 4, r: -1, s: -3 })
})
