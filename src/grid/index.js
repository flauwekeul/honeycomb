import Hex from '../hex'
const prototype = {}

export default function Grid(options = {}) {
    // TODO: change this to a getter/setter, like Hex.orientation()
    Hex.size = options.hex.size
    Hex.orientation(options.hex.orientation)

    return Object.assign(Object.create(prototype), {
        width: options.width,
        height: options.height
    })
}
