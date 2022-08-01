import { isObject } from '../../utils'
import { Hex } from '../types'

/**
 * @category Hex
 */
export const isHex = (value: unknown): value is Hex =>
  isObject<Hex>(value) && !!(Object.getPrototypeOf(value) as Hex).__isHoneycombHex
