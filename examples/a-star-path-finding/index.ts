import { Color, Polygon, SVG } from '@svgdotjs/svg.js'
import { aStar } from 'abstract-astar'
import { Grid, rectangle, ring } from '../../src'
import { getTileFill, render } from './render'
import {
  GRID_HEIGHT,
  GRID_WIDTH,
  IMPASSABLE_CHANCE,
  IMPASSABLE_COST,
  MAX_COST,
  START_COORDINATES,
  TARGET_COORDINATES,
} from './settings'
import { Tile } from './Tile'

const draw = SVG().addTo('body').size('100%', '100%')
const grid = new Grid(Tile, rectangle({ width: GRID_WIDTH, height: GRID_HEIGHT })).forEach((tile) => {
  if (tile.equals(START_COORDINATES) || tile.equals(TARGET_COORDINATES)) {
    tile.cost = 0
  } else {
    tile.cost = Math.random() > IMPASSABLE_CHANCE ? Math.floor(Math.random() * MAX_COST) : IMPASSABLE_COST
  }
  tile.svg = render(draw, tile)
})
const start = grid.getHex(START_COORDINATES)!
const goal = grid.getHex(TARGET_COORDINATES)!
const shortestPath = aStar<Tile>({
  start,
  goal,
  estimateFromNodeToGoal: (tile) => grid.distance(tile, goal),
  neighborsAdjacentToNode: (center) => grid.traverse(ring({ radius: 1, center })).toArray(),
  actualCostToMove: (_, __, tile) => tile.cost,
})

const pathColorRange = new Color('#ff9').to('#993')
let index = 0
grid
  .traverse(shortestPath ?? [])
  .filter((tile) => !tile.equals(START_COORDINATES) && !tile.equals(TARGET_COORDINATES))
  .forEach((tile) => {
    const polygon = tile.svg.findOne('polygon') as Polygon
    const fill = getTileFill(tile, pathColorRange)
    ;(polygon.animate(undefined, index++ * 100) as any).fill(fill)
  })
