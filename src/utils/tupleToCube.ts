import { TupleCoordinates } from '../hex'

export const tupleToCube = ([q, r, s = -q - r]: TupleCoordinates) => ({ q, r, s })
