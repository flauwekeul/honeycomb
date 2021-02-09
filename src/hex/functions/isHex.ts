import { isObject } from '../../utils'
import { Hex } from '../types'

export const isHex = (value: unknown): value is Hex => isObject<Hex>(value) && !!value.__isHoneycombHex
