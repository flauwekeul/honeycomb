import { expect, test } from 'vitest'
import { createHexOrigin } from './createHexOrigin'

test(`returns the top left point relative to the passed bounding box's center`, () => {
  expect(createHexOrigin('topLeft', { width: 10, height: 10 })).toEqual({ x: -5, y: -5 })
})

test(`returns the passed point`, () => {
  expect(createHexOrigin({ x: 10, y: 10 })).toEqual({ x: 10, y: 10 })
})
