import { createHexPrototype } from './createHexPrototype'
import { pointToCube } from './pointToCube'

describe('pointy hex', () => {
  test('converts a point to cube coordinates', () => {
    const pointyHexPrototype = createHexPrototype({
      orientation: 'pointy',
      dimensions: { xRadius: 50, yRadius: 30 },
      origin: { x: -30, y: -30 },
    })

    // test points close to each side of all edges of hex with coordinates { q: 3, r: 4 }
    expect(pointToCube({ x: 440, y: 185 }, pointyHexPrototype)).toMatchObject({ q: 3, r: 3 })
    expect(pointToCube({ x: 440, y: 190 }, pointyHexPrototype)).toMatchObject({ q: 3, r: 4 })
    expect(pointToCube({ x: 485, y: 185 }, pointyHexPrototype)).toMatchObject({ q: 4, r: 3 })
    expect(pointToCube({ x: 485, y: 190 }, pointyHexPrototype)).toMatchObject({ q: 3, r: 4 })
    expect(pointToCube({ x: 505, y: 210 }, pointyHexPrototype)).toMatchObject({ q: 3, r: 4 })
    expect(pointToCube({ x: 510, y: 210 }, pointyHexPrototype)).toMatchObject({ q: 4, r: 4 })
    expect(pointToCube({ x: 440, y: 230 }, pointyHexPrototype)).toMatchObject({ q: 3, r: 4 })
    expect(pointToCube({ x: 440, y: 235 }, pointyHexPrototype)).toMatchObject({ q: 2, r: 5 })
    expect(pointToCube({ x: 485, y: 230 }, pointyHexPrototype)).toMatchObject({ q: 3, r: 4 })
    expect(pointToCube({ x: 485, y: 235 }, pointyHexPrototype)).toMatchObject({ q: 3, r: 5 })
    expect(pointToCube({ x: 415, y: 210 }, pointyHexPrototype)).toMatchObject({ q: 2, r: 4 })
    expect(pointToCube({ x: 420, y: 210 }, pointyHexPrototype)).toMatchObject({ q: 3, r: 4 })
  })
})

describe('flat hex', () => {
  test('converts a point to cube coordinates', () => {
    const flatHexPrototype = createHexPrototype({
      orientation: 'flat',
      dimensions: { xRadius: 50, yRadius: 30 },
      origin: { x: -30, y: -30 },
    })

    // test points close to each side of all edges of hex with coordinates { q: 3, r: 4 }
    expect(pointToCube({ x: 255, y: 285 }, flatHexPrototype)).toMatchObject({ q: 3, r: 3 })
    expect(pointToCube({ x: 255, y: 290 }, flatHexPrototype)).toMatchObject({ q: 3, r: 4 })
    expect(pointToCube({ x: 290, y: 300 }, flatHexPrototype)).toMatchObject({ q: 4, r: 3 })
    expect(pointToCube({ x: 290, y: 305 }, flatHexPrototype)).toMatchObject({ q: 3, r: 4 })
    expect(pointToCube({ x: 290, y: 325 }, flatHexPrototype)).toMatchObject({ q: 3, r: 4 })
    expect(pointToCube({ x: 290, y: 335 }, flatHexPrototype)).toMatchObject({ q: 4, r: 4 })
    expect(pointToCube({ x: 255, y: 340 }, flatHexPrototype)).toMatchObject({ q: 3, r: 4 })
    expect(pointToCube({ x: 255, y: 345 }, flatHexPrototype)).toMatchObject({ q: 3, r: 5 })
    expect(pointToCube({ x: 220, y: 325 }, flatHexPrototype)).toMatchObject({ q: 3, r: 4 })
    expect(pointToCube({ x: 220, y: 335 }, flatHexPrototype)).toMatchObject({ q: 2, r: 5 })
    expect(pointToCube({ x: 220, y: 300 }, flatHexPrototype)).toMatchObject({ q: 2, r: 4 })
    expect(pointToCube({ x: 220, y: 305 }, flatHexPrototype)).toMatchObject({ q: 3, r: 4 })
  })
})
