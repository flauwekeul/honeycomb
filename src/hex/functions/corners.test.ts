import { Orientation } from '../types'
import { corners } from './corners'
import { createHex } from './createHex'
import { createHexPrototype } from './createHexPrototype'

test('returns corners relative to the hex, when a hex is passed', () => {
  const pointyHexPrototype = createHexPrototype({ orientation: 'pointy', dimensions: 1 })
  const pointyHex = createHex(pointyHexPrototype, { q: 1, r: 2 })
  const flatHexPrototype = createHexPrototype({ orientation: 'flat', dimensions: 1 })
  const flatHex = createHex(flatHexPrototype, { q: 1, r: 2 })

  expect(corners(pointyHex)).toEqual([
    { x: 4.330127018922193, y: 2.5 },
    { x: 4.330127018922193, y: 3.5 },
    { x: 3.4641016151377544, y: 4 },
    { x: 2.598076211353316, y: 3.5 },
    { x: 2.598076211353316, y: 2.5 },
    { x: 3.4641016151377544, y: 2 },
  ])
  expect(corners(flatHex)).toEqual([
    { x: 2, y: 3.4641016151377544 },
    { x: 2.5, y: 4.330127018922193 },
    { x: 2, y: 5.196152422706631 },
    { x: 1, y: 5.196152422706631 },
    { x: 0.5, y: 4.330127018922193 },
    { x: 1, y: 3.4641016151377544 },
  ])
})

test(`returns corners relative to any hex's origin, when hex settings are passed`, () => {
  const pointyHexSettings = {
    orientation: Orientation.POINTY,
    dimensions: { xRadius: 1, yRadius: 1 },
    origin: { x: 1, y: 2 },
  }
  const flatHexSettings = {
    orientation: Orientation.FLAT,
    dimensions: { xRadius: 1, yRadius: 1 },
    origin: { x: 1, y: 2 },
  }

  expect(corners(pointyHexSettings)).toEqual([
    { x: 1.8660254037844386, y: 1.5 },
    { x: 1.8660254037844386, y: 2.5 },
    { x: 1, y: 3 },
    { x: 0.1339745962155614, y: 2.5 },
    { x: 0.1339745962155614, y: 1.5 },
    { x: 1, y: 1 },
  ])
  expect(corners(flatHexSettings)).toEqual([
    { x: 1.5, y: 1.1339745962155614 },
    { x: 2, y: 2 },
    { x: 1.5, y: 2.8660254037844384 },
    { x: 0.5, y: 2.8660254037844384 },
    { x: 0, y: 2 },
    { x: 0.5, y: 1.1339745962155614 },
  ])
})
