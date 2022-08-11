import { describe, expect, test } from 'vitest'
import { defaultHexSettings, Hex } from './hex'
import { CubeCoordinates, Ellipse, HexCoordinates, Orientation, Point } from './types'

describe('creation', () => {
  test('returns a hex with coordinates 0,0 when created without arguments', () => {
    expect(new Hex()).toContain<CubeCoordinates>({ q: 0, r: 0, s: 0 })
  })

  test('returns a hex from the passed hex coordinates', () => {
    expect(new Hex([1, 2])).toContain<CubeCoordinates>({ q: 1, r: 2, s: -3 })
    expect(new Hex({ col: 1, row: 2 })).toContain<CubeCoordinates>({ q: 0, r: 2, s: -2 })
    expect(new Hex({ q: 1, r: 2 })).toContain<CubeCoordinates>({ q: 1, r: 2, s: -3 })
    expect(new Hex({ r: 3, s: 0 })).toContain<CubeCoordinates>({ q: -3, r: 3, s: 0 })
    expect(new Hex({ q: -3, r: 4, s: -1 })).toContain<CubeCoordinates>({ q: -3, r: 4, s: -1 })
  })
})

test('has center property in the prototype', () => {
  const hex = new Hex()

  expect(hex.center).toEqual<Point>({ x: 0.8660254037844386, y: 1 })
  expect(Object.hasOwn(hex, 'center')).toBe(false)
})

test('implements offset coordinates in the prototype', () => {
  const hex = new Hex([1, 2])

  expect(hex.col).toBe(2)
  expect(hex.row).toBe(2)
  expect(Object.hasOwn(hex, 'col')).toBe(false)
  expect(Object.hasOwn(hex, 'row')).toBe(false)
})

test('has corners property relative to Hex(0,0) in the prototype', () => {
  const hex = new Hex()

  expect(hex.corners).toStrictEqual<Point[]>([
    { x: 0.8660254037844386, y: -0.5 },
    { x: 0.8660254037844386, y: 0.5 },
    { x: 0, y: 1 },
    { x: -0.8660254037844386, y: 0.5 },
    { x: -0.8660254037844386, y: -0.5 },
    { x: 0, y: -1 },
  ])
  expect(new Hex([3, 4]).corners).toStrictEqual<Point[]>([
    { x: 9.526279441628825, y: 5.5 },
    { x: 9.526279441628825, y: 6.5 },
    { x: 8.660254037844386, y: 7 },
    { x: 7.794228634059947, y: 6.5 },
    { x: 7.794228634059947, y: 5.5 },
    { x: 8.660254037844386, y: 5 },
  ])
  expect(Object.hasOwn(hex, 'corners')).toBe(false)
})

test('has dimensions property in the prototype', () => {
  const hex = new Hex()

  expect(hex.dimensions).toEqual<Ellipse>(defaultHexSettings.dimensions)
  expect(Object.hasOwn(hex, 'dimensions')).toBe(false)
})

test('implements a bounding box in the prototype', () => {
  const hex = new Hex()

  expect(hex.width).toBe(1.7320508075688772)
  expect(hex.height).toBe(2)
  expect(Object.hasOwn(hex, 'width')).toBe(false)
  expect(Object.hasOwn(hex, 'height')).toBe(false)
})

test('has isFlat property in the prototype', () => {
  const hex = new Hex()

  expect(hex.isFlat).toBe(false)
  expect(Object.hasOwn(hex, 'isFlat')).toBe(false)

  class FlatHex extends Hex {
    get orientation(): Orientation {
      return Orientation.FLAT
    }
  }
  expect(new FlatHex().isFlat).toBe(true)
})

test('has isPointy property in the prototype', () => {
  const hex = new Hex()

  expect(hex.isPointy).toBe(true)
  expect(Object.hasOwn(hex, 'isPointy')).toBe(false)

  class FlatHex extends Hex {
    get orientation(): Orientation {
      return Orientation.FLAT
    }
  }
  expect(new FlatHex().isPointy).toBe(false)
})

test('has orientation property in the prototype', () => {
  const hex = new Hex()

  expect(hex.orientation).toEqual<Orientation>(defaultHexSettings.orientation)
  expect(Object.hasOwn(hex, 'orientation')).toBe(false)
})

test('has origin property in the prototype', () => {
  const hex = new Hex()

  expect(hex.origin).toEqual<Point>(defaultHexSettings.origin)
  expect(Object.hasOwn(hex, 'origin')).toBe(false)
})

test('implements a point in the prototype', () => {
  const hex = new Hex([1, 2])

  expect(hex.x).toBe(3.4641016151377544)
  expect(hex.y).toBe(3)
  expect(Object.hasOwn(hex, 'x')).toBe(false)
  expect(Object.hasOwn(hex, 'y')).toBe(false)
})

test('implements axial coordinates in the instance and the s coordinate in the prototype', () => {
  const hex = new Hex([3, -1])

  expect(hex.q).toBe(3)
  expect(hex.r).toBe(-1)
  expect(hex.s).toBe(-2)
  expect(Object.hasOwn(hex, 'q')).toBe(true)
  expect(Object.hasOwn(hex, 'r')).toBe(true)
  expect(Object.hasOwn(hex, 's')).toBe(false)
})

describe('clone()', () => {
  test('returns a clone of the instance', () => {
    const hex = new Hex([6, -2])
    const result = hex.clone()

    expect(result).toContain<CubeCoordinates>({ q: 6, r: -2, s: -4 })
    expect(result).not.toBe<Hex>(hex)
  })

  test('returns a clone of the instance with different coordinates', () => {
    const hex = new Hex([6, -2])

    expect(hex.clone([1, 2])).toContain<CubeCoordinates>({ q: 1, r: 2, s: -3 })
  })

  test('maintains any custom properties', () => {
    class CustomHex extends Hex {
      custom: string
      constructor(coordinates?: HexCoordinates) {
        super(coordinates)
        this.custom = 'test'
      }
    }
    const hex = new CustomHex([3, 0])

    expect(hex.clone()).toContain<Partial<CustomHex>>({ q: 3, r: 0, s: -3, custom: 'test' })
    expect(hex.clone([0, 1])).toContain<Partial<CustomHex>>({ q: 0, r: 1, s: -1, custom: 'test' })
  })
})

describe('equals()', () => {
  test('returns whether the passed hex coordinates are equal to the instance', () => {
    const hex = new Hex([-2, 3])

    expect(hex.equals([-2, 3])).toBe(true)
    expect(hex.equals({ q: -2, r: 3 })).toBe(true)
    expect(hex.equals({ col: -1, row: 3 })).toBe(true)

    expect(hex.equals([-1, 2])).toBe(false)
  })
})

describe('toString()', () => {
  test('returns the constructor name and q and r coordinates', () => {
    const hex = new Hex([-2, 2])

    expect(hex.toString()).toBe('Hex(-2,2)')
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    expect(`${hex}`).toBe('Hex(-2,2)')

    class CustomHex extends Hex {}
    expect(new CustomHex([4, 0]).toString()).toBe('CustomHex(4,0)')
  })
})

describe('translate', () => {
  test('returns a clone of the instance with the delta partial cube coordinates', () => {
    const hex = new Hex([3, 0])
    expect(hex.translate({ q: -2, r: 1 })).toContain<CubeCoordinates>({ q: 1, r: 1, s: -2 })
  })
})
