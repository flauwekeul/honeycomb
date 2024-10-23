import { SVG } from '@svgdotjs/svg.js'
import { equals, Grid, ring, spiral } from '../../src'
import { render } from './render'
import { OBSTACLE_DENSITY, REACHING_DISTANCE, START_COORDINATES } from './settings'
import { Tile } from './Tile'
import { reachable } from './reachable.traverser'
import { aStar } from 'abstract-astar'

const grid = new Grid(Tile, spiral({ start: START_COORDINATES, radius: 5 }))

grid
  .filter((tile) => !equals(tile, START_COORDINATES))
  .forEach((tile) => (tile.obstacle = Math.random() < OBSTACLE_DENSITY))

const draw = SVG().addTo('body').size('100%', '100%')

highlighReachableTiles()
renderTiles()

draw.on('resetTiles', () => {
  highlighReachableTiles()
  renderTiles()
})

function renderTiles() {
  draw.clear()

  grid
    .filter((tile) => !tile.obstacle)
    .forEach((tile) => {
      const start: Tile = grid.getHex(START_COORDINATES)!
      const goal: Tile = tile
      const shortestPath = aStar<Tile>({
        start,
        goal,
        estimateFromNodeToGoal: (tile) => grid.distance(tile, goal),
        neighborsAdjacentToNode: (center) => grid.traverse(ring({ radius: 1, center })).toArray(),
        actualCostToMove: (_, __, tile) => (tile.obstacle ? Infinity : 0),
      })
      tile.distance = shortestPath ? shortestPath.length - 1 : 0
    })

  for (const tile of grid) {
    render(draw, tile)
  }
}

function highlighReachableTiles() {
  grid.forEach((tile) => (tile.reachable = false))
  const obstacles = grid.filter((tile) => tile.obstacle)
  const reachableGridTraverser = reachable<Tile>(START_COORDINATES, REACHING_DISTANCE, obstacles)
  grid.traverse(reachableGridTraverser).forEach((tile) => (tile.reachable = true))
}
