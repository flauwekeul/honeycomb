import { isPoint } from '../../utils'
import { BoundingBox, Point } from '../types'

export function createHexOrigin(input: 'topLeft', boundingBox: BoundingBox): Point
export function createHexOrigin(input: Point): Point
export function createHexOrigin(input: Point | 'topLeft', boundingBox?: BoundingBox): Point {
  if (isPoint(input)) return input

  if (!boundingBox)
    throw new TypeError(
      `Supply a bounding box ({ width: number, height: number }). Received: ${JSON.stringify(boundingBox)}`,
    )

  if (input === 'topLeft') return { x: boundingBox.width * -0.5, y: boundingBox.height * -0.5 }

  throw new TypeError(
    `Invalid origin: ${JSON.stringify(
      input,
    )}. Origin must be expressed as a Point ({ x: number, y: number }) or the string 'topLeft'.`,
  )
}
