import { Point } from '../hex'
import { isNumber } from './isNumber'
import { isObject } from './isObject'

/**
 * Determines whether the passed value is an object with point coordinates, e.g.: `{ x: 1, y: 2 }`.
 *
 * @category Coordinates
 */
export const isPoint = (value: unknown): value is Point =>
  isObject<Point>(value) && isNumber(value.x) && isNumber(value.y)
