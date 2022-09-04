import { Color, Morphable, Svg } from '@svgdotjs/svg.js'
import { MAX_COST, START_COORDINATES, TARGET_COORDINATES } from './settings'
import { Tile } from './Tile'

export function render(draw: Svg, tile: Tile) {
  const tileFill = new Color('#fff').to('#999')
  const fill = tile.equals(START_COORDINATES)
    ? '#c33'
    : tile.equals(TARGET_COORDINATES)
    ? '#36c'
    : tile.isPassable
    ? getTileFill(tile, tileFill)
    : '#333'
  const polygon = draw
    .polygon(tile.corners.map(({ x, y }) => `${x},${y}`).join(' '))
    .fill(fill)
    .stroke({ width: 1, color: '#999' })
  const text = draw
    .text(`${tile.isPassable ? tile.cost : 'wall'}`)
    // .text(`${tile.q},${tile.r},${tile.s}`)
    // .text(`${tile.col},${tile.row}`)
    .font({
      size: tile.width * 0.2,
      anchor: 'middle',
      'dominant-baseline': 'central',
      leading: 0,
      color: tile.isPassable ? '#000' : '#fff',
    })
    .translate(tile.x, tile.y)

  return draw.group().add(polygon).add(text)
}

export function getTileFill(tile: Tile, morphableColor: Morphable) {
  return morphableColor.at(tile.cost / MAX_COST).toHex()
}
