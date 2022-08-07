import { SVG } from '@svgdotjs/svg.js'
import { Hex } from '../src'

const draw = SVG().addTo('body').size('100%', '100%')

export const render = (hex: Hex, index?: number) => {
  const polygon = draw
    .polygon(hex.corners.map(({ x, y }) => `${x},${y}`).join(' '))
    .fill('#fff')
    .stroke({ width: 1, color: '#999' })
  const text = draw
    .text((add) => {
      const coordinates = add.tspan(`${hex.q},${hex.r},${hex.s}`)
      // const coordinates = add.tspan(`${hex.col},${hex.row}`)
      if (Number.isFinite(index)) {
        coordinates.y(-20)
        add
          .tspan(`${index}`)
          .x(hex.width - 3)
          .y(-10)
          .fill('#999')
      }
    })
    .font({
      size: hex.width * 0.25,
      anchor: 'middle',
      'dominant-baseline': 'central',
      leading: 0,
    })
    .translate(hex.x, hex.y)

  if (Number.isFinite(index)) {
    // todo: look for SVG lib with better typescript support
    ;(polygon as any)
      .animate(undefined, index! * 100)
      .fill('#fe9')
      .animate()
      .fill('#fff')
  }

  return draw.group().add(polygon).add(text)
}

// declare const PIXI: any

// const app = new PIXI.Application({ backgroundAlpha: 0 })
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
