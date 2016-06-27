import Point from '../point'
import Hex from '../hex'

export default {
    // width of a hex column
    // http://www.redblobgames.com/grids/hexagons/#basics
    colSize() {
        return Hex.prototype.isPointy() ?
            Hex.prototype.width() :
            Hex.prototype.width() * 3/4
    },

    // width of a hex row
    // http://www.redblobgames.com/grids/hexagons/#basics
    rowSize() {
        return Hex.prototype.isPointy() ?
            Hex.prototype.height() * 3/4 :
            Hex.prototype.height()
    },

    // http://www.redblobgames.com/grids/hexagons/implementation.html#orgheadline12
    parallelogram(width, height, start = Point()) {
        const hexes = []

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                hexes.push(Hex(x, y).add(Point(start)))
            }
        }

        return hexes
    },

    // http://www.redblobgames.com/grids/hexagons/implementation.html#orgheadline13
    triangle(side, start = Point()) {
        const hexes = []

        for (let x = 0; x < side; x++) {
            for (let y = 0; y < side - x; y++) {
                hexes.push(Hex(x, y).add(Point(start)))
            }
        }

        return hexes
    },

    // http://www.redblobgames.com/grids/hexagons/implementation.html#orgheadline14
    hexagon(radius, center = Point()) {
        const hexes = []
        // radius includes the center hex
        radius -= 1

        for (let x = -radius; x <= radius; x++) {
            const startY = Math.max(-radius, -x - radius)
            const endY = Math.min(radius, -x + radius)

            for (let y = startY; y <= endY; y++) {
                hexes.push(Hex(x, y).add(Point(center)))
            }
        }

        return hexes
    },

    // http://www.redblobgames.com/grids/hexagons/implementation.html#orgheadline15
    rectangle(width, height, start = Point()) {
        const hexes = []

        for (let y = 0; y < height; y++) {
            const yOffset = Math.floor(y / 2)

            for (let x = -yOffset; x < width - yOffset; x++) {
                hexes.push(Hex(x, y).add(Point(start)))
            }
        }

        return hexes
    }
}
