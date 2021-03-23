import { Hex } from '../../hex'
import { Grid } from '../grid'

export const inStore = <T extends Hex>(hex: T, grid: Grid<T>) => grid.store.has(hex.toString())
