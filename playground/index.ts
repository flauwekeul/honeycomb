import { at, Compass, createHexPrototype, Grid, Hex, inStore, move, Orientation, rectangle, setStore } from '../dist'
import { createSuite } from './benchmark'
import { render } from './render'

interface CustomHex extends Hex {
  [prop: string]: any
}

const hexPrototype = createHexPrototype<CustomHex>({
  dimensions: 30,
  orientation: Orientation.POINTY,
  custom: 'custom', // fixme: adding `orientation: 'flat'` makes this an error, adding `orientation: Orientation.FLAT` doesn't
  origin: (hexPrototype) => ({ x: hexPrototype.width * -0.5, y: hexPrototype.height * -0.5 }),
})
// const hex = createHex(hexPrototype, { q: 4, r: 3 })

const store = new Map<string, CustomHex>()
const grid = Grid.of(hexPrototype, rectangle({ start: { q: 0, r: 0 }, width: 10, height: 10 }), store)
  .each(setStore())
  .traverse([at({ q: 9, r: 0 }), move(Compass.SE, 4), move(Compass.SW, 4)])
  .filter(inStore())
  .each((hex) => {
    hex.svg = render(hex)
    // console.log(hex)
  })
  .run()
console.log(grid.store)

createSuite().add('', function () {})
