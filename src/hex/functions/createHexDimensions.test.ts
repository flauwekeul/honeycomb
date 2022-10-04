import { expect, test } from 'vitest'
import { Orientation } from '../types'
import { createHexDimensions } from './createHexDimensions'

test('returns an ellipse with the passed radius', () => {
  expect(createHexDimensions(10)).toEqual({ xRadius: 10, yRadius: 10 })
})

test('returns an ellipse from the passed bounding box and orientation', () => {
  expect(createHexDimensions({ width: 20, height: 20 }, Orientation.POINTY)).toEqual({
    xRadius: 11.547005383792516,
    yRadius: 10,
  })
  expect(createHexDimensions({ width: 20, height: 20 }, Orientation.FLAT)).toEqual({
    xRadius: 10,
    yRadius: 11.547005383792516,
  })
})

test('returns an ellipse when an ellipse is passed', () => {
  expect(createHexDimensions({ xRadius: 10, yRadius: 10 })).toEqual({
    xRadius: 10,
    yRadius: 10,
  })
})

test('throws when something invalid is passed', () => {
  // @ts-expect-error
  expect(() => createHexDimensions()).toThrowError(
    TypeError(
      `Invalid dimensions: undefined. Dimensions must be expressed as an Ellipse ({ xRadius: number, yRadius: number }), a Rectangle ({ width: number, height: number }) or a number.`,
    ),
  )
})
