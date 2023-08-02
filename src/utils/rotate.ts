import { DIRECTIONS, Direction } from '../grid'
import { signedModulo } from './signedModulo'

/**
 * Takes a current direction and an amount of steps and returns a new direction.
 *
 * A positive amount of steps rotates clockwise, a negative amount of steps rotates counterclockwise.
 *
 * It takes 8 steps to make a full rotation (see {@link DIRECTIONS}). If `steps` is greater than `8` or less than `-8`,
 * it "wraps around" and its remainder is used.
 *
 * @example
 * ```ts
 * // rotate 2 steps clockwise
 * rotate('N', 2) // returns 'E'
 *
 * // rotate 4 steps counterclockwise
 * rotate('N', -4) // returns 'S'
 *
 * // rotate 3 steps clockwise
 * rotate('N', 11) // returns 'SE'
 * ```
 *
 * @category Util
 */
export const rotate = (direction: Direction, steps: number): Direction => {
  const currentIndex = DIRECTIONS.indexOf(direction)
  const nextIndex = signedModulo(currentIndex + steps, DIRECTIONS.length)
  return DIRECTIONS[nextIndex]
}
