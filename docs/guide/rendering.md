# Rendering

Honeycomb comes *without* the ability to render hexes to screen. Fortunately, it isn't very hard. Especially if you use a dedicated rendering library.

## With [SVG.js](http://svgjs.com/)

```typescript
import { SVG } from '@svgdotjs/svg.js'
import { createHexPrototype, Grid, Hex, rectangle } from 'honeycomb-grid'

// you may want the origin to be the top left corner of a hex's bounding box
// instead of its center (which is the default)
const hexPrototype = createHexPrototype({ dimensions: 30, origin: 'topLeft' })
const grid = new Grid(hexPrototype, rectangle({ width: 10, height: 10 }))

const draw = SVG().addTo('body').size('100%', '100%')

grid.forEach(renderSVG)

function renderSVG(hex: Hex) {
  const polygon = draw
    // create a polygon from a hex's corner points
    .polygon(hex.corners.map(({ x, y }) => `${x},${y}`))
    .fill('none')
    .stroke({ width: 1, color: '#999' })

  return draw.group().add(polygon)
}
```

## With [PixiJS](http://www.pixijs.com/)

```typescript
import * as PIXI from 'pixi.js';
import { createHexPrototype, Grid, Hex, rectangle } from 'honeycomb-grid'

// you may want the origin to be the top left corner of a hex's bounding box
// instead of its center (which is the default)
const hexPrototype = createHexPrototype({ dimensions: 30, origin: 'topLeft' })
const grid = new Grid(hexPrototype, rectangle({ width: 10, height: 10 }))

const app = new PIXI.Application({ backgroundAlpha: 0 })
const graphics = new PIXI.Graphics()

document.body.appendChild(app.view)
graphics.lineStyle(1, 0x999999)

grid.forEach(renderCanvas)

function renderCanvas(hex: Hex) {
  const [firstCorner, ...otherCorners] = hex.corners

  // move the "pen" to the first corner
  graphics.moveTo(firstCorner.x, firstCorner.y)
  // draw lines to the other corners
  otherCorners.forEach(({ x, y }) => graphics.lineTo(x, y))
  // finish at the first corner
  graphics.lineTo(firstCorner.x, firstCorner.y)

  app.stage.addChild(graphics)
}
```
