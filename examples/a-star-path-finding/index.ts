import { Color, Polygon } from '@svgdotjs/svg.js'
import { createHexPrototype, Grid, rectangle } from '../../src'
import { aStar } from './aStar'
import { getTileFill, render } from './render'
import { Tile } from './types'

const IMPASSABLE_COST = 999
const IMPASSABLE_CHANCE = 0.35
export const MAX_COST = 5
export const START_COORDINATES = { q: 1, r: 1 }
export const TARGET_COORDINATES = { q: 17, r: 10 }

const hexPrototype = createHexPrototype<Tile>({
  dimensions: 30,
  orientation: 'pointy',
  origin: 'topLeft',
  isPassable() {
    return this.cost !== IMPASSABLE_COST
  },
})
const grid = new Grid(hexPrototype, rectangle({ width: 24, height: 12 })).forEach((tile) => {
  if (tile.equals(START_COORDINATES) || tile.equals(TARGET_COORDINATES)) {
    tile.cost = 0
  } else {
    tile.cost = Math.random() > IMPASSABLE_CHANCE ? Math.floor(Math.random() * MAX_COST) : IMPASSABLE_COST
  }
  tile.svg = render(tile)
})
const shortestPath = aStar<Tile>({
  grid,
  start: START_COORDINATES,
  target: TARGET_COORDINATES,
  isPassable: (tile) => tile.isPassable(),
  // todo: remove type cast somehow
  getCost: (coordinates) => grid.getHex(coordinates)!.cost,
})
const pathColor = new Color('#ff9').to('#993')

let index = 0
grid
  .traverse(shortestPath)
  .filter((tile) => !tile.equals(START_COORDINATES) && !tile.equals(TARGET_COORDINATES))
  .forEach((tile) => {
    const polygon = tile.svg.findOne('polygon') as Polygon
    const fill = getTileFill(tile, pathColor)
    ;(polygon.animate(undefined, index++ * 100) as any).fill(fill)
    return tile
  })
