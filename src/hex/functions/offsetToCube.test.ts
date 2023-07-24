import { expect, test } from 'vitest'
import { offsetToCube } from './offsetToCube'

test('returns axial coordinates bases on the passed offset coordinates', () => {
  expect(offsetToCube({ offset: -1, orientation: 'pointy' }, { col: 1, row: 4 })).toEqual({
    q: -1,
    r: 4,
    s: -3,
  })
  expect(offsetToCube({ offset: 1, orientation: 'pointy' }, { col: 1, row: 4 })).toEqual({
    q: -1,
    r: 4,
    s: -3,
  })
  expect(offsetToCube({ offset: -1, orientation: 'flat' }, { col: 1, row: 4 })).toEqual({ q: 1, r: 4, s: -5 })
  expect(offsetToCube({ offset: 1, orientation: 'flat' }, { col: 1, row: 4 })).toEqual({ q: 1, r: 3, s: -4 })

  expect(offsetToCube({ offset: -1, orientation: 'pointy' }, { col: 4, row: 1 })).toEqual({
    q: 4,
    r: 1,
    s: -5,
  })
  expect(offsetToCube({ offset: 1, orientation: 'pointy' }, { col: 4, row: 1 })).toEqual({
    q: 3,
    r: 1,
    s: -4,
  })
  expect(offsetToCube({ offset: -1, orientation: 'flat' }, { col: 4, row: 1 })).toEqual({
    q: 4,
    r: -1,
    s: -3,
  })
  expect(offsetToCube({ offset: 1, orientation: 'flat' }, { col: 4, row: 1 })).toEqual({ q: 4, r: -1, s: -3 })
})
