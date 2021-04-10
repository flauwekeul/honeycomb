import { Hex } from '../../hex'
import { add } from './add'

test('accepts coordinates and returns a traverser that returns the hex with those coordinates', () => {
  const getHex = jest.fn((coordinates) => coordinates)

  expect(add({ q: 1, r: 2 }, { q: 3, r: 4 })({} as Hex, getHex)).toEqual([
    { q: 1, r: 2 },
    { q: 3, r: 4 },
  ])
  expect(getHex).toBeCalledWith({ q: 1, r: 2 })
  expect(getHex).toBeCalledWith({ q: 3, r: 4 })
})
