import { createHex } from './createHex'
import { createHexPrototype } from './createHexPrototype'
import { hexToPoint } from './hexToPoint'

test('returns the point relative to the origin of the passed hex', () => {
  const pointyHexPrototype = createHexPrototype({
    orientation: 'pointy',
    origin: { x: 1, y: 1 },
    dimensions: { xRadius: 1, yRadius: 1 },
  })
  const pointyHex = createHex(pointyHexPrototype, { q: 1, r: 2 })
  const flatHexPrototype = createHexPrototype({
    orientation: 'flat',
    origin: { x: 1, y: 1 },
    dimensions: { xRadius: 1, yRadius: 1 },
  })
  const flatHex = createHex(flatHexPrototype, { q: 1, r: 2 })

  expect(hexToPoint(pointyHex)).toEqual({ x: 2.4641016151377544, y: 2 })
  expect(hexToPoint(flatHex)).toEqual({ x: 0.5, y: 3.3301270189221928 })
})
