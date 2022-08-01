import { HexSettings, Orientation } from '../types'

/**
 * @hidden
 */
export const heightPointy = (yRadius: number) => yRadius * 2

/**
 * @hidden
 */
export const heightFlat = (yRadius: number) => yRadius * Math.sqrt(3)

/**
 * @category Hex
 */
export const height = ({ orientation, dimensions: { yRadius } }: HexSettings) =>
  orientation === Orientation.POINTY ? heightPointy(yRadius) : heightFlat(yRadius)
