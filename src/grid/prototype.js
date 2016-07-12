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
    // TODO: should also (only?) accept an object
    parallelogram(
        width,
        height,
        start = Hex(),
        direction = 'SE'
    ) {
        // TODO: validate direction
        const DIRECTIONS = {
            'SE': ['x', 'y'],
            'SW': ['y', 'z'],
            'N': ['z', 'x']
        }
        const [ firstCoordinate, secondCoordinate ] = DIRECTIONS[direction]
        const hexes = []

        for (let first = 0; first < width; first++) {
            for (let second = 0; second < height; second++) {
                hexes.push(
                    Hex({
                        [firstCoordinate]: first,
                        [secondCoordinate]: second
                    }).add(Hex(start))
                )
            }
        }

        return hexes
    },

    // http://www.redblobgames.com/grids/hexagons/implementation.html#orgheadline13
    // TODO: should also (only?) accept an object
    triangle(
        side,
        start = Hex(),
        direction = 'down'
    ) {
        // TODO: validate direction
        const DIRECTIONS = {
            'down': {
                yStart: () => 0,
                yEnd: x => side - x
            },
            'up': {
                yStart: x => side - x,
                yEnd: () => side + 1
            }
        }
        const { yStart, yEnd } = DIRECTIONS[direction]
        const hexes = []

        for (let x = 0; x < side; x++) {
            for (let y = yStart(x); y < yEnd(x); y++) {
                hexes.push(Hex(x, y).add(Hex(start)))
            }
        }

        return hexes
    },

    // http://www.redblobgames.com/grids/hexagons/implementation.html#orgheadline14
    // TODO: should also (only?) accept an object
    hexagon(
        radius,
        center = Hex()
    ) {
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
    // TODO: should also (only?) accept an object
    rectangle(
        width,
        height,
        start = Hex(),
        // rotate 60° counterclockwise for flat hexes
        direction = this.hex.isPointy() ? 'E' : 'SE'
    ) {
        // TODO: validate direction
        const DIRECTIONS = {
            'E': ['x', 'y'],
            'NW': ['z', 'x'],
            'SW': ['y', 'z'],
            'SE': ['y', 'x'],
            'NE': ['x', 'z'],
            'W': ['z', 'y']
        }
        const [ firstCoordinate, secondCoordinate ] = DIRECTIONS[direction]
        const firstStop = this.hex.isPointy() ? width : height
        const secondStop = this.hex.isPointy() ? height : width
        const hexes = []

        for (let second = 0; second < secondStop; second++) {
            const secondOffset = Math.floor(second / 2)

            for (let first = -secondOffset; first < firstStop - secondOffset; first++) {
                hexes.push(
                    Hex({
                        [firstCoordinate]: first,
                        [secondCoordinate]: second
                    }).add(Hex(start))
                )
            }
        }

        return hexes
    }
}
