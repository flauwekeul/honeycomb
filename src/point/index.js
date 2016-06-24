import { isNumber, isObject, isArray } from '../utils'
import prototype from './prototype'

export default function Point(coordinatesOrX, y) {
    let x

    switch (true) {
        case isNumber(coordinatesOrX):
            x = coordinatesOrX
            y = isNumber(y) ? y : x
            break
        case isArray(coordinatesOrX):
            [ x, y ] = coordinatesOrX
            break
        case isObject(coordinatesOrX):
            ({ x, y } = coordinatesOrX)
            break
        default:
            x = y = 0
    }

    return Object.assign(
        Object.create(prototype),
        { x, y }
    )
}
