import { AxialCoordinates } from '../hex'
import { isNumber } from './isNumber'
import { isObject } from './isObject'

/**
 * @category Coordinates
 */
export const isAxial = (value: unknown): value is AxialCoordinates =>
  isObject<AxialCoordinates>(value) && isNumber(value.q) && isNumber(value.r)
