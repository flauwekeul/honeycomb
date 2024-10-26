import { SVG } from '@svgdotjs/svg.js'
import { Grid, spiral } from '../../src'
import { GRID_RADIUS, START_COORDINATES } from './settings'
import { Tile } from './models/Tile'
import { GridManager } from './managers/GridManager'

const grid = new Grid(Tile, spiral({ start: START_COORDINATES, radius: GRID_RADIUS }))
const draw = SVG().addTo('body').size('100%', '100%')
const gridManager = new GridManager(grid)

gridManager.initializeGrid(draw) 
draw.on('resetTiles', () => {
  gridManager.highlightReachableTiles()
  gridManager.calculateDistances()
})