import { HexCoordinates } from '../../hex'
import { Traverser } from '../types'

// todo: looks a lot like Grid.traverse()
export const repeat = (amount: number, ...commands: Traverser[]): Traverser => (currentCoordinates) => {
  const result: HexCoordinates[] = []
  let coordinates = currentCoordinates

  for (let i = 0; i < amount; i++) {
    for (const command of commands) {
      for (const nextCoordinates of command(coordinates)) {
        coordinates = nextCoordinates
        result.push(coordinates)
      }
    }
  }

  return result
}
