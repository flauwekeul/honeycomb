import { isCartesian, isObject } from '../../utils'
import { CartesianCoordinates, Ellipse, HexPrototype, Orientation, Rectangle } from '../types'

export interface HexPrototypeOptions {
  dimensions: Ellipse | Rectangle | number
  orientation: Orientation | 'pointy' | 'flat'
  origin: CartesianCoordinates | number
  offset: number
}

export const defaultPrototype: HexPrototype = {
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

  finalPrototype.dimensions = normalizeDimensions(finalPrototype)
  finalPrototype.orientation = normalizeOrientation(finalPrototype)
  finalPrototype.origin = normalizeOrigin(finalPrototype)
  finalPrototype.offset = assertOffset(finalPrototype)

  return finalPrototype
}
