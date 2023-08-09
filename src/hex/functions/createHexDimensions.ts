import { isBoundingBox, isEllipse } from '../../utils'
import { BoundingBox, Ellipse, Orientation } from '../types'

/**
 * @category Hex
 */
export function createHexDimensions(radius: number): Ellipse
export function createHexDimensions(boundingBox: BoundingBox, orientation: Orientation): Ellipse
export function createHexDimensions(ellipse: Ellipse): Ellipse
export function createHexDimensions(input: number | BoundingBox | Ellipse, orientation?: Orientation): Ellipse {
  if (isEllipse(input)) {
    return input
  }

  if (isBoundingBox(input)) {
    const { width, height } = input
    return orientation === 'pointy'
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
