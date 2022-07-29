import { Image, SVG } from '@svgdotjs/svg.js'
import {
  assertCubeCoordinates,
  createHex,
  createHexPrototype,
  CubeCoordinates,
  fromCoordinates,
  Grid,
  HexCoordinates,
  hexToPoint,
  line,
  PartialCubeCoordinates,
  repeatWith,
  ring,
  Traverser,
  TupleCoordinates,
} from 'honeycomb-grid'
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
  const coordinates = coordinatesFromTarget(event.target)
  if (coordinates) {
    updateGameState({ playerCoordinates: coordinates })
  }
})

updateGameState(initialGameState)

function updateDiscoveredTiles(grid: Grid<Tile>) {
  grid.update((tiles) =>
    tiles
      .filter((tile) => tile.visibility === 'visible')
      .map((tile) => {
        tile.element.first().addClass('discovered')
        return tile
      }),
  )
}

function updateFieldOfView(grid: Grid<Tile>, start: HexCoordinates) {
  grid.update(
    (tiles) =>
      tiles.map((tile) => {
        tile.visibility = 'visible'
        tile.element.first().removeClass('discovered')
        tile.element.first().removeClass('undiscovered')
        return tile
      }),
    fieldOfView(start),
  )
}

function fieldOfView(start: HexCoordinates): Traverser<Tile> {
  const startTile = assertCubeCoordinates(grid.hexPrototype, start)
  return repeatWith(
    ring({
      center: start,
      start: translate(startTile, { r: -config.viewDistanceInTiles }),
    }),
    lineOfSight(start),
    { includeSource: false },
  )
}

function lineOfSight(start: HexCoordinates): Traverser<Tile> {
  return (_, stop) => {
    const result: Tile[] = []
    const sightLine = grid.traverse(line<Tile>({ start, stop }))

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

// todo: move to honeycomb
// todo: rename to add?
function translate(hex: PartialCubeCoordinates, delta: Partial<CubeCoordinates>) {
  const { q = 0, r = 0, s = 0 } = delta
  const hexS = hex.s ?? -hex.q - hex.r
  return { q: hex.q + q, r: hex.r + r, s: hexS + s }
}
