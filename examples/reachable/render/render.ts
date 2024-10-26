import { Svg } from '@svgdotjs/svg.js'
import { Tile } from '../models/Tile'

export const render = (draw: Svg, tile: Tile) => {
  const text = createTileText(draw, tile)
  const polygon = createTilePolygon(draw, tile)

  tile.svg = draw
    .group()
    .add(polygon)
    .add(text)
    .click(() => {
      tile.toggleState()
      draw.fire('resetTiles')
    })
}

const createTileText = (draw: Svg, tile: Tile) => {
  return draw
    .text('')
    .font({
      leading: 0,
      anchor: 'middle',
      'dominant-baseline': 'central',
      size: tile.width * 0.2,
    })
    .translate(tile.x, tile.y)
}

const createTilePolygon = (draw: Svg, tile: Tile) => {
  return draw.polygon(tile.corners.map(({ x, y }) => `${x},${y}`).join(' ')).stroke({ width: 1, color: '#999' })
}
