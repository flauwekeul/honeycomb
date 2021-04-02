import { cloneHex, createHex, createHexPrototype, Hex, toString } from '../hex'
import { Grid } from './grid'
import { at } from './traversers'
import { Traverser } from './types'

const hexPrototype = createHexPrototype()

describe('creation', () => {
  test(`accepts a single traverser that's called eagerly to set store`, () => {
    const hex1 = createHex(hexPrototype, { q: 1, r: 2 })
    const hex2 = createHex(hexPrototype, { q: 3, r: 4 })
    const traverser = jest.fn(() => [hex1, hex2])
    const grid = new Grid(hexPrototype, traverser) /* don't call run() */

    expect(traverser).toBeCalledWith(createHex(hexPrototype), grid.getHex)
    expect(grid.store).toEqual(
      new Map([
        ['1,2', hex1],
        ['3,4', hex2],
      ]),
    )
    expect(grid.hexes()).toEqual([hex1, hex2])
  })

  test('accepts multiple traversers that are called eagerly to set store', () => {
    const hex1 = createHex(hexPrototype, { q: 1, r: 2 })
    const hex2 = createHex(hexPrototype, { q: 3, r: 4 })
    const traverser1 = jest.fn(() => [hex1])
    const traverser2 = jest.fn(() => [hex2])
    const traversers: Traverser<Hex>[] = [traverser1, traverser2]
    const grid = new Grid(hexPrototype, traversers) /* don't call run() */

    expect(traverser1).toBeCalledWith(createHex(hexPrototype), grid.getHex)
    expect(traverser2).toBeCalledWith(hex1, grid.getHex)
    expect(grid.store).toEqual(
      new Map([
        ['1,2', hex1],
        ['3,4', hex2],
      ]),
    )
    expect(grid.hexes()).toEqual([hex1, hex2])
  })

  test(`accepts a store that's cloned and its hexes can be traversed`, () => {
    const hex = createHex(hexPrototype)
    const store = new Map([[hex.toString(), hex]])
    const grid = new Grid(hexPrototype, store)

    expect(grid.store).toEqual(store)
    expect(grid.store).not.toBe(store)
    expect(grid.hexes()).toEqual([hex])
  })

  test('creates a stateless grid when called with only a hex prototype', () => {
    const grid = new Grid(hexPrototype)

    expect(grid.store).toEqual(new Map())
    expect(grid.hexes()).toEqual([])
  })

  describe('Grid.from()', () => {
    const hex = createHex(hexPrototype)
    const store = new Map([[hex.toString(), hex]])

    test('accepts a store', () => {
      const grid = Grid.from(store)

      expect(grid.store).toEqual(store)
      expect(grid.hexPrototype).toBe(hexPrototype)
      expect(grid.hexes()).toEqual([hex])
    })

    test('accepts an iterable', () => {
      const iterable = store.values()
      const grid = Grid.from(iterable)

      expect(grid.store).toEqual(store)
      expect(grid.hexPrototype).toBe(hexPrototype)
      expect(grid.hexes()).toEqual([hex])
    })

    test('throws an error when passed an empty store or iterable', () => {
      expect(() => Grid.from(new Map())).toThrowError(`Can't create grid from empty iterable: ${new Map()}`)
      expect(() => Grid.from([])).toThrowError(`Can't create grid from empty iterable: ${[]}`)
    })
  })
})

test('implements toStringTag', () => {
  expect(`${new Grid(hexPrototype)}`).toBe('[object Grid]')
})

describe('pointToHex()', () => {
  test('converts a point to a hex', () => {
    const grid = new Grid(hexPrototype)
    const hex = {} as Hex
    const getHex = jest.spyOn(grid, 'getHex').mockReturnValue(hex)
    const point = { x: 1, y: 2 }

    const result = grid.pointToHex(point)

    expect(result).toBe(hex)
    expect(getHex).toBeCalledWith({ q: -0, r: 1, s: -1 })
  })
})

describe('getHex()', () => {
  test('returns a hex from the store when present in the store', () => {
    const coordinates = { q: 1, r: 2 }
    const hex = createHex(hexPrototype, coordinates)
    const store = new Map([[toString(hex), hex]])
    const grid = new Grid(hexPrototype, store)

    expect(grid.getHex(coordinates)).toBe(hex)
  })

  test('calls toString() on the hex prototype so that the user can control how a hex is looked up in the store', () => {
    const customPrototype = createHexPrototype({
      toString() {
        return `${this.q}|${this.r}`
      },
    })
    const coordinates = { q: 1, r: 2 }
    const hex = createHex(customPrototype, coordinates)
    const store = new Map([['1|2', hex]])
    const grid = new Grid(customPrototype, store)

    expect(grid.getHex(coordinates)).toBe(hex)
  })

  test('returns a new hex when not present in the store', () => {
    const coordinates = { q: 1, r: 2 }
    const hex = createHex(hexPrototype, coordinates)
    const grid = new Grid(hexPrototype)

    expect(grid.getHex(coordinates)).toMatchObject(hex)
    expect(grid.getHex(coordinates)).not.toBe(hex)
  })

  test('calls clone() on the hex prototype so that a user can control how a new hex is created', () => {
    const customPrototype = createHexPrototype<{ custom: string } & Hex>({
      clone(newProps) {
        return cloneHex(this, { ...newProps, custom: 'custom' })
      },
    })
    const grid = new Grid(customPrototype)
    const hex = grid.getHex()

    expect(hex.custom).toBe('custom')
  })
})

test('has a hexes() method that returns the hexes from the last iteration', () => {
  const grid1 = new Grid(hexPrototype, [at({ q: 1, r: 2 }), at({ q: 3, r: 4 })])
  expect(grid1.hexes()).toEqual([createHex(hexPrototype, { q: 1, r: 2 }), createHex(hexPrototype, { q: 3, r: 4 })])

  const grid2 = grid1.filter((hex) => hex.q === 1)
  expect(grid2.hexes()).toEqual([createHex(hexPrototype, { q: 1, r: 2 })])
})

describe('update()', () => {
  test('returns a new grid', () => {
    const grid = new Grid(hexPrototype)
    const result = grid.update(jest.fn())

    expect(result).not.toBe(grid)
  })

  test('creates a clone of the grid and passes it to the callback', () => {
    const newStore = new Map()
    const callback = jest.fn((grid) => {
      grid.store = newStore
      return grid
    })
    const grid = new Grid(hexPrototype, [at({ q: 1, r: 2 }), at({ q: 3, r: 4 })])
    const result = grid.update(callback)

    expect(callback).toBeCalledWith(expect.any(Grid))
    expect(callback.mock.calls[0][0]).not.toBe(grid)
    expect(result.hexes()).toEqual(grid.hexes())
    expect(result.store).not.toBe(grid.store)
    expect(result.store).toBe(newStore)
    expect(result).not.toBe(grid)
  })

  test(`the passed callback doesn't have to return a grid`, () => {
    const newStore = new Map()
    const callback = jest.fn((grid) => {
      grid.store = newStore
    })
    const grid = new Grid(hexPrototype)
    const result = grid.update(callback)

    expect(result.store).toBe(newStore)
    expect(result).not.toBe(grid)
  })
})

describe('each()', () => {
  test('returns a new grid', () => {
    const grid = new Grid(hexPrototype)
    const result = grid.each(jest.fn())

    expect(result).not.toBe(grid)
  })

  test('iterates over each hex from the previous iterator/traverser', () => {
    const callback = jest.fn()
    const grid1 = new Grid(hexPrototype, [at({ q: 1, r: 2 }), at({ q: 3, r: 4 })]).each(callback)
    // call run() separately to test that callback is called with the grid returned by each()
    grid1.run()
    expect(callback.mock.calls).toEqual([
      [createHex(hexPrototype, { q: 1, r: 2 }), grid1],
      [createHex(hexPrototype, { q: 3, r: 4 }), grid1],
    ])

    callback.mockReset()

    const grid2 = new Grid(hexPrototype, [at({ q: 1, r: 2 }), at({ q: 3, r: 4 })])
      .traverse([at({ q: 5, r: 6 })]) // 👈 now the last traverser
      .each(callback)
    grid2.run()
    expect(callback.mock.calls).toEqual([[createHex(hexPrototype, { q: 5, r: 6 }), grid2]])
  })
})

describe('map()', () => {
  interface TestHex extends Hex {
    test: number
  }

  test('returns a new grid', () => {
    const grid = new Grid(hexPrototype)
    const result = grid.map(jest.fn())

    expect(result).not.toBe(grid)
  })

  test('creates a clone of each hex and passes it to the callback', () => {
    const hexPrototype = createHexPrototype<TestHex>()
    const mapCallback = jest.fn((hex) => hex.clone({ test: 1 }))
    const hex = createHex(hexPrototype, { q: 1, r: 2 })
    const grid = new Grid(hexPrototype, () => [hex]).map(mapCallback)
    const hexes = grid.hexes()

    expect(mapCallback.mock.calls).toEqual([[hex, grid]])
    expect(mapCallback.mock.calls[0][0]).not.toBe(hex)
    expect(hexes).toEqual([createHex(hexPrototype, { q: 1, r: 2, test: 1 })])
    expect(hexes[0]).not.toBe(hex)
  })

  test(`the passed callback doesn't have to return a hex`, () => {
    const hexPrototype = createHexPrototype<TestHex>()
    const mapCallback = jest.fn((hex) => {
      hex.test = 2
    })
    const hex = createHex(hexPrototype, { q: 1, r: 2 })
    const grid = new Grid(hexPrototype, () => [hex]).map(mapCallback)
    const hexes = grid.hexes()

    expect(mapCallback.mock.calls[0][0]).toEqual(createHex(hexPrototype, { q: 1, r: 2, test: 2 })) // hex is mutated
    expect(hexes[0]).toEqual(createHex(hexPrototype, { q: 1, r: 2, test: 2 }))
  })
})

describe('filter()', () => {
  test('returns a new grid', () => {
    const grid = new Grid(hexPrototype)
    const result = grid.filter(jest.fn())

    expect(result).not.toBe(grid)
  })

  test('filters hexes', () => {
    const grid = new Grid(hexPrototype, [at({ q: 1, r: 1 }), at({ q: 2, r: 2 }), at({ q: 3, r: 3 })]).filter(
      (hex) => hex.q !== 2,
    )
    expect(grid.hexes()).toEqual([createHex(hexPrototype, { q: 1, r: 1 }), createHex(hexPrototype, { q: 3, r: 3 })])
  })
})

describe('takeWhile()', () => {
  test('returns a new grid', () => {
    const grid = new Grid(hexPrototype)
    const result = grid.takeWhile(jest.fn())

    expect(result).not.toBe(grid)
  })

  test('stops when the passed predicate returns false', () => {
    const grid = new Grid(hexPrototype, [at({ q: 1, r: 1 }), at({ q: 2, r: 2 }), at({ q: 3, r: 3 })]).takeWhile(
      (hex) => hex.q !== 2,
    )
    expect(grid.hexes()).toEqual([createHex(hexPrototype, { q: 1, r: 1 })])
  })
})

describe('traverse()', () => {
  test('returns a new grid', () => {
    const grid = new Grid(hexPrototype)
    const result = grid.traverse([])

    expect(result).not.toBe(grid)
  })

  test('accepts a single traverser', () => {
    const traverser = jest.fn(() => [])
    const grid = new Grid(hexPrototype)

    grid.traverse(traverser).run()

    expect(traverser).toBeCalledWith(createHex(hexPrototype), grid.getHex)
  })

  test('accepts an array of traversers', () => {
    const traverser1 = jest.fn(() => [])
    const traverser2 = jest.fn(() => [])
    const grid = new Grid(hexPrototype)

    grid.traverse([traverser1, traverser2]).run()

    expect(traverser1).toBeCalledWith(createHex(hexPrototype), grid.getHex)
    expect(traverser2).toBeCalledWith(createHex(hexPrototype), grid.getHex)
  })

  test('accepts a generator', () => {
    function* traverser() {
      yield createHex(hexPrototype, { q: 1, r: 2 })
      yield createHex(hexPrototype, { q: 3, r: 4 })
    }
    const grid = new Grid(hexPrototype).traverse(traverser)

    expect(grid.hexes()).toEqual([createHex(hexPrototype, { q: 1, r: 2 }), createHex(hexPrototype, { q: 3, r: 4 })])
  })

  test('continues where a previous traverser stopped', () => {
    const hexesFrom1stTraverser = [createHex(hexPrototype, { q: 1, r: 2 }), createHex(hexPrototype, { q: 3, r: 4 })]
    const traverser1 = jest.fn(() => hexesFrom1stTraverser)
    const traverser2 = jest.fn(() => [])
    const grid = new Grid(hexPrototype)

    grid.traverse([traverser1, traverser2]).run()

    expect(traverser2).toBeCalledWith(createHex(hexPrototype, { q: 3, r: 4 }), grid.getHex)
  })

  test('passes a getHex() function to the callback', () => {
    const hexInStore = createHex(hexPrototype, { q: 1, r: 2 })
    const store = new Map([[hexInStore.toString(), hexInStore]])
    const traverser: Traverser<Hex> = (_, getHex) => [getHex({ q: 1, r: 2 })]
    const grid = new Grid(hexPrototype, store).traverse(traverser)

    expect(grid.hexes()[0]).toBe(hexInStore)
  })

  test('runs any previous iterators', () => {
    const callback = jest.fn()
    const grid = new Grid(hexPrototype, at({ q: 1, r: 2 }))

    grid.each(callback).traverse([]).run()

    expect(callback).toBeCalled()
  })
})

describe('run()', () => {
  test('returns the same grid', () => {
    const grid = new Grid(hexPrototype)
    const result = grid.run()

    expect(result).not.toBe(grid)
  })

  test('runs all iterators recursively', () => {
    const eachCallback = jest.fn()
    const filterCallback = jest.fn((hex) => hex.q > 1)
    const runCallback = jest.fn()
    const grid = new Grid(hexPrototype, [at({ q: 1, r: 2 }), at({ q: 3, r: 4 })])
      .each(eachCallback)
      .filter(filterCallback)

    expect(eachCallback).not.toBeCalled()

    grid.run(runCallback)

    expect(eachCallback.mock.calls).toEqual([
      [createHex(hexPrototype, { q: 1, r: 2 }), grid],
      [createHex(hexPrototype, { q: 3, r: 4 }), grid],
    ])
    expect(runCallback.mock.calls).toEqual([[createHex(hexPrototype, { q: 3, r: 4 }), grid]])
  })

  test(`doesn't run iterators again once run, but doesn't clear internal hexes either`, () => {
    const eachCallback = jest.fn()
    const hex = createHex(hexPrototype, { q: 1, r: 2 })
    const runGrid = new Grid(hexPrototype, () => [hex]).each(eachCallback).run()

    const twiceRunGrid = runGrid.run()

    expect(eachCallback).toBeCalledTimes(1)
    expect(runGrid.hexes()).toEqual([hex])
    expect(twiceRunGrid.hexes()).toEqual([hex])
  })
})
