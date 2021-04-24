import { Compass, createHexPrototype, Grid, Hex, inStore, line, rectangle } from '../dist'
import { createSuite } from './benchmark'
import { render } from './render'

interface CustomHex extends Hex {
  [prop: string]: any
}

const hexPrototype = createHexPrototype<CustomHex>({
  dimensions: 30,
  orientation: 'pointy',
  custom: 'custom',
  origin: 'topLeft',
})
// const hex = createHex(hexPrototype, { q: 4, r: 3 })

const grid = new Grid(hexPrototype, rectangle({ start: { q: 0, r: 0 }, width: 10, height: 10 }))
  .traverse([line({ start: [9, 0], direction: Compass.SE, length: 4 }), line({ direction: Compass.SW, length: 4 })])
  .filter(inStore)
  .each((hex) => {
    hex.svg = render(hex)
    // console.log(hex)
  })
  .run()
console.log(grid.store)

createSuite().add('', function () {
  /* */
})
