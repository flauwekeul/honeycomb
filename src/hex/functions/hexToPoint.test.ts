import { expect, test } from 'vitest'
import { defineHex } from './defineHex'
import { hexToPoint } from './hexToPoint'

test('returns the point relative to the origin of the passed hex', () => {
  const PointyHex = defineHex({
    orientation: 'pointy',
    origin: { x: 1, y: 1 },
    dimensions: { xRadius: 1, yRadius: 1 },
  })
  const FlatHex = defineHex({
    orientation: 'flat',
    origin: { x: 1, y: 1 },
    dimensions: { xRadius: 1, yRadius: 1 },
  })

  expect(hexToPoint(new PointyHex({ q: 1, r: 2 }))).toEqual({ x: 2.4641016151377544, y: 2 })
  expect(hexToPoint(new FlatHex({ q: 1, r: 2 }))).toEqual({ x: 0.5, y: 3.3301270189221928 })
})
