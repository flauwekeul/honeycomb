import { Hex } from '../../hex'
import { Grid } from '../grid'
import { GridStore } from '../types'

export const inStore = <T extends Hex, S extends GridStore<T>, G extends GridStore<T>>(store?: S) => (
  hex: T,
  grid: Grid<T, G>,
): boolean => !!(store ?? grid.store)?.get(hex.toString())
