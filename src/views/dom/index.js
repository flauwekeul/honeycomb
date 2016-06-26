import Point from '../../point'
import Hex from '../../hex'

import prototype from './prototype'

export default function DOM({ container, origin, hex } = { origin: Point(0, 0) }) {
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
