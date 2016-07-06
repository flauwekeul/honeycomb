import isDom from 'is-dom'
import Point from '../../point'
import Hex from '../../hex'

import prototype from './prototype'

export default function DOM({ container, hex, origin = Point(0, 0) }) {
    if (!isDom(container)) {
        console.warn(`Container is not a valid dom node: ${container}.`)
        return false
    }

    Hex.prototype.element(hex.element)

    return Object.assign(
        Object.create(prototype),
        {
            origin: Point(origin),
            container,
            hex
        }
    )
}
