import { ORIENTATIONS } from './hex/constants'
import createHexFactory from './hex'
import createGridFactoryFactory from './grid'
import Point from './point'

const Hex = {
    ORIENTATIONS,
    createFactory: createHexFactory
}
const Grid = {
    createFactory: createGridFactoryFactory({ createHexFactory })
}

export {
    Hex,
    Grid,
    Point
}
