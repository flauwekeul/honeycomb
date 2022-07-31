import { Svg } from '@svgdotjs/svg.js'
import { Grid } from '../../src'
import { Tile } from './types'

export function renderMap(draw: Svg, grid: Grid<Tile>) {
  grid.setHexes(
    grid.forEach((tile) => {
      tile.element = renderTile(draw, tile)
    }),
  )
}

export function renderPlayer(draw: Svg, width: number, height: number) {
  const size = 0.8
  return draw
    .image('./public/tank.svg')
    .size(width * size, height * size)
    .dmove(0.5 * width * (1 - size), 0.5 * height * (1 - size))
}

function renderTile(draw: Svg, tile: Tile) {
  const classNames = ['tile', tile.terrain.type.toLowerCase(), tile.visibility].join(' ')
  const polygon = draw.polygon(tile.corners.map(({ x, y }) => `${x},${y}`).join(',')).addClass(classNames)
  return draw.group().add(polygon).data({ id: tile.toString() })
}
