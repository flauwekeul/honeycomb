import extendHex from './hex'
import defineGridFactory from './grid'
import Point from './point'

const defineGrid = defineGridFactory({ extendHex })

/**
 * @namespace {Object} Honeycomb
 */
export {
    extendHex,
    defineGrid,
    Point
}
