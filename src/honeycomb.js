import { ensureXY } from './utils'
import extendHexFactory from './hex'
import defineGridFactory from './grid'
import PointFactory from './point'

const extendHex = extendHexFactory({ ensureXY })
const defineGrid = defineGridFactory({ extendHex })
const Point = PointFactory({ ensureXY })

/**
 * @namespace {Object} Honeycomb
 */
export {
    extendHex,
    defineGrid,
    Point
}
