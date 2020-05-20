import { CubeCoordinates } from '../hex'
import { isObject } from './isObject'

export const isCube = (value: unknown): value is CubeCoordinates =>
  isObject<CubeCoordinates>(value) &&
  Number.isFinite(value.q) &&
  Number.isFinite(value.r) &&
  Number.isFinite(value.s) &&
  // todo: not sure if this is necessary
  value.q + value.r + value.s === 0
