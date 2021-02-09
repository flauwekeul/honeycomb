import { createHexPrototype, Grid, Hex, Orientation } from '../dist'
import { createSuite } from './benchmark'
import { render } from './render'

interface CustomHex extends Hex {
  custom: string
  svg: any
}

const hexPrototype = createHexPrototype<CustomHex>({
  dimensions: 30,
  orientation: Orientation.POINTY,
  custom: 'custom', // fixme: adding `orientation: 'flat'` makes this an error, adding `orientation: Orientation.FLAT` doesn't
  origin: (hexPrototype) => ({ x: hexPrototype.width * -0.5, y: hexPrototype.height * -0.5 }),
})
// const hex = createHex(hexPrototype, { q: 4, r: 3 })

Grid.of(hexPrototype)
  .rectangle({ start: { q: 0, r: 0 }, width: 10, height: 10 })
  // .traverse(at({ q: 6, r: 6 }), move(CompassDirection.SE, 8))
  .each((hex) => {
    hex.svg = render(hex)
    // console.log(hex)
  })
  .run()

createSuite()
  .add('rectangle', function () {
    const grid = Grid.of(hexPrototype)
    grid.rectangle({ start: { q: 0, r: 0 }, width: 10, height: 10 }).run()
  })
  .add('rectangleFromOpposingCorners', function () {
    const grid = Grid.of(hexPrototype)
    grid.rectangle({ q: 5, r: 9 }, { q: 0, r: 0 }).run()
  })
