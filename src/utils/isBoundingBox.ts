import { BoundingBox } from '../hex'
import { isObject } from './isObject'

/**
 * Determines whether the passed value is a valid {@link BoundingBox}.
 *
 * @category Util
 */
export const isBoundingBox = (value: unknown): value is BoundingBox =>
  isObject<BoundingBox>(value) && value.width > 0 && value.height > 0
