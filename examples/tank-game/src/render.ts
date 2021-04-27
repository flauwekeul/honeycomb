import { SVG } from '@svgdotjs/svg.js'
import { Tile } from './types'

const draw = SVG().addTo('body').size('100%', '100%').id('container')

export function render(tile: Tile) {
  const polygon = draw.polygon(tile.corners.map(({ x, y }) => `${x},${y}`).join(',')).fill(tile.terrain.backgroundColor)
  const text = draw
    .text(`${tile.q},${tile.r}`)
    // .text(`${hex.col},${hex.row}`)
    .font({
      size: tile.width * 0.25,
      anchor: 'middle',
      'dominant-baseline': 'central',
      leading: 0,
    })
    .translate(tile.x, tile.y)

  return draw.group().add(polygon).add(text)
}
