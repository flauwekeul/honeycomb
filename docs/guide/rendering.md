# Rendering

Honeycomb comes *without* the ability to render hexes to screen. Fortunately, it isn't very hard. Especially if you use a dedicated rendering library.

## With [SVG.js](https://svgjs.dev/)

```typescript
import { SVG } from '@svgdotjs/svg.js'
import { defineHex, Grid, rectangle } from 'honeycomb-grid'

// you may want the origin to be the top left corner of a hex's bounding box
// instead of its center (which is the default)
const Hex = defineHex({ dimensions: 30, origin: 'topLeft' })
const grid = new Grid(Hex, rectangle({ width: 10, height: 10 }))

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
import { defineHex, Grid, rectangle } from 'honeycomb-grid'

// you may want the origin to be the top left corner of a hex's bounding box
// instead of its center (which is the default)
const Hex = defineHex({ dimensions: 30, origin: 'topLeft' })
const grid = new Grid(Hex, rectangle({ width: 10, height: 10 }))

const app = new PIXI.Application({ backgroundAlpha: 0 })
const graphics = new PIXI.Graphics()

document.body.appendChild(app.view)
graphics.lineStyle(1, 0x999999)

grid.forEach(renderHex)
app.stage.addChild(graphics)

function renderHex(hex: Hex) {
    // PIXI.Polygon happens to be compatible with hex.corners
    graphics.drawShape(
        new PIXI.Polygon(hex.corners)
    )
}
```
