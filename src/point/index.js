import { is } from '../utils'
import prototype from './proto'

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
        Object.create(prototype),
        { x, y }
    )
}
