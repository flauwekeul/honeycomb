import { HexCoordinates, HexPrototype, Orientation } from '../types'
import { cloneHex } from './cloneHex'
import { corners } from './corners'
import { createHex } from './createHex'
import { createHexPrototype } from './createHexPrototype'
import { equals } from './equals'

jest.mock('./cloneHex')
jest.mock('./corners')
jest.mock('./equals')
jest.mock('./height')
jest.mock('./hexToOffset')
jest.mock('./hexToPoint')
jest.mock('./isFlat')
jest.mock('./isPointy')
jest.mock('./width')

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
      value: Orientation.POINTY,
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

// copied from internal type that Object.getOwnPropertyDescriptors() returns
type TypedPropertyDescriptors<T> = { [P in keyof T]: TypedPropertyDescriptor<T[P]> } | PropertyDescriptorMap
