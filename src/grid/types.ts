import { AxialCoordinates, Hex, HexCoordinates, HexSettings } from '../hex'

/**
 * @category Traverser
 */
export type Traverser<T extends Hex, R extends Iterable<T> = T[]> = (
  createHex: (coordinates?: HexCoordinates) => T,
  cursor?: HexCoordinates,
) => R

export interface GridAsJSON<T extends Hex> {
  hexSettings: HexSettings & Omit<T, keyof Hex>
  coordinates: AxialCoordinates[]
}

export enum Rotation {
  CLOCKWISE = 'CLOCKWISE',
  COUNTERCLOCKWISE = 'COUNTERCLOCKWISE',
}

export type RotationLike = Rotation | 'CLOCKWISE' | 'clockwise' | 'COUNTERCLOCKWISE' | 'counterclockwise'
