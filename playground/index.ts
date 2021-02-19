import { at, CompassDirection, createHexPrototype, Grid, Hex, move, NoopMap, Orientation } from '../dist'
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

const grid = Grid.of(hexPrototype)
  // .rectangle({ start: { q: 0, r: 0 }, width: 10, height: 10 })
  .traverse(at({ q: 0, r: 0 }), move(CompassDirection.SE, 4))
  .traverse(at({ q: 0, r: 0 }), move(CompassDirection.SE, 8))
  .traverse(at({ q: 0, r: 0 }), move(CompassDirection.SE, 6))
  .each((hex) => {
    hex.svg = render(hex)
    // console.log(hex)
  })
  .run()
console.log('final', grid.hexes)

const amount = 50
createSuite()
  .add('Map', function () {
    Grid.of(hexPrototype).rectangle({ width: amount, height: amount }).run()
  })
  .add('NoopMap', function () {
    Grid.of(hexPrototype, new NoopMap()).rectangle({ width: amount, height: amount }).run()
  })
