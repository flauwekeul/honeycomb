import { AxialCoordinates } from '../hex'
import { isObject } from './isObject'

export const isAxial = (value: unknown): value is AxialCoordinates =>
  isObject<AxialCoordinates>(value) && Number.isFinite(value.q) && Number.isFinite(value.r)
