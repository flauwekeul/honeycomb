import { ensureXY } from './utils'
import extendHexFactory from './hex'
import defineGridFactory from './grid'
import Grid from './grid/class'
import PointFactory from './point'

const extendHex = extendHexFactory({ ensureXY })
const defineGrid = defineGridFactory({ extendHex, Grid })
const Point = PointFactory({ ensureXY })

/**
 * @namespace {Object} Honeycomb
 */
export {
    extendHex,
    defineGrid,
    Point
}
