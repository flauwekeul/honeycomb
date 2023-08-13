import { AxialCoordinates, LineBetweenOptions, RectangleOptions, RingFromRadiusOptions, SpiralOptions } from '../src'

export type CoordinatesType = 'hide' | 'axial' | 'offset'

export const TRAVERSER_NAMES = ['line', 'rectangle', 'ring', 'spiral'] as const
export type TraverserName = (typeof TRAVERSER_NAMES)[number]

export interface TraverserControlProps {
  name: TraverserName
  line: LineControlProps
  rectangle: RectangleControlProps
  ring: RingControlProps
  spiral: SpiralControlProps
}

export interface LineControlProps extends LineBetweenOptions {
  start?: AxialCoordinates
  stop: AxialCoordinates
}

export interface RectangleControlProps extends RectangleOptions {
  start?: AxialCoordinates
}

export interface RingControlProps extends RingFromRadiusOptions {
  center: AxialCoordinates
}

export interface SpiralControlProps extends SpiralOptions {
  start?: AxialCoordinates
}
