import { isOffset, isTuple, tupleToCube } from '../../utils'
import { Hex, HexCoordinates } from '../types'
import { isHex } from './isHex'
import { offsetToCube } from './offsetToCube'

export const createHex = <T extends Hex>(prototypeOrHex: T, props: Partial<T> | HexCoordinates = { q: 0, r: 0 }): T => {
  if (isHex(prototypeOrHex)) {
    return prototypeOrHex.clone(props)
  }

  if (isOffset(props)) {
    const { col, row, ...otherProps } = props
    const coordinates = offsetToCube(prototypeOrHex, { col, row })
    return Object.assign(Object.create(prototypeOrHex) as T, coordinates, otherProps)
  }

  props = isTuple(props) ? tupleToCube(props) : props
  return Object.assign(Object.create(prototypeOrHex) as T, props)
}
