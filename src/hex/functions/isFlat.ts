import { HexSettings, Orientation } from '../types'

/**
 * @category Hex
 */
export const isFlat = ({ orientation }: HexSettings) => orientation === Orientation.FLAT
