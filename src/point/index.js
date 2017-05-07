import { is } from '../utils'
import * as methods from './prototype'

/**
 * @function Point
 *
 * @description
 * Factory function for creating 2-dimensional points.
 *
 * @param {(Number|Number[]|Object)} [coordinatesOrX=0] The x coordinate or an array or object of x and/or y coordinates.
 * @param {Number} [coordinatesOrX.x=0] The x coordinate.
 * @param {Number} [coordinatesOrX.y=0] The y coordinate.
 * @param {Number} [y=0]                                The y coordinate.
 *
 * @returns {Point}                     A point object.
 */
export default function Point(coordinatesOrX, y) {
    let x

    switch (true) {
        case is.number(coordinatesOrX):
            x = coordinatesOrX
            y = is.number(y) ? y : x
            break
        case is.array(coordinatesOrX):
            [ x, y ] = coordinatesOrX
            break
        case is.object(coordinatesOrX):
            ({ x, y } = coordinatesOrX)
            break
        default:
            x = y = 0
    }

    return Object.assign(
        Object.create(methods),
        { x, y }
    )
}
