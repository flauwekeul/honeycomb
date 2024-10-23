import { Direction, equals, Grid, Hex, HexCoordinates, neighborOf, spiral, Traverser } from '../../src'

/**
 * @category Traverser
 */
export function reachable<T extends Hex>(start: HexCoordinates, distance: number, obstacles?: Grid<T>): Traverser<T> {
  const directions: Direction[] = Object.values(Direction).filter((value) => typeof value === 'number')

  return function reachableTraverser(createHex, cursor) {
    const startHex = createHex(start ?? cursor ?? [0, 0])

    // Early return if distance is zero
    if (distance == 0) return [startHex]

    // If no obstacles, use spiral traversal
    if (!obstacles) {
      return spiral<T>({ radius: distance, start })(createHex, cursor)
    }

    const visitedHexes: T[] = [startHex]
    let currentFringe: T[] = [startHex]

    // Traverse through layers based on distance
    for (let k = 1; k <= distance; k++) {
      const nextFringe: T[] = []

      // Iterate over current layer's hexes
      for (const hex of currentFringe) {
        for (const direction of directions) {
          const neighbor = neighborOf(hex, direction)

          // If neighbor is already visited or is an obstacle, skip it
          if (isHexInArray(visitedHexes, neighbor) || isHexObstacle(neighbor)) continue

          // Add neighbor to visited and fringe lists
          visitedHexes.push(neighbor)
          nextFringe.push(neighbor)
        }
      }

      // Update the fringe for the next iteration
      currentFringe = nextFringe
    }

    return visitedHexes
  }

  // Helper function to check if a hex is an obstacle
  function isHexObstacle(hex: T) {
    return obstacles?.hasHex(hex) || false
  }

  // Helper function to check if a hex is already visited
  function isHexInArray(hexes: T[], hexToCheck: T) {
    return hexes.some((hex) => equals(hex, hexToCheck))
  }
}
