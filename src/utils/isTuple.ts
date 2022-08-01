import { TupleCoordinates } from '../hex'

/**
 * @category Coordinates
 */
export const isTuple = (value: unknown): value is TupleCoordinates =>
  Array.isArray(value) && Number.isFinite(value[0]) && Number.isFinite(value[1])
