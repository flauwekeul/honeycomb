import { OffsetCoordinates } from '../hex'
import { isObject } from './isObject'

/**
 * @category Coordinates
 */
export const isOffset = (value: unknown): value is OffsetCoordinates =>
  isObject<OffsetCoordinates>(value) && Number.isFinite(value.col) && Number.isFinite(value.row)
