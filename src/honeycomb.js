import extendHex from './hex'
import defineGridFactory from './grid'
import Point from './point'

const defineGrid = defineGridFactory({ extendHex })

export {
    extendHex,
    defineGrid,
    Point
}
