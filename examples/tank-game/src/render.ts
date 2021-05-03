import { Svg } from '@svgdotjs/svg.js'
import { Grid, inStore } from 'honeycomb-grid'
import { Tile } from './types'

export function renderMap(draw: Svg, map: Grid<Tile>) {
  return (
    map
      .filter(inStore)
      .map((tile) => {
        tile.element = renderTile(draw, tile)
      })
      // fixme: this sucks
      .update((grid) => {
        grid.hexes().forEach((hex) => {
          grid.store.set(hex.toString(), hex)
        })
      })
      .run()
  )
}

export function renderPlayer(draw: Svg, width: number, height: number) {
  const size = 0.8
  return draw
    .image('/tank.svg')
    .size(width * size, height * size)
    .dmove(0.5 * width * (1 - size), 0.5 * height * (1 - size))
}

function renderTile(draw: Svg, tile: Tile) {
  const classNames = ['tile', tile.terrain.type.toLowerCase(), tile.visibility].join(' ')
  const polygon = draw.polygon(tile.corners.map(({ x, y }) => `${x},${y}`).join(',')).addClass(classNames)
  return draw.group().add(polygon).data({ id: tile.toString() })
}

// todo: use this
function renderCoordinates(draw: Svg, tile: Tile) {
  const text = draw
    .text(`${tile.q},${tile.r}`)
    .font({
      size: tile.width * 0.25,
      anchor: 'middle',
      'dominant-baseline': 'central',
      leading: 0,
    })
    .translate(tile.x, tile.y)
  return draw.add(text)
}
