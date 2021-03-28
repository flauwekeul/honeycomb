import { Ellipse } from '../../../dist'
import { BoundingBox, HexCoordinates, HexPrototype, Orientations } from '../types'
import { cloneHex } from './cloneHex'
import { corners } from './corners'
import { createHex } from './createHex'
import { createHexPrototype } from './createHexPrototype'
import { equals } from './equals'

jest.mock('./cloneHex')
jest.mock('./corners')
jest.mock('./equals')

test('returns the default hex prototype when no options are passed', () => {
  const prototype = createHexPrototype()
  expect(Object.getOwnPropertyDescriptors(prototype)).toStrictEqual<TypedPropertyDescriptors<HexPrototype>>({
    dimensions: {
      value: { xRadius: 1, yRadius: 1 },
      writable: true,
      enumerable: true,
      configurable: true,
    },
    orientation: {
      value: Orientations.POINTY,
      writable: true,
      enumerable: true,
      configurable: true,
    },
    origin: {
      value: { x: 0, y: 0 },
      writable: true,
      enumerable: true,
      configurable: true,
    },
    offset: { value: -1, writable: true, enumerable: true, configurable: true },
    equals: {
      value: expect.any(Function),
      writable: true,
      enumerable: true,
      configurable: true,
    },
    clone: {
      value: expect.any(Function),
      writable: true,
      enumerable: true,
      configurable: true,
    },
    __isHoneycombHex: {
      value: true,
      writable: false,
      enumerable: false,
      configurable: false,
    },
    col: {
      get: expect.any(Function),
      set: undefined,
      enumerable: false,
      configurable: false,
    },
    corners: {
      get: expect.any(Function),
      set: undefined,
      enumerable: false,
      configurable: false,
    },
    height: {
      get: expect.any(Function),
      set: undefined,
      enumerable: false,
      configurable: false,
    },
    isFlat: {
      get: expect.any(Function),
      set: undefined,
      enumerable: false,
      configurable: false,
    },
    isPointy: {
      get: expect.any(Function),
      set: undefined,
      enumerable: false,
      configurable: false,
    },
    row: {
      get: expect.any(Function),
      set: undefined,
      enumerable: false,
      configurable: false,
    },
    s: {
      get: expect.any(Function),
      set: expect.any(Function),
      enumerable: false,
      configurable: false,
    },
    toString: {
      value: expect.any(Function),
      writable: true,
      enumerable: true,
      configurable: true,
    },
    width: {
      get: expect.any(Function),
      set: undefined,
      enumerable: false,
      configurable: false,
    },
    x: {
      get: expect.any(Function),
      set: undefined,
      enumerable: false,
      configurable: false,
    },
    y: {
      get: expect.any(Function),
      set: undefined,
      enumerable: false,
      configurable: false,
    },
    [Symbol.toStringTag]: {
      configurable: false,
      enumerable: false,
      value: 'Hex',
      writable: false,
    },
  })
})

test('returns the hex prototype with clone method', () => {
  const prototype = createHexPrototype()
  const newProps = {}
  prototype.clone(newProps)

  expect(cloneHex).toBeCalledWith(prototype, newProps)
})

test('returns the hex prototype with corners getter', () => {
  const prototype = createHexPrototype()
  prototype.corners

  expect(corners).toBeCalledWith(prototype)
})

test('returns the hex prototype with equals method', () => {
  const prototype = createHexPrototype()
  const coordinates: HexCoordinates = { q: 1, r: 2 }
  prototype.equals(coordinates)

  expect(equals).toBeCalledWith(prototype, coordinates)
})

test('returns the hex prototype with toString method', () => {
  const prototype = createHexPrototype()
  const hex = createHex(prototype, { q: 1, r: 2 })
  const result = hex.toString()

  expect(result).toBe('1,2')
})

describe('dimensions', () => {
  test('accepts an ellipse', () => {
    const prototype = createHexPrototype({ dimensions: { xRadius: 1, yRadius: 2 } })
    expect(prototype.dimensions).toEqual({ xRadius: 1, yRadius: 2 })
  })

  test('accepts a rectangular bounding box', () => {
    const pointyPrototype = createHexPrototype({ orientation: 'POINTY', dimensions: { width: 10, height: 20 } })
    expect(pointyPrototype.dimensions).toEqual({ xRadius: 5.773502691896258, yRadius: 10 })

    const flatPrototype = createHexPrototype({ orientation: 'FLAT', dimensions: { width: 10, height: 20 } })
    expect(flatPrototype.dimensions).toEqual({ xRadius: 5, yRadius: 11.547005383792516 })
  })

  test('accepts a radius', () => {
    const prototype = createHexPrototype({ dimensions: 1 })
    expect(prototype.dimensions).toEqual({ xRadius: 1, yRadius: 1 })
  })

  test('throws for invalid dimensions', () => {
    const invalidEllipse: Ellipse = { xRadius: -1, yRadius: -2 }
    expect(() => createHexPrototype({ dimensions: invalidEllipse })).toThrow(
      `Invalid dimensions: ${invalidEllipse}. Dimensions must be expressed as an Ellipse ({ xRadius: number, yRadius: number }), a Rectangle ({ width: number, height: number }) or a number.`,
    )

    const invalidBoundingBox: BoundingBox = { width: -1, height: -2 }
    expect(() => createHexPrototype({ dimensions: invalidBoundingBox })).toThrow(
      `Invalid dimensions: ${invalidBoundingBox}. Dimensions must be expressed as an Ellipse ({ xRadius: number, yRadius: number }), a Rectangle ({ width: number, height: number }) or a number.`,
    )

    const invalidRadius = -1
    expect(() => createHexPrototype({ dimensions: invalidRadius })).toThrow(
      `Invalid dimensions: ${invalidRadius}. Dimensions must be expressed as an Ellipse ({ xRadius: number, yRadius: number }), a Rectangle ({ width: number, height: number }) or a number.`,
    )
  })
})

describe('orientation', () => {
  test(`accepts Orientation, 'POINTY' or 'FLAT'`, () => {
    expect(createHexPrototype({ orientation: Orientations.POINTY }).orientation).toBe(Orientations.POINTY)
    expect(createHexPrototype({ orientation: 'POINTY' }).orientation).toBe(Orientations.POINTY)
    expect(createHexPrototype({ orientation: 'FLAT' }).orientation).toBe(Orientations.FLAT)
  })
})

describe('origin', () => {
  test('accepts a point', () => {
    const prototype = createHexPrototype({ origin: { x: 1, y: 2 } })
    expect(prototype.origin).toEqual({ x: 1, y: 2 })
  })

  test(`accepts 'topLeft'`, () => {
    const prototype = createHexPrototype({ origin: 'topLeft', dimensions: { width: 10, height: 10 } })
    expect(prototype.origin).toEqual({ x: -5, y: -5 })
  })

  test('accepts a function', () => {
    const callback = jest.fn(() => ({ x: 1, y: 2 }))
    const prototype = createHexPrototype({ origin: callback })

    expect(callback).toBeCalledWith(prototype)
    expect(prototype.origin).toEqual({ x: 1, y: 2 })
  })
})

// copied from internal type that Object.getOwnPropertyDescriptors() returns
type TypedPropertyDescriptors<T> = { [P in keyof T]: TypedPropertyDescriptor<T[P]> } | PropertyDescriptorMap
