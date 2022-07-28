import { G } from '@svgdotjs/svg.js'
import { Hex, HexCoordinates } from 'honeycomb-grid'

export interface BaseTile {
  terrain: Terrain
  visibility: tileVisibility
  element: G
}

export type Tile = BaseTile & Hex

export type tileVisibility = 'undiscovered' | 'discovered' | 'visible'

export interface Terrain {
  type: TerrainType
  passable: boolean
  opaque: boolean
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
