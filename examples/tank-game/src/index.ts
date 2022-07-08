import { Image, SVG } from '@svgdotjs/svg.js'
import {
  createHex,
  createHexPrototype,
  Grid,
  HexCoordinates,
  hexToPoint,
  rays,
  toString,
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
const tiles = new Map(TILES.map((tile) => [toString(tile), createHex(hexPrototype, tile)]))
let grid = renderMap(draw, new Grid(hexPrototype, tiles))

const playerElement = renderPlayer(draw, hexPrototype.width, hexPrototype.height)

onUpdate(['playerCoordinates'], ({ playerCoordinates }) => {
  movePlayer(playerElement, playerCoordinates)
  // fixme: damn, this sucks 🙈
  grid = updateFieldOfView(grid, playerCoordinates)
})

draw.click((event: MouseEvent) => {
  const coordinates = tileCoordinatesFromTarget(event.target)
  if (coordinates) {
    updateGameState({ playerCoordinates: coordinates })
  }
})

updateGameState(initialGameState)

function updateFieldOfView(grid: Grid<Tile>, start: HexCoordinates) {
  return grid
    .filter((tile) => tile.visibility === 'visible')
    .map((tile) => {
      tile.element.first().addClass('discovered')
    })
    .traverse(
      rays({
        start,
        length: config.viewDistanceInTiles,
        updateRay: (ray) => {
          // todo: make this a helper in Honeycomb?
          return ray.reduce(
            (state, tile) => {
              if (!state.opaque && tile.terrain) {
                state.tiles.push(tile)
                state.opaque = tile.terrain.opaque
              }
              return state
            },
            { opaque: false, tiles: [] },
          ).tiles
        },
      }),
    )
    .map((tile) => {
      tile.visibility = 'visible'
      tile.element.first().removeClass('discovered')
      tile.element.first().removeClass('undiscovered')
    })
    .run()
}

function movePlayer(element: Image, playerCoordinates: HexCoordinates) {
  const { x, y } = hexToPoint(createHex(hexPrototype, playerCoordinates))
  element.center(x, y)
}

function tileCoordinatesFromTarget(target: EventTarget) {
  return SVG(target).parent('[data-id]').data('id')?.split(',').map(Number) as TupleCoordinates
}