import { isObject } from '../../utils'
import { BoundingBox, Ellipse, Orientation } from '../types'

/**
 * @category Hex
 */
export function createHexDimensions(radius: number): Ellipse
export function createHexDimensions(boundingBox: BoundingBox, orientation: Orientation): Ellipse
export function createHexDimensions(ellipse: Ellipse): Ellipse
export function createHexDimensions(input: number | BoundingBox | Ellipse, orientation?: Orientation): Ellipse {
  if (isObject<Ellipse>(input) && input.xRadius > 0 && input.yRadius > 0) {
    return input
  }

  if (isObject<BoundingBox>(input) && input.width > 0 && input.height > 0) {
    const { width, height } = input
    return orientation === Orientation.POINTY
      ? { xRadius: width / Math.sqrt(3), yRadius: height / 2 }
      : { xRadius: width / 2, yRadius: height / Math.sqrt(3) }
  }

  if (input > 0) {
    return { xRadius: input, yRadius: input } as Ellipse
  }

  throw new TypeError(
    `Invalid dimensions: ${JSON.stringify(
      input,
    )}. Dimensions must be expressed as an Ellipse ({ xRadius: number, yRadius: number }), a Rectangle ({ width: number, height: number }) or a number.`,
  )
}
