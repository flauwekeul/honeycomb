import Hex from '../hex'
import prototype from './prototype'

export default function Grid({ hex }) {
    Hex.prototype.size(hex.size)
    Hex.prototype.orientation(hex.orientation)
    Hex.prototype.origin(hex.origin)

    return Object.assign(Object.create(prototype), { hex })
}
