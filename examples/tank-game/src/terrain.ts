import { BaseTile, Terrain, TerrainType } from './types'

export const FIELD: Terrain = {
  type: TerrainType.Field,
  backgroundColor: '#2ECC40',
  passable: true,
  obscurity: 0,
}

export const WATER: Terrain = {
  type: TerrainType.Water,
  backgroundColor: '#0074D9',
  passable: false,
  obscurity: 0,
}

export const TREES: Terrain = {
  type: TerrainType.Trees,
  backgroundColor: '#3D9970',
  passable: false,
  obscurity: 0.3,
}

export const BUILDING: Terrain = {
  type: TerrainType.Building,
  backgroundColor: '#999',
  passable: false,
  obscurity: 1,
}

export const ROAD: Terrain = {
  type: TerrainType.Road,
  backgroundColor: '#666',
  passable: true,
  obscurity: 0,
}

export function isPassable({ terrain }: BaseTile) {
  return terrain.passable
}
