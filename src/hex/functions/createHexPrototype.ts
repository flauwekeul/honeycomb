import { isCartesian, isObject } from '../../utils'
import { CartesianCoordinates, DefaultHexPrototype, Ellipse, Hex, HexPrototype, Orientation, Rectangle } from '../types'
import { heightPointy } from './height'
import { createToPointPointy } from './toPoint'
import { widthPointy } from './width'

export interface HexPrototypeOptions {
  dimensions: Ellipse | Rectangle | number
  orientation: Orientation | 'pointy' | 'flat'
  origin: CartesianCoordinates | number
  offset: number
}

export const defaultPrototype: DefaultHexPrototype = {
  dimensions: { xRadius: 1, yRadius: 1 },
  orientation: Orientation.POINTY,
  // todo: why isn't this the center of the hex:
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

const normalizeOrigin = ({ origin }: HexPrototypeOptions) => {
  if (isCartesian(origin)) {
    return { ...origin } as CartesianCoordinates
  }

  if (Number.isFinite(origin)) {
    return { x: origin, y: origin } as CartesianCoordinates
  }

  throw new TypeError(
    `Invalid origin: ${origin}. Origin must be expressed as CartesianCoordinates ({ x: number, y: number }), or a number.`,
  )
}

const assertOffset = ({ offset }: HexPrototypeOptions) => {
  if (!Number.isFinite(offset)) {
    throw new TypeError(`Invalid offset: ${offset}. Offset must be a number.`)
  }

  return offset
}

export const createHexPrototype = <T>(prototype: T & Partial<HexPrototypeOptions>) => {
  const finalPrototype = { ...defaultPrototype, ...prototype } as T & HexPrototype

  // use Object.defineProperties() to create readonly properties
  Object.defineProperties(finalPrototype, {
    dimensions: { value: normalizeDimensions(finalPrototype) },
    orientation: { value: normalizeOrientation(finalPrototype) },
    origin: { value: normalizeOrigin(finalPrototype) },
    offset: { value: assertOffset(finalPrototype) },
  })

  if (finalPrototype.orientation === Orientation.POINTY) {
    Object.defineProperties(finalPrototype, {
      isFlat: { value: false },
      isPointy: { value: true },
      height: { value: heightPointy(finalPrototype.dimensions.yRadius) },
      // todo: adding toPoint() here doesn't make sense because `this` is undefined
      // `this` will be set once a Hex is created and it would make more sense to add toPoint() to the prototype there
      // but that will probably have a hit on performance
      toPoint: {
        value: function toPoint() {
          return createToPointPointy(finalPrototype.dimensions)(this)
        },
      },
      width: { value: widthPointy(finalPrototype.dimensions.xRadius) },
    } as PropertyDescriptorMap & ThisType<Hex>)
  }

  // fixme: should return T (that extends HexPrototype)
  return finalPrototype as T & HexPrototype
}
