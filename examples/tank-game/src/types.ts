import { Hex } from 'honeycomb-grid'

export interface BaseTile {
  terrain: Terrain
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
