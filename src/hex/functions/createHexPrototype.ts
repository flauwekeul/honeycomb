import { isObject, isPoint } from '../../utils'
import { DefaultHexPrototype, Ellipse, Hex, HexSettings, Orientation, Point, Rectangle } from '../types'
import { corners } from './corners'
import { height } from './height'
import { hexToPoint } from './hexToPoint'
import { isFlat } from './isFlat'
import { isPointy } from './isPointy'
import { width } from './width'

export interface HexPrototypeOptions {
  dimensions: Ellipse | Rectangle | number
  orientation: Orientation | 'pointy' | 'flat'
  origin: Point
  offset: number
}

export const defaultHexSettings: HexSettings = {
  dimensions: { xRadius: 1, yRadius: 1 },
  orientation: Orientation.POINTY,
  origin: { x: 0, y: 0 },
  offset: -1,
}

const normalizeDimensions = ({ dimensions, orientation }: HexPrototypeOptions) => {
  if (isObject(dimensions)) {
    if (Number.isFinite((dimensions as Ellipse).xRadius) && Number.isFinite((dimensions as Ellipse).yRadius)) {
      return { ...(dimensions as Ellipse) }
    }

    const { width, height } = dimensions as Rectangle
    if (Number.isFinite(width) && Number.isFinite(height)) {
      return orientation === Orientation.POINTY
        ? { xRadius: width / Math.sqrt(3), yRadius: height / 2 }
        : { xRadius: width / 2, yRadius: height / Math.sqrt(3) }
    }
  }

  if (Number.isFinite(dimensions as number)) {
    return { xRadius: dimensions, yRadius: dimensions } as Ellipse
  }

  throw new TypeError(
    `Invalid dimensions: ${dimensions}. Dimensions must be expressed as an Ellipse ({ xRadius: number, yRadius: number }), a Rectangle ({ width: number, height: number }) or a number.`,
  )
}

const normalizeOrientation = ({ orientation }: HexPrototypeOptions) => {
  orientation = orientation.toUpperCase() as Orientation

  if (orientation === Orientation.POINTY || orientation === Orientation.FLAT) {
    return orientation
  }

  throw new TypeError(`Invalid orientation: ${orientation}. Orientation must be either 'POINTY' or 'FLAT'.`)
}

const assertOrigin = ({ origin }: HexPrototypeOptions) => {
  if (!isPoint(origin)) {
    throw new TypeError(`Invalid origin: ${origin}. Origin must be expressed as a Point ({ x: number, y: number }).`)
  }

  return { ...origin }
}

const assertOffset = ({ offset }: HexPrototypeOptions) => {
  if (!Number.isFinite(offset)) {
    throw new TypeError(`Invalid offset: ${offset}. Offset must be a number.`)
  }

  return offset
}

export const createHexPrototype = <T extends DefaultHexPrototype>(
  customPrototype?: T | Partial<HexPrototypeOptions>,
) => {
  const prototype = {
    ...defaultHexSettings,

    toPoint() {
      return hexToPoint(this)
    },

    // todo: add to docs that any of the above methods will be overwritten when present in customPrototype
    ...customPrototype,
  } as T & HexPrototypeOptions

  // use Object.defineProperties() to create readonly properties
  return Object.defineProperties(prototype, {
    dimensions: { value: normalizeDimensions(prototype) },
    orientation: { value: normalizeOrientation(prototype) },
    origin: { value: assertOrigin(prototype) },
    offset: { value: assertOffset(prototype) },
    corners: {
      get() {
        return corners(this, this)
      },
    },
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
    s: {
      get() {
        // todo: typescript doesn't support this somehow: return this._s ?? -this.q - this.r
        return Number.isFinite(this._s) ? this._s : -this.q - this.r
      },
      set(s: number) {
        this._s = s
      },
    },
    width: {
      get() {
        return width(this)
      },
    },
  } as PropertyDescriptorMap & ThisType<T & Hex>) as T
}
