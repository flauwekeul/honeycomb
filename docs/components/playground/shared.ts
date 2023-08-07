import { AxialCoordinates, LineBetweenOptions, RectangleOptions, RingFromRadiusOptions } from '../../../src'

export const TRAVERSER_NAMES = ['line', 'rectangle', 'ring'] as const
export type traverserName = (typeof TRAVERSER_NAMES)[number]

type ControlEmits<T> = {
  change: [value: T]
}

// Line

export interface LineControlProps extends Partial<LineBetweenOptions> {
  start?: AxialCoordinates
  stop?: AxialCoordinates
}
export const defaultLineOptions: LineControlProps = {
  start: { q: 0, r: 1 },
  stop: { q: 6, r: 6 },
}
export type LineControlEmits = ControlEmits<LineControlProps>

// Rectangle

export interface RectangleControlProps extends Partial<RectangleOptions> {
  start?: AxialCoordinates
}
export const defaultRectangleOptions: RectangleControlProps = {
  start: { q: 0, r: 0 },
  width: 10,
  height: 10,
  direction: 'E',
}
export type RectangleControlEmits = ControlEmits<RectangleControlProps>

// Ring

export interface RingControlProps extends Partial<RingFromRadiusOptions> {
  center?: AxialCoordinates
}
export const defaultRingOptions: RingControlProps = {
  center: { q: 3, r: 3 },
  radius: 3,
  rotation: 'cw',
}
export type RingControlEmits = ControlEmits<RingControlProps>

// Utils

export const toVueDefaults = <T extends {}>(props: T) =>
  Object.fromEntries(
    Object.entries(props).map(([key, value]) => {
      if (value && typeof value === 'object') {
        return [key, () => value]
      }
      return [key, value]
    }),
  )
