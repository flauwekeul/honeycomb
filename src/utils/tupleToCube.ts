import { TupleCoordinates } from '../hex'

/**
 * @category Coordinates
 */
export const tupleToCube = ([q, r, s = -q - r]: TupleCoordinates) => ({ q, r, s })
