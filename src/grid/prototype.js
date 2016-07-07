import Point from '../point'
import Hex from '../hex'

export default {
    // http://www.redblobgames.com/grids/hexagons/#pixel-to-hex
    pointToHex(point) {
        const size = this.hex.size()
        let x, y

        // guarantee point is an actual Point instance
        point = Point(point)

        if (this.hex.isPointy()) {
            x = (point.x * Math.sqrt(3)/3 - point.y / 3) / size
            y = point.y * 2/3 / size
        } else {
            x = point.x * 2/3 / size
            y = (-point.x / 3 + Math.sqrt(3)/3 * point.y) / size
        }

        return Hex(x, y).round()
    },

    // convenience method
    hexToPoint(hex) {
        return hex.toPoint()
    },

    // width of a hex column
    // http://www.redblobgames.com/grids/hexagons/#basics
    colSize() {
        return this.hex.isPointy() ?
            this.hex.width() :
            this.hex.width() * 3/4
    },

    // width of a hex row
    // http://www.redblobgames.com/grids/hexagons/#basics
    rowSize() {
        return this.hex.isPointy() ?
            this.hex.height() * 3/4 :
            this.hex.height()
    },

    // http://www.redblobgames.com/grids/hexagons/implementation.html#orgheadline12
    parallelogram(width, height, start = Hex()) {
        const hexes = []

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                hexes.push(Hex(x, y).add(Hex(start)))
            }
        }

        return hexes
    },

    // http://www.redblobgames.com/grids/hexagons/implementation.html#orgheadline13
    triangle(side, start = Hex()) {
        const hexes = []

        for (let x = 0; x < side; x++) {
            for (let y = 0; y < side - x; y++) {
                hexes.push(Hex(x, y).add(Hex(start)))
            }
        }

        return hexes
    },

    // http://www.redblobgames.com/grids/hexagons/implementation.html#orgheadline14
    hexagon(radius, center = Hex()) {
        const hexes = []
        // radius includes the center hex
        radius -= 1

        for (let x = -radius; x <= radius; x++) {
            const startY = Math.max(-radius, -x - radius)
            const endY = Math.min(radius, -x + radius)

            for (let y = startY; y <= endY; y++) {
                hexes.push(Hex(x, y).add(Hex(center)))
            }
        }

        return hexes
    },

    // http://www.redblobgames.com/grids/hexagons/implementation.html#orgheadline15
    rectangle(width, height, start = Hex()) {
        const hexes = []

        for (let y = 0; y < height; y++) {
            const yOffset = Math.floor(y / 2)

            for (let x = -yOffset; x < width - yOffset; x++) {
                hexes.push(Hex(x, y).add(Hex(start)))
            }
        }

        return hexes
    }
}
