import { Image, SVG } from '@svgdotjs/svg.js'
import {
  createHex,
  createHexPrototype,
  Grid,
  HexCoordinates,
  hexToPoint,
  inStore,
  rays,
  toString,
  TupleCoordinates,
} from 'honeycomb-grid'
import { initialGameState, onUpdate, updateGameState } from './gameState'
import { renderPlayer, renderTile } from './render'
import { TILES } from './tiles'
import { Tile } from './types'

const config = {
  viewDistanceInTiles: 3,
}

const draw = SVG().addTo('body').size('100%', '100%').id('container')

const hexPrototype = createHexPrototype<Tile>({ dimensions: 50, origin: 'topLeft' })
const tiles = new Map(TILES.map((tile) => [toString(tile), createHex(hexPrototype, tile)]))

// todo: stateful grids should only traverse hexes in store by default?
new Grid(hexPrototype, tiles)
  .traverse(
    rays({
      start: initialGameState.playerCoordinates,
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
  // .traverse(spiral({ start: gameState.playerCoordinates, radius: config.fieldOfViewRadius }))
  .filter(inStore)
  .map((tile) => {
    // console.log(tile)
    tile.element = renderTile(draw, tile)
  })
  .run()

const playerElement = renderPlayer(draw, hexPrototype.width, hexPrototype.height)

onUpdate(['playerCoordinates'], ({ playerCoordinates }) => {
  movePlayer(playerElement, playerCoordinates)
})

draw.click((event: MouseEvent) => {
  const coordinates = tileCoordinatesFromTarget(event.target)
  if (coordinates) {
    updateGameState({ playerCoordinates: coordinates })
  }
})

updateGameState(initialGameState)

function movePlayer(element: Image, playerCoordinates: HexCoordinates) {
  const { x, y } = hexToPoint(createHex(hexPrototype, playerCoordinates))
  element.center(x, y)
}

function tileCoordinatesFromTarget(target: EventTarget) {
  return SVG(target).parent('[data-id]').data('id')?.split(',').map(Number) as TupleCoordinates
}
