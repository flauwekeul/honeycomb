import { at, createHex, createHexPrototype, Grid, Hex, move, PointyCompassDirection } from '../dist'
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

const grid = Grid.of(hexPrototype)
const result = grid
  .rectangle({ width: 3, height: 3 })
  .traverse(
    // repeat(5, move(PointyCompassDirection.E)),
    at({ q: 2, r: 0 }),
    move(PointyCompassDirection.E),
    move(PointyCompassDirection.E),
    move(PointyCompassDirection.E),
  )
  .each((hex) => {
    hex.svg = render(createHex(hexPrototype, hex))
    // console.log(hex)
  })
  .run(({ r }) => r === 2)
console.log(result)

// createSuite()
//   .add('without prototype', function () {
//     rectangle2(hexPrototype, { width: 5, height: 5 })
//   })
//   .add('with prototype', function () {
//     rectangle(hexPrototype, { width: 5, height: 5 })
//   })
