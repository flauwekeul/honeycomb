import { Svg } from '@svgdotjs/svg.js'
import { Tile } from './Tile'

export const render = (draw: Svg, tile: Tile) => {
  let fillColor = tile.obstacle ? '#777' : '#fff'
  fillColor = tile.reachable ? '#ddd' : fillColor
  fillColor = tile.activePath ? '#332277' : fillColor
  let textColor = tile.obstacle ? '#fff' : '#999'
  textColor = tile.reachable ? '#000' : textColor

  const text = draw
    .text(`${tile.obstacle ? 'wall' : tile.distance}`)
    .font({
      family: 'Helvetica',
      size: tile.width * 0.2,
      anchor: 'middle',
      'dominant-baseline': 'central',
      leading: 0,
      color: textColor,
      weight: 600,
    })
    .translate(tile.x, tile.y)

  const polygon = draw
    .polygon(tile.corners.map(({ x, y }) => `${x},${y}`).join(' '))
    .fill(fillColor)
    .stroke({ width: 1, color: '#999' })

  polygon.click(() => {
    tile.obstacle = !tile.obstacle
    draw.fire('resetTiles')
  })

  return draw.group().add(polygon).add(text)
}
