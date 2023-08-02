import { OffsetCoordinates } from '../hex'
import { isNumber } from './isNumber'
import { isObject } from './isObject'

/**
 * Determines whether the passed value is an object with offset coordinates, e.g.: `{ col: 1, row: 2 }`.
 *
 * @category Coordinates
 */
export const isOffset = (value: unknown): value is OffsetCoordinates =>
  isObject<OffsetCoordinates>(value) && isNumber(value.col) && isNumber(value.row)
