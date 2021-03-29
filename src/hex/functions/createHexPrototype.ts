import { isFunction, isObject, isPoint } from '../../utils'
import { BoundingBox, Ellipse, Hex, HexPrototype, HexSettings, Orientation, Orientations, Point } from '../types'
import { cloneHex } from './cloneHex'
import { corners } from './corners'
import { equals } from './equals'
import { height } from './height'
import { hexToOffset } from './hexToOffset'
import { hexToPoint } from './hexToPoint'
import { isFlat } from './isFlat'
import { isPointy } from './isPointy'
import { toString } from './toString'
import { width } from './width'

export const defaultHexSettings: HexSettings = {
  dimensions: { xRadius: 1, yRadius: 1 },
  orientation: Orientations.POINTY,
  origin: { x: 0, y: 0 },
  offset: -1,
}

export const createHexPrototype = <T extends Hex>(options?: Partial<T | HexPrototypeOptions>): T => {
  // pseudo private property
  const s = new WeakMap()

  const prototype = {
    ...defaultHexSettings,
    clone(newProps) {
      return cloneHex(this, newProps)
    },
    equals(coordinates) {
      return equals(this, coordinates)
    },
    toString() {
      return toString(this)
    },
    // todo: add to docs that any of the above methods will be overwritten when present in customPrototype
    ...options,
  } as T & HexPrototypeOptions

  // use Object.defineProperties() to create readonly properties
  // origin is set in the final "step"
  Object.defineProperties(prototype, {
    [Symbol.toStringTag]: { value: 'Hex' },
    __isHoneycombHex: { value: true, writable: false },
    // todo: all props set with `value` are writable (somehow the default `writable: false` doesn't apply). Not sure if this is a problem though
    // see: Object.getOwnPropertyDescriptors(hexPrototype)
    col: {
      get() {
        return hexToOffset(this).col
      },
    },
    corners: {
      get() {
        return corners(this)
      },
    },
    dimensions: { value: normalizeDimensions(prototype) },
    height: {
      get() {
        return height(this)
      },
    },
    isFlat: {
      get() {
        return isFlat(this)
      },
    },
    isPointy: {
      get() {
        return isPointy(this)
      },
    },
    orientation: { value: normalizeOrientation(prototype) },
    offset: { value: assertOffset(prototype) },
    row: {
      get() {
        return hexToOffset(this).row
      },
    },
    s: {
      get() {
        return Number.isFinite(s.get(this)) ? s.get(this) : -this.q - this.r
      },
      set(_s: number) {
        s.set(this, _s)
      },
    },
    width: {
      get() {
        return width(this)
      },
    },
    x: {
      get() {
        return hexToPoint(this).x
      },
    },
    y: {
      get() {
        return hexToPoint(this).y
      },
    },
  } as PropertyDescriptorMap & ThisType<T & Hex>)

  return Object.defineProperties(prototype, {
    origin: { value: normalizeOrigin<T>(prototype) },
  })
}

export interface OriginFn {
  <T extends Omit<HexPrototype, 'origin'>>(prototype: T): Point
}

export interface HexPrototypeOptions {
  dimensions: Ellipse | BoundingBox | number
  orientation: Orientation
  origin: Point | 'topLeft' | OriginFn
  offset: number
}

function normalizeDimensions(prototype: HexPrototypeOptions) {
  const { dimensions } = prototype

  if (isObject(dimensions)) {
    if ((dimensions as Ellipse).xRadius > 0 && (dimensions as Ellipse).yRadius > 0) {
      return { ...(dimensions as Ellipse) }
    }

    const { width, height } = dimensions as BoundingBox
    if (width > 0 && height > 0) {
      return normalizeOrientation(prototype) === Orientations.POINTY
        ? { xRadius: width / Math.sqrt(3), yRadius: height / 2 }
        : { xRadius: width / 2, yRadius: height / Math.sqrt(3) }
    }
  }

  if (dimensions > 0) {
    return { xRadius: dimensions, yRadius: dimensions } as Ellipse
  }

  throw new TypeError(
    `Invalid dimensions: ${dimensions}. Dimensions must be expressed as an Ellipse ({ xRadius: number, yRadius: number }), a Rectangle ({ width: number, height: number }) or a number.`,
  )
}

function normalizeOrientation({ orientation }: HexPrototypeOptions) {
  orientation = orientation as Orientation

  if (orientation === Orientations.POINTY || orientation === Orientations.FLAT) {
    return orientation
  }

  throw new TypeError(`Invalid orientation: ${orientation}. Orientation must be either 'POINTY' or 'FLAT'.`)
}

function assertOffset({ offset }: HexPrototypeOptions) {
  if (!Number.isFinite(offset)) {
    throw new TypeError(`Invalid offset: ${offset}. Offset must be a number.`)
  }

  return offset
}

// origin can be a function that will be called with the almost-complete hex prototype (complete except for origin)
function normalizeOrigin<T extends HexPrototype>(
  prototype: Omit<T, 'origin'> & Pick<HexPrototypeOptions, 'origin'>,
): Point {
  const { origin } = prototype

  if (isPoint(origin)) {
    return { ...origin }
  }

  if (origin === 'topLeft') {
    return { x: prototype.width * -0.5, y: prototype.height * -0.5 }
  }

  if (isFunction<OriginFn>(origin)) {
    return origin(prototype)
  }

  throw new TypeError(
    `Invalid origin: ${origin}. Origin must be expressed as a Point ({ x: number, y: number }), 'topLeft' or a function that returns a Point.`,
  )
}
