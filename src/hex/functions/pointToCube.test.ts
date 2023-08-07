import { describe, expect, test } from 'vitest'
import { pointToCube } from './pointToCube'

describe('pointy hex', () => {
  test('converts a point to cube coordinates', () => {
    const hexSettings: Parameters<typeof pointToCube>[0] = {
      orientation: 'pointy',
      dimensions: { xRadius: 50, yRadius: 30 },
      origin: { x: -30, y: -30 },
    }

    // test points close to each side of all edges of hex with coordinates { q: 3, r: 4 }
    expect(pointToCube(hexSettings, { x: 440, y: 185 })).toMatchObject({ q: 3, r: 3 })
    expect(pointToCube(hexSettings, { x: 440, y: 190 })).toMatchObject({ q: 3, r: 4 })
    expect(pointToCube(hexSettings, { x: 485, y: 185 })).toMatchObject({ q: 4, r: 3 })
    expect(pointToCube(hexSettings, { x: 485, y: 190 })).toMatchObject({ q: 3, r: 4 })
    expect(pointToCube(hexSettings, { x: 505, y: 210 })).toMatchObject({ q: 3, r: 4 })
    expect(pointToCube(hexSettings, { x: 510, y: 210 })).toMatchObject({ q: 4, r: 4 })
    expect(pointToCube(hexSettings, { x: 440, y: 230 })).toMatchObject({ q: 3, r: 4 })
    expect(pointToCube(hexSettings, { x: 440, y: 235 })).toMatchObject({ q: 2, r: 5 })
    expect(pointToCube(hexSettings, { x: 485, y: 230 })).toMatchObject({ q: 3, r: 4 })
    expect(pointToCube(hexSettings, { x: 485, y: 235 })).toMatchObject({ q: 3, r: 5 })
    expect(pointToCube(hexSettings, { x: 415, y: 210 })).toMatchObject({ q: 2, r: 4 })
    expect(pointToCube(hexSettings, { x: 420, y: 210 })).toMatchObject({ q: 3, r: 4 })
  })
})

describe('flat hex', () => {
  test('converts a point to cube coordinates', () => {
    const hexSettings: Parameters<typeof pointToCube>[0] = {
      orientation: 'flat',
      dimensions: { xRadius: 50, yRadius: 30 },
      origin: { x: -30, y: -30 },
    }

    // test points close to each side of all edges of hex with coordinates { q: 3, r: 4 }
    expect(pointToCube(hexSettings, { x: 255, y: 285 })).toMatchObject({ q: 3, r: 3 })
    expect(pointToCube(hexSettings, { x: 255, y: 290 })).toMatchObject({ q: 3, r: 4 })
    expect(pointToCube(hexSettings, { x: 290, y: 300 })).toMatchObject({ q: 4, r: 3 })
    expect(pointToCube(hexSettings, { x: 290, y: 305 })).toMatchObject({ q: 3, r: 4 })
    expect(pointToCube(hexSettings, { x: 290, y: 325 })).toMatchObject({ q: 3, r: 4 })
    expect(pointToCube(hexSettings, { x: 290, y: 335 })).toMatchObject({ q: 4, r: 4 })
    expect(pointToCube(hexSettings, { x: 255, y: 340 })).toMatchObject({ q: 3, r: 4 })
    expect(pointToCube(hexSettings, { x: 255, y: 345 })).toMatchObject({ q: 3, r: 5 })
    expect(pointToCube(hexSettings, { x: 220, y: 325 })).toMatchObject({ q: 3, r: 4 })
    expect(pointToCube(hexSettings, { x: 220, y: 335 })).toMatchObject({ q: 2, r: 5 })
    expect(pointToCube(hexSettings, { x: 220, y: 300 })).toMatchObject({ q: 2, r: 4 })
    expect(pointToCube(hexSettings, { x: 220, y: 305 })).toMatchObject({ q: 3, r: 4 })
  })
})
