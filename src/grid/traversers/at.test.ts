import { Hex } from '../../hex'
import { at } from './at'

test('accepts coordinates and returns a traverser that returns the hex with those coordinates', () => {
  const coordinates = { q: 1, r: 2 }
  const getHex = jest.fn((coordinates) => coordinates)

  expect(at(coordinates)({} as Hex, getHex)).toEqual([coordinates])
  expect(getHex).toBeCalledWith(coordinates)
})
