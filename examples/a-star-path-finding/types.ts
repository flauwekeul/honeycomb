import { AxialCoordinates } from '../../src'

export interface PathData {
  coordinates: AxialCoordinates
  g: number // total cost from start to current
  h: number // (estimated) distance from current to target
  f: number // g + h
}
