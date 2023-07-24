import { describe, expect, expectTypeOf, Mock, test, vi } from 'vitest'
import { AxialCoordinates, defineHex, Hex, HexCoordinates, HexSettings } from '../hex'
import { Grid } from './grid'
import { fromCoordinates, rectangle } from './traversers'
import { Direction } from './types'

describe('creation', () => {
  test('creates a grid from a hex constructor', () => {
    const grid = new Grid(Hex)

    expectTypeOf(grid).toMatchTypeOf<Grid<Hex>>()
    expect(grid).toBeInstanceOf(Grid)
    expect(grid.size).toBe(0)
  })

  test('creates a grid using a class extending from Hex', () => {
    class CustomHex extends Hex {
      customProp = 1
    }
    const grid = new Grid(CustomHex)

    expectTypeOf(grid).toMatchTypeOf<Grid<CustomHex>>()
    expect(grid.createHex()).toHaveProperty('customProp', 1)
  })

  test('creates a grid using a class extending from defineHex()', () => {
    class CustomHex extends defineHex() {
      customProp = 1
    }
    const grid = new Grid(CustomHex)

    expectTypeOf(grid).toMatchTypeOf<Grid<CustomHex>>()
    expect(grid.createHex()).toHaveProperty('customProp', 1)
  })

  test('creates a grid from a hex constructor and one or more traversers', () => {
    const singleTraverserGrid = new Grid(Hex, fromCoordinates([1, 2]))
    const multiTraverserGrid = new Grid(Hex, [fromCoordinates([1, 2]), fromCoordinates([3, 4])])

    expect(singleTraverserGrid).toBeInstanceOf(Grid)
    expect(singleTraverserGrid.size).toBe(1)

    expect(multiTraverserGrid).toBeInstanceOf(Grid)
    expect(multiTraverserGrid.size).toBe(2)
  })

  test('creates a grid from an iterable of hex coordinates', () => {
    const generator = function* (): Generator<HexCoordinates> {
      yield [1, 2]
    }
    const gridFromArray = new Grid(Hex, [[3, 4]])
    const gridFromSet = new Grid(Hex, new Set<HexCoordinates>([[5, 6]]))
    const gridFromGenerator = new Grid(Hex, generator())

    expect(gridFromArray).toBeInstanceOf(Grid)
    expect(gridFromArray.size).toBe(1)

    expect(gridFromSet).toBeInstanceOf(Grid)
    expect(gridFromSet.size).toBe(1)

    expect(gridFromGenerator).toBeInstanceOf(Grid)
    expect(gridFromGenerator.size).toBe(1)
  })

  test('creates a grid from an iterable of hexes', () => {
    const generator = function* () {
      yield new Hex()
    }
    const gridFromArray = new Grid(Hex, [new Hex()])
    const gridFromSet = new Grid(Hex, new Set([new Hex()]))
    const gridFromGenerator = new Grid(Hex, generator())

    expect(gridFromArray).toBeInstanceOf(Grid)
    expect(gridFromArray.size).toBe(1)

    expect(gridFromSet).toBeInstanceOf(Grid)
    expect(gridFromSet.size).toBe(1)

    expect(gridFromGenerator).toBeInstanceOf(Grid)
    expect(gridFromGenerator.size).toBe(1)
  })

  test('creates a grid from another grid', () => {
    const grid = new Grid(Hex)
    const result = new Grid(grid)

    expect(result).toBeInstanceOf(Grid)
    expect(result).not.toBe(grid)
    expect(result.size).toBe(0)
  })
})

describe('static fromIterable()', () => {
  test('creates a grid from an iterable of hexes', () => {
    const result = Grid.fromIterable([new Hex()])

    expect(result).toBeInstanceOf(Grid)
    expect(result.size).toBe(1)
  })

  test('throws when an empty iterable is passed', () => {
    expect(() => Grid.fromIterable([])).toThrowError(TypeError(`Can't create grid from empty iterable: []`))
  })
})

describe('static fromJSON()', () => {
  class CustomHex extends defineHex() {
    static create(coordinates: HexCoordinates, custom: string) {
      const hex = new CustomHex(coordinates)
      hex.custom = custom
      return hex
    }

    custom!: string
  }
  type DeserializedCustomHex = AxialCoordinates & Pick<CustomHex, 'custom'>

  test('creates a grid from an object containing hex settings and coordinates', () => {
    const hexSettings: HexSettings = {
      dimensions: { xRadius: 10, yRadius: 10 },
      orientation: 'flat',
      origin: { x: 0, y: 0 },
      offset: 1,
    }
    const coordinates: AxialCoordinates[] = [
      { q: 0, r: 0 },
      { q: 1, r: 0 },
    ]
    const result = Grid.fromJSON({ hexSettings, coordinates })

    expect(result).toBeInstanceOf(Grid)
    expect(result.hexPrototype).toContain(hexSettings)
    expect(result).toStrictEqual(
      new Grid(
        Hex,
        coordinates.map((c) => new Hex(c)),
      ),
    )
  })

  test('accepts an optional hex factory to create custom hexes with', () => {
    const coordinates: DeserializedCustomHex[] = [
      { q: 0, r: 0, custom: 'a' },
      { q: 1, r: 0, custom: 'b' },
    ]
    const hexFactory = vi.fn(({ q, r, custom }: DeserializedCustomHex) => CustomHex.create([q, r], custom))
    const result = Grid.fromJSON({ hexSettings: CustomHex.settings, coordinates }, hexFactory)

    expect(result).toBeInstanceOf(Grid)
    expect(result.hexPrototype).toContain(CustomHex.settings)
    expect(hexFactory).toBeCalledTimes(2)
    expect(hexFactory).toBeCalledWith(coordinates[0], 0, coordinates)
    expect(hexFactory).toBeCalledWith(coordinates[1], 1, coordinates)
    expect(result).toStrictEqual(
      new Grid(CustomHex, [CustomHex.create(coordinates[0], 'a'), CustomHex.create(coordinates[1], 'b')]),
    )
    expect(result.hexPrototype.constructor).toBe(CustomHex)
  })

  test('calls the hex factory to get the constructor when coordinates are empty', () => {
    const coordinates: DeserializedCustomHex[] = []
    const hexFactory = vi.fn(({ q, r, custom }: DeserializedCustomHex) => CustomHex.create([q, r], custom))
    const result = Grid.fromJSON({ hexSettings: CustomHex.settings, coordinates }, hexFactory)

    expect(hexFactory).toBeCalledTimes(1)
    expect(result).toStrictEqual(new Grid(CustomHex, []))
    expect(result.hexPrototype.constructor).toBe(CustomHex)
  })
})

test('has size property that is the amount of hexes in the grid', () => {
  expect(new Grid(Hex, rectangle({ width: 5, height: 5 })).size).toBe(25)
})

describe('pixelWidth property', () => {
  test('return 0 when the grid has no hexes', () => {
    expect(new Grid(Hex).pixelWidth).toBe(0)
  })

  test('returns the width in pixels', () => {
    const PointyHex = defineHex({ dimensions: 10, orientation: 'pointy' })
    const pointyHexWidth = PointyHex.prototype.width
    const FlatHex = defineHex({ dimensions: 10, orientation: 'flat' })
    const flatHexWidth = FlatHex.prototype.width

    expect(new Grid(PointyHex, rectangle({ width: 5, height: 1 })).pixelWidth).toBe(5 * pointyHexWidth)
    // flat hexes partially overlap in horizontal plane
    expect(new Grid(FlatHex, rectangle({ width: 5, height: 1 })).pixelWidth).toBe(5 * flatHexWidth - flatHexWidth)
  })
})

describe('pixelHeight property', () => {
  test('return 0 when the grid has no hexes', () => {
    expect(new Grid(Hex).pixelHeight).toBe(0)
  })

  test('returns the height in pixels', () => {
    const PointyHex = defineHex({ dimensions: 10, orientation: 'pointy' })
    const pointyHexHeight = PointyHex.prototype.height
    const FlatHex = defineHex({ dimensions: 10, orientation: 'flat' })
    const flatHexHeight = FlatHex.prototype.height

    // pointy hexes partially overlap in vertical plane
    expect(new Grid(PointyHex, rectangle({ width: 1, height: 5 })).pixelHeight).toBe(
      5 * pointyHexHeight - pointyHexHeight,
    )
    expect(new Grid(FlatHex, rectangle({ width: 1, height: 5 })).pixelHeight).toBe(5 * flatHexHeight)
  })
})

test('iterable', () => {
  const grid = new Grid(Hex, rectangle({ width: 2, height: 2 }))

  expect(grid[Symbol.iterator]).toBeTypeOf('function')
  expect([...grid]).toMatchInlineSnapshot(`
    [
      Hex {
        "q": 0,
        "r": 0,
      },
      Hex {
        "q": 1,
        "r": 0,
      },
      Hex {
        "q": 0,
        "r": 1,
      },
      Hex {
        "q": 1,
        "r": 1,
      },
    ]
  `)
})

describe('createHex()', () => {
  test(`uses the grid's hex constructor to create a hex`, () => {
    expect(new Grid(Hex).createHex([5, 2])).toStrictEqual(new Hex([5, 2]))
  })
})

describe('getHex()', () => {
  test('returns the hex with the passed coordinates when present in the grid', () => {
    const grid = new Grid(Hex, rectangle({ width: 2, height: 2 }))
    expect(grid.getHex([1, 0])).toStrictEqual(new Hex([1, 0]))
  })

  test(`returns undefined when the hex with the passed coordinates doesn't exist in the grid`, () => {
    const grid = new Grid(Hex, rectangle({ width: 2, height: 2 }))
    expect(grid.getHex([20, 40])).toBeUndefined()
  })
})

describe('hasHex()', () => {
  test('returns whether the passed hex is present in the grid', () => {
    const grid = new Grid(Hex, rectangle({ width: 2, height: 2 }))

    expect(grid.hasHex(new Hex([0, 1]))).toBe(true)
    expect(grid.hasHex(new Hex([10, 30]))).toBe(false)
  })
})

describe('setHexes()', () => {
  test('sets each hex of the passed iterable', () => {
    const grid = new Grid(Hex)
    expect(grid.size).toBe(0)

    const hexes = [new Hex([2, 3]), [1, -4] as HexCoordinates]
    const result = grid.setHexes(hexes)
    expect(result).toStrictEqual(new Grid(Hex, hexes))
    expect(result).toBe(grid)
  })
})

describe('filter()', () => {
  test('returns a new grid with only the hexes for which the predicate function returns true', () => {
    const grid = new Grid(Hex, rectangle({ width: 5, height: 5 }))
    const predicate: Mock<[Hex], boolean> = vi.fn((hex) => hex.q < 0)
    const result = grid.filter(predicate)

    expect(predicate).toBeCalledTimes(25)
    expect(result.toArray()).toMatchInlineSnapshot(`
      [
        Hex {
          "q": -1,
          "r": 2,
        },
        Hex {
          "q": -1,
          "r": 3,
        },
        Hex {
          "q": -2,
          "r": 4,
        },
        Hex {
          "q": -1,
          "r": 4,
        },
      ]
    `)
    expect(result).not.toBe(grid)
  })
})

describe('map()', () => {
  test('returns a new grid with each hex mapped by the passed function', () => {
    const grid = new Grid(Hex, rectangle({ width: 2, height: 2 }))
    const fn: Mock<[Hex], Hex> = vi.fn((hex) => hex.clone({ q: hex.q + 1, s: hex.s - 1 }))
    const result = grid.map(fn)

    expect(fn).toBeCalledTimes(4)
    expect(result.toArray()).toMatchInlineSnapshot(`
      [
        Hex {
          "q": 1,
          "r": 0,
        },
        Hex {
          "q": 2,
          "r": 0,
        },
        Hex {
          "q": 1,
          "r": 1,
        },
        Hex {
          "q": 2,
          "r": 1,
        },
      ]
    `)
    expect(result).not.toBe(grid)
  })
})

describe('traverse()', () => {
  test('iterates over the hexes from the passed traverser and returns a new grid with hexes present in the source grid', () => {
    const grid = new Grid(Hex, rectangle({ width: 2, height: 2 }))
    const traverser = rectangle({ start: [1, 0], width: 2, height: 2 })
    const getHex = vi.spyOn(grid, 'getHex')
    const result = grid.traverse(traverser)

    expect(getHex).toBeCalledTimes(4)
    expect(result.toArray()).toMatchInlineSnapshot(`
      [
        Hex {
          "q": 1,
          "r": 0,
        },
        Hex {
          "q": 1,
          "r": 1,
        },
      ]
    `)
    expect(result).not.toBe(grid)
  })

  test(`stops iteration early when bail is true and a hex isn't present in the source grid`, () => {
    const grid = new Grid(Hex, rectangle({ width: 2, height: 2 }))
    const traverser = rectangle({ start: [1, 0], width: 100, height: 100 })
    const getHex = vi.spyOn(grid, 'getHex')
    const result = grid.traverse(traverser, { bail: true })

    expect(getHex).toBeCalledTimes(2) // *after* getHex() returns undefined it can bail
    expect(result).toStrictEqual(new Grid(Hex, [[1, 0]]))
  })

  test('iterates over the hexes from the passed iterable and returns a new grid with hexes present in the source grid', () => {
    const grid = new Grid(Hex, rectangle({ width: 2, height: 2 }))
    const iterable = [new Hex([1, 0]), [0, 1] as HexCoordinates]
    const result = grid.traverse(iterable)

    expect(result.toArray()).toMatchInlineSnapshot(`
      [
        Hex {
          "q": 1,
          "r": 0,
        },
        Hex {
          "q": 0,
          "r": 1,
        },
      ]
    `)
  })

  test('iterates over the hexes from the passed grid and returns a new grid with hexes present in the source grid', () => {
    const grid = new Grid(Hex, rectangle({ width: 2, height: 2 }))
    const otherGrid = new Grid(Hex, rectangle({ start: [0, 1], width: 2, height: 2 }))
    const result = grid.traverse(otherGrid)

    expect(result.toArray()).toMatchInlineSnapshot(`
      [
        Hex {
          "q": 0,
          "r": 1,
        },
        Hex {
          "q": 1,
          "r": 1,
        },
      ]
    `)
  })
})

describe('forEach()', () => {
  test('passes each hex to the provided callback and returns itself', () => {
    const grid = new Grid(Hex, rectangle({ width: 2, height: 2 }))
    const fn: Mock<[Hex], void> = vi.fn()
    const result = grid.forEach(fn)

    expect(fn).toBeCalledTimes(4)
    expect(result.toArray()).toMatchInlineSnapshot(`
      [
        Hex {
          "q": 0,
          "r": 0,
        },
        Hex {
          "q": 1,
          "r": 0,
        },
        Hex {
          "q": 0,
          "r": 1,
        },
        Hex {
          "q": 1,
          "r": 1,
        },
      ]
    `)
    expect(result).toBe(grid)
  })
})

describe('reduce()', () => {
  test('passes the previous and current hex to the provided callback and returns the result', () => {
    const grid = new Grid(Hex, rectangle({ width: 2, height: 2 }))
    const reducer: Mock<[Hex, Hex], Hex> = vi.fn((previousHex, hex) => previousHex.translate(hex))
    const result = grid.reduce(reducer)

    expect(reducer).toBeCalledTimes(3)
    expect(result).toStrictEqual(new Hex([1, 2]))
  })

  test('passes the initial hex and current hex to the provided callback and returns the result', () => {
    const grid = new Grid(Hex, rectangle({ width: 2, height: 2 }))
    const reducer: Mock<[Hex, Hex], Hex> = vi.fn((acc, hex) => acc.translate(hex))
    const result = grid.reduce(reducer, new Hex([10, 10]))

    expect(reducer).toBeCalledTimes(4)
    expect(result).toStrictEqual(new Hex([12, 12]))
  })

  test('passes the initial value and current hex to the provided callback and returns the result', () => {
    const grid = new Grid(Hex, rectangle({ width: 2, height: 2 }))
    const reducer: Mock<[number, Hex], number> = vi.fn((acc, hex) => acc + hex.q)
    const result = grid.reduce(reducer, 0)

    expect(reducer).toBeCalledTimes(4)
    expect(result).toBe(2)
  })
})

describe('toArray()', () => {
  test('returns an array of the hexes in the grid', () => {
    const grid = new Grid(Hex, rectangle({ width: 2, height: 2 }))
    const result = grid.toArray()

    expect(result).toBeInstanceOf(Array)
    expect(result).toMatchInlineSnapshot(`
      [
        Hex {
          "q": 0,
          "r": 0,
        },
        Hex {
          "q": 1,
          "r": 0,
        },
        Hex {
          "q": 0,
          "r": 1,
        },
        Hex {
          "q": 1,
          "r": 1,
        },
      ]
    `)
  })
})

describe('toJSON()', () => {
  test('returns an object that can be used to serialize the grid', () => {
    const hexSettings: HexSettings = {
      dimensions: { xRadius: 10, yRadius: 10 },
      orientation: 'flat',
      origin: { x: 0, y: 0 },
      offset: 1,
    }
    const TestHex = defineHex(hexSettings)
    const coordinates = [new TestHex([0, 0]), new TestHex([1, 0])]
    const grid = new Grid(TestHex, coordinates)
    const result = grid.toJSON()

    expect(result).toStrictEqual({ hexSettings, coordinates })
    expect(JSON.stringify(grid)).toMatchInlineSnapshot(
      '"{\\"hexSettings\\":{\\"dimensions\\":{\\"xRadius\\":10,\\"yRadius\\":10},\\"orientation\\":\\"flat\\",\\"origin\\":{\\"x\\":0,\\"y\\":0},\\"offset\\":1},\\"coordinates\\":[{\\"q\\":0,\\"r\\":0},{\\"q\\":1,\\"r\\":0}]}"',
    )
  })
})

describe('toString()', () => {
  test('returns the constructor name and size', () => {
    const grid = new Grid(Hex, rectangle({ width: 5, height: 5 }))

    expect(grid.toString()).toBe('Grid(25)')
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    expect(`${grid}`).toBe('Grid(25)')
  })
})

describe('pointToHex()', () => {
  test('returns the hex that corresponds to the passed point, even outside the grid', () => {
    const TestHex = defineHex({ dimensions: 10 })
    const grid = new Grid(TestHex, rectangle({ width: 2, height: 2 }))

    expect(grid.pointToHex({ x: 20, y: 20 })).toBe(grid.getHex([1, 1]))
    expect(grid.pointToHex({ x: 1000, y: 1000 })).toBeInstanceOf(TestHex)
  })

  test(`when allowOutside is false, returns the hex that corresponds to the point when it's present in the grid`, () => {
    const TestHex = defineHex({ dimensions: 10 })
    const grid = new Grid(TestHex, rectangle({ width: 2, height: 2 }))

    expect(grid.pointToHex({ x: 1000, y: 1000 }, { allowOutside: false })).toBeUndefined()
  })
})

describe('distance()', () => {
  test('returns the distance in hexes between the passed two coordinates, even outside the grid', () => {
    const grid = new Grid(Hex, rectangle({ width: 2, height: 2 }))

    expect(grid.distance([0, 0], [1, 1])).toBe(2)
    expect(grid.distance([0, 0], [100, 100])).toBeTypeOf('number')
  })

  test(`when allowOutside is false, returns the distance in hexes between the passed two coordinates if they're present in the grid`, () => {
    const grid = new Grid(Hex, rectangle({ width: 2, height: 2 }))
    expect(grid.distance([0, 0], [100, 100], { allowOutside: false })).toBeUndefined()
  })
})

describe('neighborOf()', () => {
  test('returns the neighbor of the hex with the given coordinates in the given direction, even outside the grid', () => {
    const grid = new Grid(Hex, rectangle({ width: 2, height: 2 }))

    const neighborInGrid = grid.neighborOf([0, 0], Direction.E)
    const neighborOutsideGrid = grid.neighborOf([100, 100], Direction.E)

    expect(neighborInGrid).toBe(grid.getHex([1, 0]))
    expect(neighborOutsideGrid).not.toBe(grid.getHex([101, 100]))
    expect(neighborOutsideGrid).toStrictEqual(new Hex([101, 100]))
  })

  test(`when allowOutside is false, returns the neighbor of the hex with the given coordinates in the given direction if they're present in the grid`, () => {
    const grid = new Grid(Hex, rectangle({ width: 2, height: 2 }))

    // hex with coordinates doesn't exist
    expect(grid.neighborOf([100, 100], Direction.E, { allowOutside: false })).toBeUndefined()
    // neighbor doesn't exist
    expect(grid.neighborOf([1, 1], Direction.E, { allowOutside: false })).toBeUndefined()
  })
})
