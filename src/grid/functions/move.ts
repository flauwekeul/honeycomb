import { HexCoordinates } from '../../hex'
import { FlatCompassDirection, PointyCompassDirection } from '../types'

export const move = (direction: PointyCompassDirection | FlatCompassDirection) =>
  function* next({ q, r }: HexCoordinates) {
    console.warn('fixme: this always returns the same hex coordinate')
    yield { q: q + 1, r }
  }
