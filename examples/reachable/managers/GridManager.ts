import { aStar } from 'abstract-astar'
import { Grid, ring } from '../../../src'
import { Tile } from '../models/Tile'
import { TileState } from '../models/TileState'
import { OBSTACLE_DENSITY, START_COORDINATES } from '../settings'
import { getReachableTiles } from '../utils/reachable'
import { Svg } from '@svgdotjs/svg.js'
import { render } from '../render/render'

export class GridManager {
  constructor(private grid: Grid<Tile>) {}

  initializeGrid(draw: Svg) {
    this.grid.forEach((tile) => render(draw, tile))
    this.initializeGridObstacles()
    this.highlightReachableTiles()
    this.calculateDistances()
  }

  private initializeGridObstacles() {
    this.grid.getHex(START_COORDINATES)!.state = TileState.START_ITEM
    this.grid
      .filter((tile) => tile.state != TileState.START_ITEM)
      .forEach((tile) => (tile.state = Math.random() < OBSTACLE_DENSITY ? TileState.OBSTACLE : TileState.DEFAULT))
  }

  calculateDistances() {
    const startTile: Tile = this.grid.getHex(START_COORDINATES)!

    this.grid
      .filter((tile) => tile.state != TileState.OBSTACLE)
      .forEach((tile) => this.calculateTileDistance(startTile, tile))
  }

  private calculateTileDistance(start: Tile, goal: Tile) {
    const shortestPath = aStar<Tile>({
      start,
      goal,
      estimateFromNodeToGoal: (tile) => this.grid.distance(tile, goal),
      neighborsAdjacentToNode: (center) => this.grid.traverse(ring({ radius: 1, center })).toArray(),
      actualCostToMove: (_, __, tile) => (tile.state == TileState.OBSTACLE ? Infinity : 0),
    })

    goal.distance = shortestPath ? shortestPath.length - 1 : 0
  }

  highlightReachableTiles() {
    this.grid.filter((tile) => tile.state == TileState.REACHABLE).forEach(this.resetTileState)

    getReachableTiles(this.grid).forEach((tile) => (tile.state = TileState.REACHABLE))
  }

  private resetTileState(tile: Tile) {
    tile.state = TileState.DEFAULT
  }
}
