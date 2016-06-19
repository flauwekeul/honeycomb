import Hex from '../hex'
import prototype from './prototype'

export default function Grid({ hex }) {
    Hex.prototype.size(hex.size)
    Hex.prototype.orientation(hex.orientation)

    return Object.assign(Object.create(prototype), { hex })
}
