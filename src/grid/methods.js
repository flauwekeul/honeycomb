import { is } from '../utils'
import Hex from '../hex'

/**
 * @method Grid#pointToHex
 *
 * @description
 * Translates a point to a hex coordinate.
 *
 * @see {@link http://www.redblobgames.com/grids/hexagons/#pixel-to-hex|redblobgames.com}
 *
 * @borrows Hex#fromPoint as Grid#pointToHex
 *
 * @param   {Point} point   The point to translate from.
 *
 * @returns {Hex}           The hex to translate to.
 */
export function pointToHex(point) {
    return Hex.fromPoint(point)
}

/**
 * @method Grid#hexToPoint
 *
 * @description
 * Translates a hex coordinate to a point.
 *
 * @see {@link http://www.redblobgames.com/grids/hexagons/#hex-to-pixel|redblobgames.com}
 *
 * @borrows Hex#toPoint as Grid#hexToPoint
 *
 * @param   {Hex} hex   The hex to translate from.
 *
 * @returns {Point}     The point to translate to.
 */
export function hexToPoint(hex) {
    return hex.toPoint()
}

/**
 * @method Grid#colSize
 *
 * @see {@link http://www.redblobgames.com/grids/hexagons/#basics|redblobgames.com}
 *
 * @returns {Number} The width of a (vertical) column of hexes in the grid.
 */
export function colSize() {
    return Hex.isPointy() ?
        Hex.width() :
        Hex.width() * 3/4
}

/**
 * @method Grid#rowSize
 *
 * @see {@link http://www.redblobgames.com/grids/hexagons/#basics|redblobgames.com}
 *
 * @returns {Number} The height of a (horizontal) row of hexes in the grid.
 */
export function rowSize() {
    return Hex.isPointy() ?
        Hex.height() * 3/4 :
        Hex.height()
}

/**
 * @method Grid#parallelogram
 *
 * @description
 * Creates a grid in the shape of a [parallelogram](https://en.wikipedia.org/wiki/Parallelogram).
 *
 * @todo Validate the direction param
 * @todo Either use numeric directions (like Hex#neighbor), or "compass" directions, not both.
 * @todo Add examples.
 *
 * @see {@link http://www.redblobgames.com/grids/hexagons/implementation.html#map-shapes|redblobgames.com}
 *
 * @param   {(Number|Object)} widthOrOptions    The width (in hexes) or an options object.
 * @param   {Number=} height                    The height (in hexes).
 * @param   {Hex=} start                        The origin hex.
 * @param   {('SE'|'SW'|'N')} [direction=SE]    The direction (from the start hex) in which to create the shape. Each direction corresponds to a different arrangement of hexes.
 *
 * @returns {Hex[]}                             Array of hexes that - when rendered - form a parallelogram shape.
 */
export function parallelogram(
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

/**
 * @method Grid#triangle
 *
 * @description
 * Creates a grid in the shape of a [(equilateral) triangle](https://en.wikipedia.org/wiki/Equilateral_triangle).
 *
 * @todo Validate the direction param
 * @todo Either use numeric directions (like Hex#neighbor), or "compass" directions, not both.
 * @todo Add examples.
 *
 * @see {@link http://www.redblobgames.com/grids/hexagons/implementation.html#map-shapes|redblobgames.com}
 *
 * @param   {(Number|Object)} sideOrOptions     The side length (in hexes) or an options object.
 * @param   {Hex=} start                        The origin hex.
 * @param   {('down'|'up')} [direction=down]    The direction (from the start hex) in which to create the shape. Each direction corresponds to a different arrangement of hexes. In this case a triangle pointing up/down (with pointy hexes) or right/left (with flat hexes).
 *
 * @returns {Hex[]}                             Array of hexes that - when rendered - form a triangle shape.
 */
export function triangle(
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

/**
 * @method Grid#hexagon
 *
 * @description
 * Creates a grid in the shape of a [hexagon](https://en.wikipedia.org/wiki/Hexagon).
 *
 * @todo Add examples.
 *
 * @see {@link http://www.redblobgames.com/grids/hexagons/implementation.html#map-shapes|redblobgames.com}
 *
 * @param   {(Number|Object)} radiusOrOptions   The radius (in hexes) or an options object.
 * @param   {Hex=} center                       The center hex.
 *
 * @returns {Hex[]}                             Array of hexes that - when rendered - form a hexagon shape (very meta 😎).
 */
export function hexagon(
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

/**
 * @method Grid#rectangle
 *
 * @description
 * Creates a grid in the shape of a [rectangle](https://en.wikipedia.org/wiki/Rectangle).
 *
 * @todo Validate the direction param
 * @todo Either use numeric directions (like Hex#neighbor), or "compass" directions, not both.
 * @todo Add examples.
 *
 * @see {@link http://www.redblobgames.com/grids/hexagons/implementation.html#map-shapes|redblobgames.com}
 *
 * @param   {(Number|Object)} widthOrOptions    The width (in hexes) or an options object.
 * @param   {Number=} height                    The height (in hexes).
 * @param   {Hex=} start                        The origin hex.
 * @param   {('E'|'NW'|'SW'|'SE'|'NE'|'W')} [direction=E/SE]
 * The direction (from the start hex) in which to create the shape. Each direction corresponds to a different arrangement of hexes. The default direction for pointy hexes is 'E' and 'SE' for flat hexes.
 *
 * @returns {Hex[]}                             Array of hexes that - when rendered - form a rectengular shape.
 */
export function rectangle(
    widthOrOptions,
    height,
    start = Hex(),
    // rotate 60° counterclockwise for flat hexes
    direction = Hex.isPointy() ? 'E' : 'SE'
) {
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
