import { Svg } from '@svgdotjs/svg.js'
import { Tile } from './types'

export function renderTile(draw: Svg, tile: Tile) {
  const polygon = draw.polygon(tile.corners.map(({ x, y }) => `${x},${y}`).join(',')).fill(tile.terrain.backgroundColor)
  const text = draw
    .text(`${tile.q},${tile.r}`)
    .font({
      size: tile.width * 0.25,
      anchor: 'middle',
      'dominant-baseline': 'central',
      leading: 0,
    })
    .translate(tile.x, tile.y)

  return draw.group().data({ id: tile.toString() }).add(polygon).add(text)
}

export function renderPlayer(draw: Svg, width: number, height: number) {
  const size = 0.8
  return draw
    .image('/tank.svg')
    .size(width * size, height * size)
    .dmove(0.5 * width * (1 - size), 0.5 * height * (1 - size))
}
