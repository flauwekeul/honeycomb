import { Point } from '../hex'
import { isNumber } from './isNumber'
import { isObject } from './isObject'

export const isPoint = (value: unknown): value is Point =>
  isObject<Point>(value) && isNumber(value.x) && isNumber(value.y)
