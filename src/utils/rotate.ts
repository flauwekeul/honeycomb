import { DIRECTIONS, Direction } from '../grid'
import { signedModulo } from './signedModulo'

export const rotate = (direction: Direction, steps: number): Direction => {
  const currentIndex = DIRECTIONS.indexOf(direction)
  const nextIndex = signedModulo(currentIndex + steps, DIRECTIONS.length)
  return DIRECTIONS[nextIndex]
}
