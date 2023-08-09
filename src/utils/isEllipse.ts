import { Ellipse } from '../hex'
import { isObject } from './isObject'

/**
 * Determines whether the passed value is a valid {@link Ellipse}.
 *
 * @category Util
 */
export const isEllipse = (value: unknown): value is Ellipse =>
  isObject<Ellipse>(value) && value.xRadius > 0 && value.yRadius > 0
