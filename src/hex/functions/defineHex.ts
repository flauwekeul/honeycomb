import { defaultHexSettings, Hex } from '../hex'
import { BoundingBox, Ellipse, HexOffset, HexOptions, Orientation, Point } from '../types'
import { createHexDimensions } from './createHexDimensions'
import { createHexOrigin } from './createHexOrigin'

export function defineHex(hexPrototypeOptions?: Partial<HexOptions>): typeof Hex {
  const { dimensions, orientation, origin, offset } = { ...defaultHexSettings, ...hexPrototypeOptions }

  return class extends Hex {
    get dimensions(): Ellipse {
      return createHexDimensions(dimensions as BoundingBox, orientation)
    }

    get orientation(): Orientation {
      return orientation
    }

    get origin(): Point {
      return createHexOrigin(origin as 'topLeft', this)
    }

    get offset(): HexOffset {
      return offset
    }
  }
}
