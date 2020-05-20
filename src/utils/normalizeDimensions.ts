import { isObject } from '.'
import { Ellipse, HexPrototype, Orientation, Rectangle } from '../hex/types'

export const normalizeDimensions = ({ dimensions, orientation }: HexPrototype) => {
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
