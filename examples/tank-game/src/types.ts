import { G } from '@svgdotjs/svg.js'
import { Hex, HexCoordinates } from 'honeycomb-grid'

export interface BaseTile {
  terrain: Terrain
  element: G
}

export type Tile = BaseTile & Hex

export interface Terrain {
  type: TerrainType
  backgroundColor: string
  passable: boolean
  obscurity: number
}

export enum TerrainType {
  Field = 'Field',
  Water = 'Water',
  Trees = 'Trees',
  Building = 'Building',
  Road = 'Road',
}

export interface GameState {
  playerCoordinates: HexCoordinates
}
