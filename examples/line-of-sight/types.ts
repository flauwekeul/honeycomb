import { HexCoordinates } from '../../src'

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
