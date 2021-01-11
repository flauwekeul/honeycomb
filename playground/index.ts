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
      repeat(4, move(PointyCompassDirection.E)),
      move(PointyCompassDirection.SE),
      repeat(4, move(PointyCompassDirection.W)),
      move(PointyCompassDirection.SW),
    ),
    repeat(4, move(PointyCompassDirection.E)),
  )
  .rectangle({ width: 10, height: 10 })
  .each((hex) => {
    hex.svg = render(createHex(hexPrototype, hex))
    // console.log(hex)
  })
  .run()

const grid = Grid.of(hexPrototype)
createSuite()
  .add('rectangle', function () {
    grid.rectangle({ width: 5, height: 5 }).run()
  })
  .add('traverse', function () {
    grid
      .traverse(
        at({ q: 0, r: 0 }),
        repeat(
          2,
          repeat(4, move(PointyCompassDirection.E)),
          move(PointyCompassDirection.SE),
          repeat(4, move(PointyCompassDirection.W)),
          move(PointyCompassDirection.SW),
        ),
        repeat(4, move(PointyCompassDirection.E)),
      )
      .run()
  })
