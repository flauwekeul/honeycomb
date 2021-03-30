import { offsetToCube } from './offsetToCube'

test('returns axial coordinates bases on the passed offset coordinates', () => {
  expect(offsetToCube({ col: 1, row: 4 }, { offset: -1, isPointy: true })).toEqual({ q: -1, r: 4, s: -3 })
  expect(offsetToCube({ col: 1, row: 4 }, { offset: 1, isPointy: true })).toEqual({ q: -1, r: 4, s: -3 })
  expect(offsetToCube({ col: 1, row: 4 }, { offset: -1, isPointy: false })).toEqual({ q: 1, r: 4, s: -5 })
  expect(offsetToCube({ col: 1, row: 4 }, { offset: 1, isPointy: false })).toEqual({ q: 1, r: 3, s: -4 })

  expect(offsetToCube({ col: 4, row: 1 }, { offset: -1, isPointy: true })).toEqual({ q: 4, r: 1, s: -5 })
  expect(offsetToCube({ col: 4, row: 1 }, { offset: 1, isPointy: true })).toEqual({ q: 3, r: 1, s: -4 })
  expect(offsetToCube({ col: 4, row: 1 }, { offset: -1, isPointy: false })).toEqual({ q: 4, r: -1, s: -3 })
  expect(offsetToCube({ col: 4, row: 1 }, { offset: 1, isPointy: false })).toEqual({ q: 4, r: -1, s: -3 })
})
