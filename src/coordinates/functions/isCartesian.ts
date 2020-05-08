import { isObject } from '../../utils'
import { CartesianCoordinates } from '../types'

export const isCartesian = (value: unknown): value is CartesianCoordinates =>
  isObject<CartesianCoordinates>(value) && Number.isFinite(value.x) && Number.isFinite(value.y)
