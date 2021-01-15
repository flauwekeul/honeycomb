import { at, createHex, createHexPrototype, Grid, Hex, move, PointyCompassDirection, repeat } from '../dist'
import { createSuite } from './benchmark'
import { render } from './render'

interface CustomHex extends Hex {
  custom: string
  svg: any
}

const hexPrototype = createHexPrototype<CustomHex>({
  dimensions: 30,
  custom: 'custom', // fixme: adding `orientation: 'flat'` makes this an error, adding `orientation: Orientation.FLAT` doesn't
  origin: (hexPrototype) => ({ x: hexPrototype.width * -0.5, y: hexPrototype.height * -0.5 }),
})
// const hex = createHex(hexPrototype, { q: 4, r: 3 })

Grid.of(hexPrototype)
  .traverse(
    at({ q: 0, r: 0 }),
    repeat(
      2,
      move(PointyCompassDirection.E, 4),
      move(PointyCompassDirection.SE),
      move(PointyCompassDirection.W, 4),
      move(PointyCompassDirection.SW),
    ),
    move(PointyCompassDirection.E, 4),
  )
  .rectangle({ width: 10, height: 10 })
  .each((hex) => {
    hex.svg = render(createHex(hexPrototype, hex))
    // console.log(hex)
  })
  .run()

const grid = Grid.of(hexPrototype)
createSuite().add('', function () {})
