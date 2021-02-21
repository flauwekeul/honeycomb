import { Hex } from '../../hex'
import { Grid } from '../grid'
import { GridStore } from '../types'

export const setStore = <T extends Hex, S extends GridStore<T>, G extends GridStore<T>>(store?: S) => (
  hex: T,
  grid: Grid<T, G>,
): GridStore<T> | void => (store ?? grid.store)?.set(hex.toString(), hex)
