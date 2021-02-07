import { corners, Hex, hexToPoint } from '../dist'

declare const SVG: any

const draw = SVG().addTo('body').size('100%', '100%')

export const render = (hex: Hex) => {
  const { x, y } = hexToPoint(hex)
  const polygon = draw
    .polygon(corners(hex, hex).map(({ x, y }) => `${x},${y}`))
    .fill('none')
    .stroke({ width: 1, color: '#999' })
  const text = draw
    .text(`${hex.q},${hex.r},${hex.s}`)
    // .text(`${hex.col},${hex.row}`)
    .font({
      size: hex.width * 0.25,
      anchor: 'middle',
      'dominant-baseline': 'central',
      leading: 0,
    })
    .translate(x, y)

  return draw.group().add(polygon).add(text)
}
