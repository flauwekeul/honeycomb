import { OffsetCoordinates } from '../hex'
import { isNumber } from './isNumber'
import { isObject } from './isObject'

/**
 * @category Coordinates
 */
export const isOffset = (value: unknown): value is OffsetCoordinates =>
  isObject<OffsetCoordinates>(value) && isNumber(value.col) && isNumber(value.row)
