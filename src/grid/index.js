import Hex from '../hex'
import prototype from './prototype'

export default function Grid(options = {}) {
    Hex.prototype.size(options.hex.size)
    Hex.prototype.orientation(options.hex.orientation)

    return Object.assign(Object.create(prototype), {
        width: options.width,
        height: options.height
    })
}
