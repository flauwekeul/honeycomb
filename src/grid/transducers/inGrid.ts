import { compose, filter, map, Transducer } from 'transducist'
import { Hex } from '../../hex'
import { Grid } from '../grid'

export const inGrid = <T extends Hex>(grid: Grid<T>): Transducer<T, T> =>
  compose(
    map<T, T | undefined>((hex) => grid.getHex(hex)),
    filter<T>(Boolean),
  )
