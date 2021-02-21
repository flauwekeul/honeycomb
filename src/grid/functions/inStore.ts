import { Hex } from '../../hex'
import { Grid } from '../grid'

export const inStore = <T extends Hex>(store?: Map<string, T>) => (hex: T, grid: Grid<T>): boolean =>
  !!(store ?? grid.store)?.get(hex.toString())
