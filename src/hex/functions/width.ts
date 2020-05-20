import { HexPrototype, Orientation } from '../types'

export const widthPointy = (xRadius: number) => xRadius * Math.sqrt(3)

export const widthFlat = (xRadius: number) => xRadius * 2

export const width = ({ orientation, dimensions: { xRadius } }: HexPrototype) =>
  orientation === Orientation.POINTY ? widthPointy(xRadius) : widthFlat(xRadius)
