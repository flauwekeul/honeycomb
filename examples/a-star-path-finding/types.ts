import { AxialCoordinates, Grid, Hex, HexCoordinates } from '../../src'

export interface AStarOptions<T extends Hex> {
  grid: Grid<T>
  start: HexCoordinates
  target: HexCoordinates
  isPassable: (hex: T) => boolean
  getCost?: (coordinates: AxialCoordinates) => number
  getDistance?: (from: HexCoordinates, to: HexCoordinates) => number
}

export interface PathData {
  coordinates: AxialCoordinates
  g: number // total cost from start to current
  h: number // (estimated) distance from current to target
  f: number // g + h
}
