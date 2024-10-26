import { Direction, equals, Grid, neighborOf } from '../../../src'
import { Tile } from '../models/Tile'
import { TileState } from '../models/TileState'
import { REACHING_DISTANCE, START_COORDINATES } from '../settings'

const directions: Direction[] = Object.values(Direction).filter((value) => typeof value === 'number')

export const getReachableTiles = (grid: Grid<Tile>) => {
  const startTile = grid.getHex(START_COORDINATES)!
  const visitedHexes: Tile[] = [startTile]
  let currentFringe: Tile[] = [startTile]

  for (let k = 1; k <= REACHING_DISTANCE; k++) {
    const nextFringe: Tile[] = []

    for (const tile of currentFringe) {
      for (const neighbor of getNeighboringTiles(grid, tile)) {
        if (isTileInArray(visitedHexes, neighbor) || isTileObstacle(neighbor)) continue

        visitedHexes.push(neighbor)
        nextFringe.push(neighbor)
      }
    }

    currentFringe = nextFringe
  }

  return visitedHexes
}

const getNeighboringTiles = (grid: Grid<Tile>, tile: Tile) => {
  return directions
    .map((direction) => grid.getHex(neighborOf(tile, direction)))
    .filter((neighbor): neighbor is Tile => Boolean(neighbor))
}

const isTileObstacle = (tile: Tile) => {
  return tile.state == TileState.OBSTACLE || false
}

const isTileInArray = (tiles: Tile[], tileToCheck: Tile) => {
  return tiles.some((tile) => equals(tile, tileToCheck))
}
