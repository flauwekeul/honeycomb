import Hex from '../hex'

export default {
    // http://www.redblobgames.com/grids/hexagons/implementation.html#orgheadline12
    parallelogram(width, height) {
        const hexes = []
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                hexes.push(Hex(x, y))
            }
        }
        return hexes
    },

    // http://www.redblobgames.com/grids/hexagons/implementation.html#orgheadline13
    triangle(side) {
        const hexes = []
        for (let x = 0; x < side; x++) {
            for (let y = 0; y < side - x; y++) {
                hexes.push(Hex(x, y))
            }
        }
        return hexes
    },

    hexagon(side) {
        const hexes = []
        for (let x = -side; x < side; x++) {
            const yStart = Math.max(-side, -x - side)
            const yEnd = Math.min(side, -x + side)
            for (let y = yStart; y < yEnd; y++) {
                hexes.push(Hex(x, y))
            }
        }
        return hexes
    },

    // http://www.redblobgames.com/grids/hexagons/implementation.html#orgheadline15
    rectangle(width, height) {
        const hexes = []
        for (let y = 0; y < height; y++) {
            const yOffset = Math.floor(y / 2)
            for (let x = -yOffset; x < width - yOffset; x++) {
                hexes.push(Hex(x, y))
            }
        }
        return hexes
    }
}
