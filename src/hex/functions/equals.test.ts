import { equals } from './equals'

test('returns whether the 2 passed offset coordinates are the same', () => {
  expect(equals({ col: 1, row: 2 }, { col: 1, row: 2 })).toBe(true)
  expect(equals({ col: 1, row: 2 }, { col: 3, row: 4 })).toBe(false)
})

test('throws when offset coordinates and non-offset coordinates are passed', () => {
  expect(() => equals({ col: 1, row: 2 }, { q: 1, r: 2 } as never)).toThrowError(
    `Can't compare coordinates where one are offset coordinates. Either pass two offset coordinates or two axial/cube coordinates. Received: {"col":1,"row":2} and {"q":1,"r":2}`,
  )
})

test('returns whether the 2 passed axial coordinates are the same', () => {
  expect(equals({ q: 1, r: 2 }, { q: 1, r: 2 })).toBe(true)
  expect(equals({ q: 1, r: 2 }, { q: 3, r: 4 })).toBe(false)

  expect(equals([1, 2], [1, 2])).toBe(true)
  expect(equals([1, 2], [3, 4])).toBe(false)
})
