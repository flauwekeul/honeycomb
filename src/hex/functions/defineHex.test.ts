import { expect, test } from 'vitest'
import { defaultHexSettings, Hex } from '../hex'
import { Ellipse, HexOffset, Orientation, Point } from '../types'
import { defineHex } from './defineHex'

test('returns a class that extends from Hex', () => {
  const HexClass = defineHex()

  expect(HexClass).toBeTypeOf('function')
  expect(new HexClass()).toBeInstanceOf(Hex)
  expect(HexClass.prototype).toEqual(Hex.prototype)
  expect(HexClass.prototype).not.toBe(Hex.prototype)
})

test('returns a class that has the default hex options', () => {
  const HexClass = defineHex()
  const hex = new HexClass()

  expect(hex.dimensions).toEqual(defaultHexSettings.dimensions)
  expect(hex.orientation).toEqual(defaultHexSettings.orientation)
  expect(hex.origin).toEqual(defaultHexSettings.origin)
  expect(hex.offset).toEqual(defaultHexSettings.offset)
})

test('accepts an object with hex options', () => {
  const HexClass = defineHex({
    dimensions: 10,
    orientation: Orientation.FLAT,
    origin: 'topLeft',
    offset: 1,
  })
  const hex = new HexClass()

  expect(hex.dimensions).toEqual<Ellipse>({ xRadius: 10, yRadius: 10 })
  expect(hex.orientation).toEqual<Orientation>(Orientation.FLAT)
  expect(hex.origin).toEqual<Point>({ x: -10, y: -8.660254037844386 })
  expect(hex.offset).toEqual<HexOffset>(1)
})
