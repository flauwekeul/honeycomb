import { CubeCoordinates } from '../hex'
import { isObject } from './isObject'

export const isCube = (value: unknown): value is CubeCoordinates =>
  isObject<CubeCoordinates>(value) &&
  Number.isFinite(value.q) &&
  Number.isFinite(value.r) &&
  Number.isFinite(value.s) &&
  value.q + value.r + value.s === 0
