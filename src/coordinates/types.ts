export interface CartesianCoordinates {
  x: number
  y: number
}

export interface CubeCoordinates {
  q: number
  r: number
  s: number
}

export type Coordinates = CartesianCoordinates | CubeCoordinates
