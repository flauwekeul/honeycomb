import { Point } from '../hex'
import { isObject } from './isObject'

export const isPoint = (value: unknown): value is Point =>
  isObject<Point>(value) && Number.isFinite(value.x) && Number.isFinite(value.y)

export const isCartesian = isPoint
