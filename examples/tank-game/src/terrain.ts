import { BaseTile, Terrain, TerrainType } from './types'

export const FIELD: Terrain = {
  type: TerrainType.Field,
  backgroundColor: '#2ECC40',
  passable: true,
  opaque: false,
}

export const WATER: Terrain = {
  type: TerrainType.Water,
  backgroundColor: '#0074D9',
  passable: false,
  opaque: false,
}

export const TREES: Terrain = {
  type: TerrainType.Trees,
  backgroundColor: '#3D9970',
  passable: false,
  opaque: true,
}

export const BUILDING: Terrain = {
  type: TerrainType.Building,
  backgroundColor: '#999',
  passable: false,
  opaque: true,
}

export const ROAD: Terrain = {
  type: TerrainType.Road,
  backgroundColor: '#666',
  passable: true,
  opaque: false,
}

export function isPassable({ terrain }: BaseTile) {
  return terrain.passable
}
