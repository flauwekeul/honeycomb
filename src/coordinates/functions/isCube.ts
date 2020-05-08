import { isObject } from '../../utils'
import { CubeCoordinates } from '../types'

export const isCube = (value: unknown): value is CubeCoordinates =>
  isObject<CubeCoordinates>(value) && Number.isFinite(value.q) && Number.isFinite(value.r) && Number.isFinite(value.s)
