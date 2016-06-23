import { isNumber, isObject, isArray } from '../utils'

export default function Point(coordinatesOrX, y) {
    // don't know how to make this more elegant **and** not fool babel
    // e.g.: when replacing the last 3 return statements with a single
    // return statement outside the if/else blocks, babel loses reference
    // to x and y.
    if (isNumber(coordinatesOrX)) {
        const x = coordinatesOrX
        return {
            x,
            y: isNumber(y) ? y : x
        }
    } else if (isArray(coordinatesOrX)) {
        const [ x, y ] = coordinatesOrX
        return { x, y }
    } else if (isObject(coordinatesOrX)) {
        const { x, y } = coordinatesOrX
        return { x, y }
    } else {
        const x = y = 0
        return { x, y }
    }
}
