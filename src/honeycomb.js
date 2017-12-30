import { ORIENTATIONS } from './hex/constants'
import extendHex from './hex'
import createGridFactoryFactory from './grid'
import Point from './point'

const Hex = {
    ORIENTATIONS,
    createFactory: extendHex
}
const Grid = {
    createFactory: createGridFactoryFactory({ extendHex })
}

export {
    Hex,
    Grid,
    Point
}
