import { G, Image, SVG } from '@svgdotjs/svg.js'
import {
  AxialCoordinates,
  defineHex,
  Grid,
  HexCoordinates,
  hexToPoint,
  line,
  repeatWith,
  ring,
  toCube,
  translate,
  Traverser,
  TupleCoordinates,
} from '../../src'
import { initialGameState, onUpdate, updateGameState } from './gameState'
import { renderMap, renderPlayer } from './render'
import { TILES } from './tiles'
import { Terrain, tileVisibility } from './types'

const VIEW_DISTANCE_IN_TILES = 3

const draw = SVG().addTo('body').size('100%', '100%').id('container')

export class Tile extends defineHex({ dimensions: 50, origin: 'topLeft' }) {
  static create(config: AxialCoordinates & { terrain: Terrain }) {
    const tile = new Tile(config)
    tile.terrain = config.terrain
    return tile
  }

  visibility: tileVisibility = 'undiscovered'
  terrain!: Terrain
  element!: G
}

const grid = new Grid(Tile, TILES.map(Tile.create))

renderMap(draw, grid)

const playerElement = renderPlayer(draw, Tile.prototype.width, Tile.prototype.height)

onUpdate(['playerCoordinates'], ({ playerCoordinates }) => {
  movePlayer(playerElement, playerCoordinates)
  updateDiscoveredTiles(grid)
  updateFieldOfView(grid, playerCoordinates)
})

draw.click((event: MouseEvent) => {
  const coordinates = coordinatesFromTarget(event.target!)
  if (coordinates) {
    updateGameState({ playerCoordinates: coordinates })
  }
})

updateGameState(initialGameState)

function updateDiscoveredTiles(grid: Grid<Tile>) {
  grid.setHexes(
    grid
      .filter((tile) => tile.visibility === 'visible')
      .forEach((tile) => {
        tile.element.first().addClass('discovered')
      }),
  )
}

function updateFieldOfView(grid: Grid<Tile>, start: HexCoordinates) {
  grid.setHexes(
    grid.traverse(fieldOfView(start)).forEach((tile) => {
      tile.visibility = 'visible'
      tile.element.first().removeClass('discovered')
      tile.element.first().removeClass('undiscovered')
    }),
  )
}

function fieldOfView(start: HexCoordinates): Traverser<Tile> {
  const startTile = toCube(Tile.prototype, start)
  return repeatWith(
    ring({
      center: start,
      start: translate(startTile, { q: startTile.q, r: -VIEW_DISTANCE_IN_TILES }),
    }),
    lineOfSight(start),
    { includeSource: false },
  )
}

function lineOfSight(start: HexCoordinates): Traverser<Tile> {
  return (_, stop) => {
    const result: Tile[] = []
    const sightLine = grid.traverse(line<Tile>({ start, stop: stop! }))

    for (const tile of sightLine) {
      result.push(tile)
      // make sure the last tile is the opaque one
      if (tile.terrain.opaque) return result
    }

    return result
  }
}

function movePlayer(element: Image, playerCoordinates: HexCoordinates) {
  const { x, y } = hexToPoint(new Tile(playerCoordinates))
  element.center(x, y)
}

function coordinatesFromTarget(target: EventTarget) {
  const id = SVG(target).parent('[data-id]')?.data('id')
  return typeof id === 'string' ? (id.split(',').map(Number) as TupleCoordinates) : null
}
