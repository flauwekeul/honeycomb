import { CartesianCoordinates, HexPrototype, Orientation } from '../types'
import { heightFlat, heightPointy } from './height'
import { widthFlat, widthPointy } from './width'

export const cornersPointy = (width: number, height: number, { x, y }: CartesianCoordinates) => [
  { x: width - x, y: height * 0.25 - y },
  { x: width - x, y: height * 0.75 - y },
  { x: width * 0.5 - x, y: height - y },
  { x: 0 - x, y: height * 0.75 - y },
  { x: 0 - x, y: height * 0.25 - y },
  { x: width * 0.5 - x, y: 0 - y },
]

export const cornersFlat = (width: number, height: number, { x, y }: CartesianCoordinates) => [
  { x: width - x, y: height * 0.5 - y },
  { x: width * 0.75 - x, y: height - y },
  { x: width * 0.25 - x, y: height - y },
  { x: 0 - x, y: height * 0.5 - y },
  { x: width * 0.25 - x, y: 0 - y },
  { x: width * 0.75 - x, y: 0 - y },
]

// todo: add optional hex as 2nd param to return corners relative to hex coordinates and/or curry it?
export const corners = ({
  orientation,
  dimensions: { xRadius, yRadius },
  origin,
}: HexPrototype): CartesianCoordinates[] =>
  orientation === Orientation.POINTY
    ? cornersPointy(widthPointy(xRadius), heightPointy(yRadius), origin)
    : cornersFlat(widthFlat(xRadius), heightFlat(yRadius), origin)
