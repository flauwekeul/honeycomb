import { HexSettings, Orientation } from '../types'

export const heightPointy = (yRadius: number) => yRadius * 2

export const heightFlat = (yRadius: number) => yRadius * Math.sqrt(3)

export const height = ({ orientation, dimensions: { yRadius } }: HexSettings) =>
  orientation === Orientation.POINTY ? heightPointy(yRadius) : heightFlat(yRadius)
