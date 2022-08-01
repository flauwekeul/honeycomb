import { HexSettings, Orientation } from '../types'

/**
 * @category Hex
 */
export const isPointy = ({ orientation }: HexSettings) => orientation === Orientation.POINTY
