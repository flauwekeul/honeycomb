import { TupleCoordinates } from '../hex'
import { isNumber } from './isNumber'

/**
 * @category Coordinates
 */
export const isTuple = (value: unknown): value is TupleCoordinates =>
  Array.isArray(value) && isNumber(value[0]) && isNumber(value[1])
