import { Direction } from '../grid'
import { signedModulo } from './signedModulo'

export const rotate = (direction: number, steps: number): Direction => signedModulo(direction + steps, 8)
