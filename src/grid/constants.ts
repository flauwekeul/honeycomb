import { AxialCoordinates, CubeCoordinates } from '../hex'

export const DIRECTION_COORDINATES: AxialCoordinates[] = [
  { q: 1, r: 0 },
  { q: 0, r: 1 },
  { q: -1, r: 1 },
  { q: -1, r: 0 },
  { q: 0, r: -1 },
  { q: 1, r: -1 },
]

export const RECTANGLE_DIRECTIONS = [
  ['q', 'r', 's'],
  ['r', 'q', 's'],
  ['r', 's', 'q'],
  ['s', 'r', 'q'],
  ['s', 'q', 'r'],
  ['q', 's', 'r'],
] as [keyof CubeCoordinates, keyof CubeCoordinates, keyof CubeCoordinates][]
