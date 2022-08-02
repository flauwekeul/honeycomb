import { Image, SVG } from '@svgdotjs/svg.js'
import {
  assertCubeCoordinates,
  createHex,
  createHexPrototype,
  fromCoordinates,
  Grid,
  HexCoordinates,
  hexToPoint,
  line,
  repeatWith,
  ring,
  translate,
  Traverser,
  TupleCoordinates,
} from '../../src'
import { initialGameState, onUpdate, updateGameState } from './gameState'
import { renderMap, renderPlayer } from './render'
import { TILES } from './tiles'
import { Tile } from './types'

const config = {
  viewDistanceInTiles: 3,
}

const draw = SVG().addTo('body').size('100%', '100%').id('container')

const hexPrototype = createHexPrototype<Tile>({ dimensions: 50, origin: 'topLeft', visibility: 'undiscovered' })
const grid = new Grid<Tile>(hexPrototype, fromCoordinates(...TILES))

renderMap(draw, grid)

const playerElement = renderPlayer(draw, hexPrototype.width, hexPrototype.height)

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
  const startTile = assertCubeCoordinates(grid.hexPrototype, start)
  return repeatWith(
    ring({
      center: start,
      start: translate(startTile, { q: startTile.q, r: -config.viewDistanceInTiles }),
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
  const { x, y } = hexToPoint(createHex(hexPrototype, playerCoordinates))
  element.center(x, y)
}

function coordinatesFromTarget(target: EventTarget) {
  const id = SVG(target).parent('[data-id]')?.data('id')
  return typeof id === 'string' ? (id.split(',').map(Number) as TupleCoordinates) : null
}
