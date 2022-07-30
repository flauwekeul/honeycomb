import { G } from '@svgdotjs/svg.js'
import { AxialCoordinates, Grid, Hex, HexCoordinates } from '../../src'

export interface Tile extends Hex {
  cost: number // when 999, the tile is impassable
  isPassable(this: this): boolean
  svg: G
}

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
