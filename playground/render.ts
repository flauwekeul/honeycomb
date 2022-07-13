import { Hex } from '../dist'

declare const SVG: any

const draw = SVG().addTo('body').size('100%', '100%')

export const render = (hex: Hex) => {
  const polygon = draw
    .polygon(hex.corners.map(({ x, y }) => `${x},${y}`))
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
    .translate(hex.x, hex.y)

  return draw.group().add(polygon).add(text)
}

// declare const PIXI: any

// const app = new PIXI.Application({ transparent: true })
// const graphics = new PIXI.Graphics()

// document.body.appendChild(app.view)
// // set a line style of 1px wide and color #999
// graphics.lineStyle(1, 0x999999)

// export const render = (hex: Hex) => {
//   const [firstCorner, ...otherCorners] = hex.corners

//   // move the "pen" to the first corner
//   graphics.moveTo(firstCorner.x, firstCorner.y)
//   // draw lines to the other corners
//   otherCorners.forEach(({ x, y }) => graphics.lineTo(x, y))
//   // finish at the first corner
//   graphics.lineTo(firstCorner.x, firstCorner.y)

//   app.stage.addChild(graphics)
// }
