import { HexSettings, Orientation } from '../types'

/**
 * @hidden
 */
export const widthPointy = (xRadius: number) => xRadius * Math.sqrt(3)

/**
 * @hidden
 */
export const widthFlat = (xRadius: number) => xRadius * 2

/**
 * @category Hex
 */
export const width = ({ orientation, dimensions: { xRadius } }: HexSettings) =>
  orientation === Orientation.POINTY ? widthPointy(xRadius) : widthFlat(xRadius)
