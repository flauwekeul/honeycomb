import { AxialCoordinates, RectangleOptions, RingFromRadiusOptions } from '../../../src'

export const TRAVERSER_NAMES = ['rectangle', 'ring'] as const
export type traverserName = (typeof TRAVERSER_NAMES)[number]

// Rectangle

export interface RectangleControlProps extends Partial<RectangleOptions> {
  start?: AxialCoordinates
}

export type RectangleControlEmits = {
  change: [value: RectangleControlProps]
}

export const defaultRectangleOptions: RectangleControlProps = {
  start: { q: 0, r: 0 },
  width: 10,
  height: 10,
  direction: 'E',
}

// Ring

export interface RingControlProps extends Partial<RingFromRadiusOptions> {
  center?: AxialCoordinates
}

export type RingControlEmits = {
  change: [value: RingControlProps]
}

export const defaultRingOptions: RingControlProps = {
  center: { q: 3, r: 3 },
  radius: 3,
  rotation: 'cw',
}

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
