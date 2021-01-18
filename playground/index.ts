import { createHex, createHexPrototype, Grid, Hex } from '../dist'
import { createSuite } from './benchmark'
import { render } from './render'

interface CustomHex extends Hex {
  custom: string
  svg: any
}

const hexPrototype = createHexPrototype<CustomHex>({
  dimensions: 30,
  // orientation: Orientation.FLAT,
  custom: 'custom', // fixme: adding `orientation: 'flat'` makes this an error, adding `orientation: Orientation.FLAT` doesn't
  origin: (hexPrototype) => ({ x: hexPrototype.width * -0.5, y: hexPrototype.height * -0.5 }),
})
// const hex = createHex(hexPrototype, { q: 4, r: 3 })

Grid.of(hexPrototype)
  .rectangle({ start: { q: 0, r: 3 }, width: 5, height: 5 })
  // .rectangleFromOpposingCorners({ q: 0, r: 3 }, { q: 3, r: 6 })
  .each((hex) => {
    hex.svg = render(createHex(hexPrototype, hex))
    // console.log(hex)
  })
  .run()

createSuite()
  .add('rectangle', function () {
    const grid = Grid.of(hexPrototype)
    grid.rectangle({ start: { q: 1, r: 2 }, width: 5, height: 5 }).run()
  })
  .add('rectangleFromOpposingCorners', function () {
    const grid = Grid.of(hexPrototype)
    grid.rectangleFromOpposingCorners({ q: 1, r: 2 }, { q: 3, r: 6 }).run()
  })
