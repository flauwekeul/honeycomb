import { Terrain, TerrainType } from './types'

export const FIELD: Terrain = {
  type: TerrainType.Field,
  passable: true,
  opaque: false,
}

export const WATER: Terrain = {
  type: TerrainType.Water,
  passable: false,
  opaque: false,
}

export const TREES: Terrain = {
  type: TerrainType.Trees,
  passable: false,
  opaque: true,
}

export const BUILDING: Terrain = {
  type: TerrainType.Building,
  passable: false,
  opaque: true,
}

export const ROAD: Terrain = {
  type: TerrainType.Road,
  passable: true,
  opaque: false,
}
