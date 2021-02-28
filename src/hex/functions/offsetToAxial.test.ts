import { offsetToAxial } from './offsetToAxial'

test('returns axial coordinates bases on the passed offset coordinates', () => {
  expect(offsetToAxial({ col: 1, row: 4 }, { offset: -1, isPointy: true })).toEqual({ q: -1, r: 4 })
  expect(offsetToAxial({ col: 1, row: 4 }, { offset: 1, isPointy: true })).toEqual({ q: -1, r: 4 })
  expect(offsetToAxial({ col: 1, row: 4 }, { offset: -1, isPointy: false })).toEqual({ q: 1, r: 4 })
  expect(offsetToAxial({ col: 1, row: 4 }, { offset: 1, isPointy: false })).toEqual({ q: 1, r: 3 })

  expect(offsetToAxial({ col: 4, row: 1 }, { offset: -1, isPointy: true })).toEqual({ q: 4, r: 1 })
  expect(offsetToAxial({ col: 4, row: 1 }, { offset: 1, isPointy: true })).toEqual({ q: 3, r: 1 })
  expect(offsetToAxial({ col: 4, row: 1 }, { offset: -1, isPointy: false })).toEqual({ q: 4, r: -1 })
  expect(offsetToAxial({ col: 4, row: 1 }, { offset: 1, isPointy: false })).toEqual({ q: 4, r: -1 })
})
