import defineGridFactory from './grid'
import Grid from './grid/class'
import extendHexFactory from './hex'
import PointFactory from './point'
import { ensureXY, normalizeRadiuses } from './utils'

const Point = PointFactory({ ensureXY })
const extendHex = extendHexFactory({ ensureXY, normalizeRadiuses, Point })
const defineGrid = defineGridFactory({ extendHex, Grid, Point })

/**
 * @namespace {Object} Honeycomb
 */
export { extendHex, defineGrid, Point }
