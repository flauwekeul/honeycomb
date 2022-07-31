import { isOffset, isTuple, tupleToCube } from '../../utils'
import { Hex, HexCoordinates } from '../types'
import { offsetToCube } from './offsetToCube'

export const cloneHex = <T extends Hex>(hex: T, newProps: Partial<T> | HexCoordinates = {}): T => {
  if (isOffset(newProps)) {
    const { col, row, ...otherProps } = newProps
    const coordinates = offsetToCube(hex, { col, row })
    return Object.assign(Object.create(Object.getPrototypeOf(hex) as T) as T, hex, coordinates, otherProps)
  }

  newProps = isTuple(newProps) ? tupleToCube(newProps) : newProps
  return Object.assign(Object.create(Object.getPrototypeOf(hex) as T) as T, hex, newProps)
}
