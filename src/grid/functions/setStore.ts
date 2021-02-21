import { Hex } from '../../hex'
import { Grid } from '../grid'

export const setStore = <T extends Hex>(store?: Map<string, T>) => (hex: T, grid: Grid<T>) =>
  (store ?? grid.store)?.set(hex.toString(), hex)
