import { signedModulo } from '../utils'

export enum CompassDirection {
  N,
  NE,
  E,
  SE,
  S,
  SW,
  W,
  NW,
}

// todo: add lowercase strings to this type
// todo: use CompassDirectionLike as much as possible (instead of regular CompassDirection), this requires a util to convert this type to CompassDirection
export type CompassDirectionLike = keyof typeof CompassDirection | number

export class Compass {
  static N = CompassDirection.N
  static NE = CompassDirection.NE
  static E = CompassDirection.E
  static SE = CompassDirection.SE
  static S = CompassDirection.S
  static SW = CompassDirection.SW
  static W = CompassDirection.W
  static NW = CompassDirection.NW

  static of(direction: CompassDirectionLike = CompassDirection.N) {
    return new Compass(direction)
  }

  static rotate(direction: number, steps: number): CompassDirection {
    return signedModulo(direction + steps, 8)
  }

  direction: CompassDirection

  constructor(direction: CompassDirectionLike = CompassDirection.N) {
    this.direction = typeof direction === 'number' ? direction : CompassDirection[direction]
  }

  rotate(steps: number) {
    return Compass.rotate(this.direction, steps)
  }
}
