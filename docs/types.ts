import {
  AxialCoordinates,
  LineAsVectorOptions,
  LineBetweenOptions,
  RectangleOptions,
  RingFromRadiusOptions,
  RingOptions,
  SpiralOptions,
} from '../src'

export type CoordinatesType = 'hide' | 'axial' | 'offset'

export const TRAVERSER_NAMES = [
  'lineBetween',
  'lineAsVector',
  'rectangle',
  'opposingCorners',
  'ring',
  'ringFromRadius',
  'spiral',
] as const
export type TraverserName = (typeof TRAVERSER_NAMES)[number]

export interface TraverserControlProps {
  name: TraverserName
  lineBetween: LineBetweenProps
  lineAsVector: LineAsVectorProps
  rectangle: RectangleControlProps
  opposingCorners: OpposingCornersControlProps
  ring: RingControlProps
  ringFromRadius: RingFromRadiusControlProps
  spiral: SpiralControlProps
}

export interface LineBetweenProps extends LineBetweenOptions {
  start?: AxialCoordinates
  stop: AxialCoordinates
}

export interface LineAsVectorProps extends LineAsVectorOptions {
  start?: AxialCoordinates
}

export interface RectangleControlProps extends RectangleOptions {
  start?: AxialCoordinates
}

export interface OpposingCornersControlProps {
  cornerA: AxialCoordinates
  cornerB: AxialCoordinates
}

export interface RingControlProps extends RingOptions {
  start?: AxialCoordinates
  center: AxialCoordinates
}

export interface RingFromRadiusControlProps extends RingFromRadiusOptions {
  center: AxialCoordinates
}

export interface SpiralControlProps extends SpiralOptions {
  start?: AxialCoordinates
}
