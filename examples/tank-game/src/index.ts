import { Image } from '@svgdotjs/svg.js'
import { createHex, createHexPrototype, Grid, hexToPoint, toString } from 'honeycomb-grid'
import { renderPlayer, renderTile } from './render'
import { TILES } from './tiles'
import { GameState, Tile } from './types'

const hexPrototype = createHexPrototype<Tile>({ dimensions: 50, origin: 'topLeft' })
const tiles = new Map(TILES.map((tile) => [toString(tile), createHex(hexPrototype, tile)]))

new Grid(hexPrototype, tiles)
  .map((tile) => {
    tile.element = renderTile(tile)
  })
  .run()

const gameState: GameState = {
  playerCoordinates: [-1, 2],
}

const playerElement = renderPlayer(hexPrototype.width, hexPrototype.height)

movePlayer(playerElement, gameState)

function movePlayer(element: Image, { playerCoordinates }: GameState) {
  const { x, y } = hexToPoint(createHex(hexPrototype, playerCoordinates))
  element.center(x, y)
}
