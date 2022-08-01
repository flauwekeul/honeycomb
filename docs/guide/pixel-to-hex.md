# Pixel → hex

<!-- todo: link "irregularly shaped hexes" to page about hex dimensions -->
Translating a screen pixel to the corresponding hex in a grid is possible with `Grid`'s `pointToHex()` method. It also works with irregularly shaped hexes.

```typescript
import { createHexPrototype, Grid, rectangle } from 'honeycomb-grid'

const hexPrototype = createHexPrototype({
  dimensions: { xRadius: 50, yRadius: 30 }, // wide hexes
  origin: 'topLeft'
})
const grid = new Grid(hexPrototype, rectangle({ width: 10, height: 10 }))

document.addEventListener('click', ({ offsetX, offsetY }) => {
  const hex = grid.pointToHex({ x: offsetX, y: offsetY })
  console.log(hex)
})
```
