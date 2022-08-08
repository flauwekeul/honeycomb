import { AxialCoordinates, Hex, HexCoordinates, HexSettings } from '../hex'

/**
 * @category Traverser
 */
export type Traverser<T extends Hex, R extends Iterable<T> = T[]> = (
  createHex: (coordinates?: HexCoordinates) => T,
  cursor?: HexCoordinates,
) => R

export interface GridAsJSON {
  hexSettings: HexSettings
  coordinates: AxialCoordinates[]
}

/**
 * @category Traverser
 */
export enum Rotation {
  CLOCKWISE = 'CLOCKWISE',
  COUNTERCLOCKWISE = 'COUNTERCLOCKWISE',
}

/**
 * @category Traverser
 */
export type RotationLike = Rotation | 'CLOCKWISE' | 'clockwise' | 'COUNTERCLOCKWISE' | 'counterclockwise'
