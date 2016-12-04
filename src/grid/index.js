import { is } from '../utils'
import Hex from '../hex'

export default function Grid({ hex }) {
    Hex.size(hex.size)
    Hex.orientation(hex.orientation)
    Hex.origin(hex.origin)

    return {
        pointToHex,
        hexToPoint,
        colSize,
        rowSize,
        parallelogram,
        triangle,
        hexagon,
        rectangle
    }
}

// http://www.redblobgames.com/grids/hexagons/#pixel-to-hex
function pointToHex(point) {
    return Hex.fromPoint(point)
}

function hexToPoint(hex) {
    return hex.toPoint()
}

// width of a hex column
// http://www.redblobgames.com/grids/hexagons/#basics
function colSize() {
    return Hex.isPointy() ?
        Hex.width() :
        Hex.width() * 3/4
}

// width of a hex row
// http://www.redblobgames.com/grids/hexagons/#basics
function rowSize() {
    return Hex.isPointy() ?
        Hex.height() * 3/4 :
        Hex.height()
}

// http://www.redblobgames.com/grids/hexagons/implementation.html#orgheadline12
// TODO: should also (only?) accept an object
function parallelogram(
    widthOrOptions,
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

    if (is.objectLiteral(widthOrOptions)) {
        ({ width, height, start = Hex(), direction = 'SE' } = widthOrOptions)
        return this.parallelogram(width, height, start, direction)
    }

    let width = widthOrOptions
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
}

// http://www.redblobgames.com/grids/hexagons/implementation.html#orgheadline13
// TODO: should also (only?) accept an object
function triangle(
    sideOrOptions,
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

    if (is.objectLiteral(sideOrOptions)) {
        ({ side, start = Hex(), direction = 'down' } = sideOrOptions)
        return this.triangle(side, start, direction)
    }

    let side = sideOrOptions
    const { yStart, yEnd } = DIRECTIONS[direction]
    const hexes = []

    for (let x = 0; x < side; x++) {
        for (let y = yStart(x); y < yEnd(x); y++) {
            hexes.push(Hex(x, y).add(Hex(start)))
        }
    }

    return hexes
}

// http://www.redblobgames.com/grids/hexagons/implementation.html#orgheadline14
// TODO: should also (only?) accept an object
function hexagon(
    radiusOrOptions,
    center = Hex()
) {
    if (is.objectLiteral(radiusOrOptions)) {
        ({ radius, center = Hex() } = radiusOrOptions)
        return this.hexagon(radius, center)
    }

    let radius = radiusOrOptions
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
}

// http://www.redblobgames.com/grids/hexagons/implementation.html#orgheadline15
// TODO: should also (only?) accept an object
function rectangle(
    widthOrOptions,
    height,
    start = Hex(),
    // rotate 60° counterclockwise for flat hexes
    direction = Hex.isPointy() ? 'E' : 'SE'
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
    if (is.objectLiteral(widthOrOptions)) {
        ({ width, height, start = Hex(), direction = Hex.isPointy() ? 'E' : 'SE' } = widthOrOptions)
        return this.rectangle(width, height, start, direction)
    }

    let width = widthOrOptions
    const [ firstCoordinate, secondCoordinate ] = DIRECTIONS[direction]
    const firstStop = Hex.isPointy() ? width : height
    const secondStop = Hex.isPointy() ? height : width
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
