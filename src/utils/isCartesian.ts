import { CartesianCoordinates } from '../hex'
import { isObject } from './isObject'

export const isCartesian = (value: unknown): value is CartesianCoordinates =>
  isObject<CartesianCoordinates>(value) && Number.isFinite(value.x) && Number.isFinite(value.y)
