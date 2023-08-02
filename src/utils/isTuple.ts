import { TupleCoordinates } from '../hex'
import { isNumber } from './isNumber'

/**
 * Determines whether the passed value are tuple coordinates (an array containing exactly 2 numbers), e.g.: `[1, 2]`.
 *
 * @category Coordinates
 */
export const isTuple = (value: unknown): value is TupleCoordinates =>
  Array.isArray(value) && isNumber(value[0]) && isNumber(value[1])
