import { add, complete, cycle, suite } from 'benny'
import { createHexPrototype, Grid, rectangle } from '../dist'

const hexPrototype = createHexPrototype({
  dimensions: 30,
  orientation: 'pointy',
  origin: 'topLeft',
})
// const grid = new Grid(hexPrototype, rectangle({ width: 10, height: 10 }))

suite(
  'creating',
  add('s', () => {
    new Grid(hexPrototype, rectangle({ start: [4, 7], width: 10, height: 10 }))
  }),
  add('m', () => {
    new Grid(hexPrototype, rectangle({ start: [4, 7], width: 100, height: 100 }))
  }),
  add('l', () => {
    new Grid(hexPrototype, rectangle({ start: [4, 7], width: 1000, height: 1000 }))
  }),
  cycle(),
  complete(),
)
