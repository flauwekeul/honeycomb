import { Transducer } from 'transducist'
import { Hex } from '../../hex'
import { INIT, RESULT, STEP } from '../constants'

export const tap =
  <T extends Hex>(fn: (hex: T) => void): Transducer<T, T> =>
  (xf) => ({
    [INIT]: () => xf[INIT](),
    [RESULT]: (result) => xf[RESULT](result),
    [STEP]: (result, hex) => {
      fn(hex)
      return xf[STEP](result, hex)
    },
  })
