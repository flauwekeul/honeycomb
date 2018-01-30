import { isString } from 'axis.js'

import { _offsetFromZero } from '../utils'

export function isValidHexFactory({ Grid }) {
    return function isValidHex(value) {
        return Grid.isValidHex(value)
    }
}

export function pointToHexFactory({ Point, Hex }) {
    /**
     * @method Grid#pointToHex
     *
     * @description
     * Converts the passed 2-dimensional {@link Point|point} to a hex.
     *
     * @see {@link http://www.redblobgames.com/grids/hexagons/#pixel-to-hex|redblobgames.com}
     *
     * @param {Point} point The {@link Point|point-like} to convert from.
     *
     * @returns {Hex}       The hex (with rounded coordinates) that contains the passed point.
     *
     * @example
     * import { Grid, Point } from 'Honeycomb'
     *
     * const grid = Grid({ size: 50 })
     *
     * grid.pointToHex(Point(120, 300))     // { x: -1, y: 4 }
     * // also accepts a point-like:
     * grid.pointToHex({ x: 120, y: 300 })  // { x: -1, y: 4 }
     * grid.pointToHex([ 120, 300 ])        // { x: -1, y: 4 }
     */
    return function pointToHex(point) {
        const hex = Hex()
        const size = hex.size
        let x, y

        // guarantee point is an actual Point instance
        point = Point(point)

        if (hex.isPointy()) {
            x = (point.x * Math.sqrt(3) / 3 - point.y / 3) / size
            y = point.y * 2 / 3 / size
        } else {
            x = point.x * 2 / 3 / size
            y = (-point.x / 3 + Math.sqrt(3) / 3 * point.y) / size
        }

        return Hex(x, y).round()
    }
}

export function colSizeFactory({ Hex }) {
    /**
     * @method Grid#colSize
     *
     * @see {@link http://www.redblobgames.com/grids/hexagons/#size-and-spacing|redblobgames.com}
     *
     * @returns {number} The width of a (vertical) column of hexes in the grid.
     */
    return function colSize() {
        const hex = Hex()
        return hex.isPointy() ?
            hex.width() :
            hex.width() * 3 / 4
    }
}

export function rowSizeFactory({ Hex }) {
    /**
     * @method Grid#rowSize
     *
     * @see {@link http://www.redblobgames.com/grids/hexagons/#size-and-spacing|redblobgames.com}
     *
     * @returns {number} The height of a (horizontal) row of hexes in the grid.
     */
    return function rowSize() {
        const hex = Hex()
        return hex.isPointy() ?
            hex.height() * 3 / 4 :
            hex.height()
    }
}

export function parallelogramFactory({ Grid, Hex }) {
    /**
     * @method Grid#parallelogram
     *
     * @description
     * Creates a grid in the shape of a [parallelogram](https://en.wikipedia.org/wiki/Parallelogram).
     *
     * @todo Validate the direction param
     *
     * @see {@link http://www.redblobgames.com/grids/hexagons/implementation.html#map-shapes|redblobgames.com}
     *
     * @param {Object} options                      An options object.
     * @param {number} options.width                The width (in hexes).
     * @param {number} options.height               The height (in hexes).
     * @param {Hex} [options.start=Hex(0,0,0)]      The start hex.
     * @param {(1|3|5)} [options.direction=1]       The direction (from the start hex) in which to create the shape. Each direction corresponds to a different arrangement of hexes.
     * @param {Function} [options.onCreate=noop]    Callback that's called for each created hex, passing the created hex.
     *
     * @returns {Hex[]}                             Array of hexes in a parallelogram arrangement.
     */
    return function parallelogram({
        width,
        height,
        start,
        direction = 1,
        onCreate = () => { }
    }) {
        start = Hex(start)
        // TODO: validate direction
        const DIRECTIONS = {
            1: ['q', 'r', 's'],
            3: ['r', 's', 'q'],
            5: ['s', 'q', 'r']
        }
        const [firstCoordinate, secondCoordinate, thirdCoordinate] = DIRECTIONS[direction]
        const grid = new Grid()

        for (let first = 0; first < width; first++) {
            for (let second = 0; second < height; second++) {
                const hex = Hex(start.cubeToCartesian({
                    [firstCoordinate]: first + start[firstCoordinate],
                    [secondCoordinate]: second + start[secondCoordinate],
                    [thirdCoordinate]: -first - second + start[thirdCoordinate]
                }))
                onCreate(hex, grid)
                grid.push(hex)
            }
        }

        return grid
    }
}

export function triangleFactory({ Grid, Hex }) {
    /**
     * @method Grid#triangle
     *
     * @description
     * Creates a grid in the shape of a [(equilateral) triangle](https://en.wikipedia.org/wiki/Equilateral_triangle).
     *
     * @todo Validate the direction param
     *
     * @see {@link http://www.redblobgames.com/grids/hexagons/implementation.html#map-shapes|redblobgames.com}
     *
     * @param {Object} options                      An options object.
     * @param {number} options.size                 The side length (in hexes).
     * @param {Hex} [options.start=Hex(0,0,0)]      The start hex. **Note**: it's not the first hex, but rather a hex relative to the triangle.
     * @param {(1|5)} [options.direction=1]         The direction in which to create the shape. Each direction corresponds to a different arrangement of hexes. In this case a triangle pointing up (`direction: 1`) or down (`direction: 5`) (with pointy hexes) or right (`direction: 1`) or left (`direction: 5`) (with flat hexes).
     * @param {Function} [options.onCreate=noop]    Callback that's called for each created hex, passing the created hex.
     *
     * @returns {Hex[]}                             Array of hexes in a triangular arrangement.
     */
    return function triangle({
        size,
        start,
        direction = 1,
        onCreate = () => { }
    }) {
        start = Hex(start)
        // TODO: validate direction
        const DIRECTIONS = {
            1: {
                rStart: () => 0,
                rEnd: q => size - q
            },
            5: {
                rStart: q => size - q,
                rEnd: () => size + 1
            }
        }
        const { rStart, rEnd } = DIRECTIONS[direction]
        const grid = new Grid()

        for (let q = 0; q < size; q++) {
            for (let r = rStart(q); r < rEnd(q); r++) {
                const hex = Hex(start.cubeToCartesian({
                    q: q + start.q,
                    r: r + start.r,
                    s: -q - r + start.s
                }))
                onCreate(hex, grid)
                grid.push(hex)
            }
        }

        return grid
    }
}

export function hexagonFactory({ Grid, Hex }) {
    /**
     * @method Grid#hexagon
     *
     * @description
     * Creates a grid in the shape of a [hexagon](https://en.wikipedia.org/wiki/Hexagon).
     *
     * @see {@link http://www.redblobgames.com/grids/hexagons/implementation.html#map-shapes|redblobgames.com}
     *
     * @param {Object} options                      An options object.
     * @param {number} options.radius               The radius (in hexes) *excluding* the center hex.
     * @param {Hex} [options.center=Hex(0,0,0)]     The center hex.
     * @param {Function} [options.onCreate=noop]    Callback that's called for each created hex, passing the created hex.
     *
     * @returns {Hex[]}                             Array of hexes in a hexagon arrangement (very meta 😎).
     */
    return function hexagon({
        radius,
        center,
        onCreate = () => { }
    }) {
        center = Hex(center)

        const grid = new Grid()

        for (let q = -radius; q <= radius; q++) {
            const startR = Math.max(-radius, -q - radius)
            const endR = Math.min(radius, -q + radius)

            for (let r = startR; r <= endR; r++) {
                const hex = Hex(center.cubeToCartesian({
                    q: q + center.q,
                    r: r + center.r,
                    s: -q - r + center.s
                }))
                onCreate(hex, grid)
                grid.push(hex)
            }
        }

        return grid
    }
}

export function rectangleFactory({ Grid, Hex, _toNumberDirection, _signedModulo }) {
    /**
     * @method Grid#rectangle
     *
     * @description
     * Creates a grid in the shape of a [rectangle](https://en.wikipedia.org/wiki/Rectangle).
     *
     * @todo Validate the direction param
     *
     * @see {@link http://www.redblobgames.com/grids/hexagons/implementation.html#map-shapes|redblobgames.com}
     *
     * @param {Object} options                      An options object.
     * @param {number} options.width                The width (in hexes).
     * @param {number} options.height               The height (in hexes).
     * @param {Hex} [options.start=Hex(0,0,0)]      The start hex.
     * @param {(0|1|2|3|4|5)} [options.direction=0] The direction (from the start hex) in which to create the shape. Each direction corresponds to a different arrangement of hexes.
     *                                              Use **direction 4** to have x along the horizontal axis and y along the vertical axis.
     * @param {Function} [options.onCreate=noop]    Callback that's called for each created hex, passing the created hex.
     *
     * @returns {Hex[]}                             Array of hexes in a rectangular arrangement.
     */
    return function rectangle({
        width,
        height,
        start,
        direction = Hex().isPointy() ? 0 : 1,
        onCreate = () => { }
    }) {
        start = Hex(start)

        if (isString(direction)) {
            direction = _toNumberDirection(direction, start.orientation)
        }

        if (direction < 0 || direction > 5) {
            direction = _signedModulo(direction, 6)
        }

        const DIRECTIONS = [
            ['q', 'r', 's'],
            ['r', 'q', 's'],
            ['r', 's', 'q'],
            ['s', 'r', 'q'],
            ['s', 'q', 'r'],
            ['q', 's', 'r']
        ]
        const [firstCoordinate, secondCoordinate, thirdCoordinate] = DIRECTIONS[direction]
        const [firstStop, secondStop] = start.isPointy() ? [width, height] : [height, width]
        const grid = new Grid()

        for (let second = 0; second < secondStop; second++) {
            const secondOffset = _offsetFromZero(start.offset, second)

            for (let first = -secondOffset; first < firstStop - secondOffset; first++) {
                const hex = Hex(start.cubeToCartesian({
                    [firstCoordinate]: first + start[firstCoordinate],
                    [secondCoordinate]: second + start[secondCoordinate],
                    [thirdCoordinate]: -first - second + start[thirdCoordinate]
                }))
                onCreate(hex, grid)
                grid.push(hex)
            }
        }

        return grid
    }
}
