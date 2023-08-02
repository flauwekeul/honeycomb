import { AxialCoordinates } from '../hex'
import { isNumber } from './isNumber'
import { isObject } from './isObject'

/**
 * Determines whether the passed value is an object with axial coordinates, e.g.: `{ q: 1, r: 2 }`.
 *
 * @category Coordinates
 */
export const isAxial = (value: unknown): value is AxialCoordinates =>
  isObject<AxialCoordinates>(value) && isNumber(value.q) && isNumber(value.r)
