import Hex from '../hex'
import prototype from './prototype'

export default function Grid({ hex }) {
    const size = Hex.prototype.size(hex.size)
    const orientation = Hex.prototype.orientation(hex.orientation)
    const origin = Hex.prototype.origin(hex.origin)

    return Object.assign(Object.create(prototype), {
        hex: { size, orientation, origin }
    })
}
