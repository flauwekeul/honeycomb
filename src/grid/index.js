const prototype = {}

export default function Grid(options = {}) {
    return Object.assign(Object.create(prototype), {
        width: options.width,
        height: options.height
    })
}
