import { CartesianCoordinates, CubeCoordinates } from '../coordinates'

export const enum Orientation {
  FLAT = 'FLAT',
  POINTY = 'POINTY',
}

export interface HexPrototype {
  size: number
  orientation: Orientation
  origin: number
  offset: number
}

export type Hex = HexPrototype & CartesianCoordinates & CubeCoordinates
