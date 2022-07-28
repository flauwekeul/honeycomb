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
  tap,
  transduce,
  Traverser,
  TupleCoordinates,
} from 'honeycomb-grid'
import { filter, takeWhile, toArray } from 'transducist'
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
  updateDiscoveredHexes(grid)
  updateFieldOfView(grid, playerCoordinates)
})

draw.click((event: MouseEvent) => {
  const coordinates = coordinatesFromTarget(event.target)
  if (coordinates) {
    updateGameState({ playerCoordinates: coordinates })
  }
})

updateGameState(initialGameState)

function updateDiscoveredHexes(grid: Grid<Tile>) {
  grid.update([
    filter((tile) => tile.visibility === 'visible'),
    tap((tile) => {
      tile.element.first().addClass('discovered')
    }),
  ])
}

function updateFieldOfView(grid: Grid<Tile>, start: HexCoordinates) {
  grid.update(
    [
      tap((tile) => {
        tile.visibility = 'visible'
        tile.element.first().removeClass('discovered')
        tile.element.first().removeClass('undiscovered')
      }),
    ],
    fieldOfView(start),
  )
}

function fieldOfView(start: HexCoordinates): Traverser<Tile> {
  const startHex = assertCubeCoordinates(grid.hexPrototype, start)
  return repeatWith(
    ring({
      center: start,
      start: translate(startHex, { r: -config.viewDistanceInTiles }),
    }),
    lineOfSight(start),
    { includeSource: false },
  )
}

function lineOfSight(start: HexCoordinates): Traverser<Tile> {
  return (_, stop) => {
    // this state is needed to stop the ray *after* the tile with opaque terrain is found
    let foundOpaqueTerrain = false
    return transduce(
      grid.traverse(line<Tile>({ start, stop })),
      // todo: instead of keeping state like this, try making a reduce() transducer?
      [
        takeWhile(() => !foundOpaqueTerrain),
        tap((tile) => {
          foundOpaqueTerrain = tile.terrain.opaque
        }),
      ],
      toArray(),
    )
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
