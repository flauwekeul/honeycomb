import { at, CompassDirection, createHexPrototype, Grid, Hex, inStore, move, Orientation, setStore } from '../dist'
import { createSuite } from './benchmark'
import { render } from './render'

/**
 * General todo:
 * - populate store in 1st traversal? Don't know how though...
 *
 * How to deal with state:
 * - const statelessGrid = new Grid(prototype).traverse()
 * create stores:
 * - const gridMap = statelessGrid.reduce((acc, hex) => acc.set(hex.toString(), hex), new Map())
 * - const gridArray = statelessGrid.reduce((acc, hex) => acc.concat(hex), [])
 * from stores:
 * - const statefulGrid = Grid.from(store)
 * same as:
 * - const statefulGrid = new Grid(prototype, store)
 * done: how does Grid know how to get hexes from store?
 *   -> store must have get() method
 *   statefulGrid.traverse() -> always over any hexes, but hexes are only created when not present in store
 * done: how to limit traversal outside store?
 *   -> statefulGrid.traverse().takeWhile(inStore) // stops once a hex is traversed that's not in the store
 *   -> statefulGrid.traverse().filter(inStore) // rejects hexes that are not in the store
 * done: how to update store?
 *   -> statefulGrid.traverse().each((hex) => store.set(...))
 *   -> statefulGrid.traverse().each((hex, grid) => grid.store.set(...))
 * done: when hexes in store are updated, should hexes in grid be updated too? How?
 *   -> No, because a stateful grid uses hexes from store 😃
 */

// todo: maybe `extends Hex` shouldn't be done? Maybe `extends DefaultHex`?
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

// const store = new Map<string, CustomHex>()
// todo: when passed a store as 2nd argument, automatically use it (get and set)?
const grid = Grid.of(hexPrototype, new Map<string, CustomHex>())
  .rectangle({ start: { q: 0, r: 0 }, width: 10, height: 10 })
  .each(setStore())
  .traverse(at({ q: 9, r: 0 }), move(CompassDirection.SE, 4), move(CompassDirection.SW, 4))
  .filter(inStore())
  .run((hex) => {
    hex.svg = render(hex)
    // console.log(hex)
  })
console.log('final', grid.store)

const amount = 10
createSuite().add('onlyHexes', function () {
  Grid.of(hexPrototype).rectangle({ width: amount, height: amount }).rectangle({ width: amount, height: amount }).run()
})
