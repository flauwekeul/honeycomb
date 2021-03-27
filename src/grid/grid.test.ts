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

    const callback = jest.fn()
    grid.run(callback)

    expect(callback.mock.calls).toEqual([
      [hex1, grid],
      [hex2, grid],
    ])
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

    const callback = jest.fn()
    grid.run(callback)

    expect(callback.mock.calls).toEqual([
      [hex1, grid],
      [hex2, grid],
    ])
  })

  test(`accepts a store that's cloned and its hexes can be traversed`, () => {
    const hex = createHex(hexPrototype)
    const store = new Map([[hex.toString(), hex]])
    const grid = new Grid(hexPrototype, store)

    expect(grid.store).toEqual(store)
    expect(grid.store).not.toBe(store)

    const callback = jest.fn()
    grid.run(callback)

    expect(callback.mock.calls).toEqual([[hex, grid]])
  })

  test('creates a stateless grid when called with only a hex prototype', () => {
    const grid = new Grid(hexPrototype)

    expect(grid.store).toEqual(new Map())

    const callback = jest.fn()
    grid.run(callback)

    expect(callback).not.toBeCalled()
  })

  describe('Grid.from()', () => {
    const hex = createHex(hexPrototype)
    const store = new Map([[hex.toString(), hex]])

    test('accepts a store', () => {
      const grid = Grid.from(store)

      expect(grid.store).toEqual(store)
      expect(grid.hexPrototype).toBe(hexPrototype)

      const callback = jest.fn()
      grid.run(callback)

      expect(callback.mock.calls).toEqual([[hex, grid]])
    })

    test('accepts an iterable', () => {
      const iterable = store.values()
      const grid = Grid.from(iterable)

      expect(grid.store).toEqual(store)
      expect(grid.hexPrototype).toBe(hexPrototype)

      const callback = jest.fn()
      grid.run(callback)

      expect(callback.mock.calls).toEqual([[hex, grid]])
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

test('can be iterated', () => {
  const coordinates = { q: 1, r: 2 }
  const grid = new Grid(hexPrototype, [at(coordinates)])

  for (const hex of grid) {
    expect(hex).toMatchObject(coordinates)
  }
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

describe('each()', () => {
  test('iterates over each hex from the previous iterator/traverser', () => {
    const callback = jest.fn()
    const grid1 = new Grid(hexPrototype, [at({ q: 1, r: 2 }), at({ q: 3, r: 4 })]).each(callback).run()
    expect(callback.mock.calls).toEqual([
      [createHex(hexPrototype, { q: 1, r: 2 }), grid1],
      [createHex(hexPrototype, { q: 3, r: 4 }), grid1],
    ])

    callback.mockReset()

    const grid2 = new Grid(hexPrototype, [at({ q: 1, r: 2 }), at({ q: 3, r: 4 })])
      .traverse([at({ q: 5, r: 6 })]) // 👈 now the last traverser
      .each(callback)
      .run()
    expect(callback.mock.calls).toEqual([[createHex(hexPrototype, { q: 5, r: 6 }), grid2]])
  })
})

describe('filter()', () => {
  test('filters hexes', () => {
    const callback = jest.fn()
    const grid = new Grid(hexPrototype, [at({ q: 1, r: 1 }), at({ q: 2, r: 2 }), at({ q: 3, r: 3 })])
      .filter((hex) => hex.q !== 2)
      .run(callback)

    expect(callback.mock.calls).toEqual([
      [createHex(hexPrototype, { q: 1, r: 1 }), grid],
      [createHex(hexPrototype, { q: 3, r: 3 }), grid],
    ])
  })
})

describe('takeWhile()', () => {
  test('stops when the passed predicate returns false', () => {
    const callback = jest.fn()
    const grid = new Grid(hexPrototype, [at({ q: 1, r: 1 }), at({ q: 2, r: 2 }), at({ q: 3, r: 3 })])
      .takeWhile((hex) => hex.q !== 2)
      .run(callback)

    expect(callback.mock.calls).toEqual([[createHex(hexPrototype, { q: 1, r: 1 }), grid]])
  })
})

describe('traverse()', () => {
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
    const traverser: Traverser<Hex> = function* traverser() {
      yield createHex(hexPrototype, { q: 1, r: 2 })
      yield createHex(hexPrototype, { q: 3, r: 4 })
    }
    const callback = jest.fn()
    const grid = new Grid(hexPrototype)

    grid.traverse(traverser).run(callback)

    expect(callback.mock.calls).toEqual([
      [createHex(hexPrototype, { q: 1, r: 2 }), expect.any(Grid)],
      [createHex(hexPrototype, { q: 3, r: 4 }), expect.any(Grid)],
    ])
  })

  test('continues where a previous traverser stopped', () => {
    const hexesFrom1stTraverser = [createHex(hexPrototype, { q: 1, r: 2 }), createHex(hexPrototype, { q: 3, r: 4 })]
    const traverser1 = jest.fn(() => hexesFrom1stTraverser)
    const traverser2 = jest.fn(() => [])
    const grid = new Grid(hexPrototype)

    grid.traverse([traverser1, traverser2]).run()

    expect(traverser2).toBeCalledWith(hexesFrom1stTraverser[hexesFrom1stTraverser.length - 1], grid.getHex)
  })

  test('gets hexes from a store if the grid has one', () => {
    const hexInStore = createHex(hexPrototype, { q: 1, r: 2 })
    const store = new Map([[hexInStore.toString(), hexInStore]])
    const traverser: Traverser<Hex> = (_, getHex) => [getHex({ q: 1, r: 2 })]
    const grid = new Grid(hexPrototype, store)
    const callback = jest.fn()

    grid.traverse(traverser).run(callback)

    expect(callback.mock.calls[0][0]).toBe(hexInStore)
  })
})

describe('run()', () => {
  test('runs all iterators recursively and returns itself', () => {
    const eachCallback = jest.fn()
    const filterCallback = jest.fn((hex) => hex.q > 1)
    const runCallback = jest.fn()
    const grid = new Grid(hexPrototype, [at({ q: 1, r: 2 }), at({ q: 3, r: 4 })])
      .each(eachCallback)
      .filter(filterCallback)

    expect(eachCallback).not.toBeCalled()

    const result = grid.run(runCallback)

    expect(result).toBe(grid)
    expect(eachCallback.mock.calls).toEqual([
      [createHex(hexPrototype, { q: 1, r: 2 }), grid],
      [createHex(hexPrototype, { q: 3, r: 4 }), grid],
    ])
    expect(runCallback.mock.calls).toEqual([[createHex(hexPrototype, { q: 3, r: 4 }), grid]])
  })
})
