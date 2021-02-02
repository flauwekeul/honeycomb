import { CubeCoordinates } from '../hex'

// fixme: compass has 8 directions, this should too?
export const RECTANGLE_DIRECTIONS = [
  ['q', 'r', 's'],
  ['r', 'q', 's'],
  ['r', 's', 'q'],
  ['s', 'r', 'q'],
  ['s', 'q', 'r'],
  ['q', 's', 'r'],
] as [keyof CubeCoordinates, keyof CubeCoordinates, keyof CubeCoordinates][]
