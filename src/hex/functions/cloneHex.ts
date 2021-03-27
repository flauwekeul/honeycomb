import { isOffset } from '../../utils'
import { Hex, HexCoordinates } from '../types'
import { offsetToAxial } from './offsetToAxial'

export const cloneHex = <T extends Hex>(hex: T, newProps: Partial<T> | HexCoordinates = {}): T => {
  if (isOffset(newProps)) {
    const { col, row, ...otherProps } = newProps
    const coordinates = offsetToAxial({ col, row }, hex)
    return Object.assign(Object.create(Object.getPrototypeOf(hex)), hex, coordinates, otherProps)
  }

  return Object.assign(Object.create(Object.getPrototypeOf(hex)), hex, newProps)
}
