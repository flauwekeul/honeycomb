import { isString } from 'axis.js'
import { offsetFromZero } from '../utils'

export function isValidHexFactory({ Grid }) {
    /**
     * @memberof Grid
     * @static
     * @method
     *
     * @param {*} value     Any value.
     * @returns {boolean}   Whether the passed value is a valid hex.
     */
    return function isValidHex(value) {
        return Grid.isValidHex(value)
    }
}

export function pointToHexFactory({ Point, Hex }) {
    /**
     * Converts the passed {@link point} to a hex.
     *
     * @memberof Grid
     * @static
     * @method
     * @see {@link https://www.redblobgames.com/grids/hexagons/#pixel-to-hex|redblobgames.com}
     *
     * @param {point} point The point to convert from.
     * @returns {hex}       A hex (with rounded coordinates) that contains the passed point.
     *
     * @example
     * const Hex = Honeycomb.extendHex({ size: 50 })
     * const Grid = Honeycomb.defineGrid(Hex)
     *
     * grid.pointToHex({ x: 120, y: 300 })  // { x: -1, y: 4 }
     * grid.pointToHex([ 120, 300 ])        // { x: -1, y: 4 }
     *
     * const Point = Honeycomb.Point
     * grid.pointToHex(Point(120, 300))     // { x: -1, y: 4 }
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

export function parallelogramFactory({ Grid, Hex }) {
    /**
     * Creates a grid in the shape of a [parallelogram](https://en.wikipedia.org/wiki/Parallelogram) ▱.
     *
     * @memberof Grid
     * @static
     * @method
     * @see {@link https://www.redblobgames.com/grids/hexagons/implementation.html#map-shapes|redblobgames.com}
     *
     * @todo Validate params
     * @todo Move duplicate code to util
     *
     * @param {Object} options                      An options object.
     * @param {number} options.width                The width (in hexes).
     * @param {number} options.height               The height (in hexes).
     * @param {Hex} [options.start=Hex(0)]          The start hex.
     * @param {(1|3|5)} [options.direction=1]       The direction (from the start hex) in which to create the shape.
     *                                              Each direction corresponds to a different arrangement of hexes.
     * @param {onCreate} [options.onCreate=no-op]   Callback that's called for each hex. Defaults to a {@link https://en.wikipedia.org/wiki/NOP|no-op}.
     *
     * @returns {grid}                              Grid of hexes in a parallelogram arrangement.
     */
    return function parallelogram({
        width,
        height,
        start,
        direction = 1,
        /**
         * Callback of a {@link Grid} shape method.
         * Gets called for each hex that's about to be added to the grid.
         *
         * @callback onCreate
         * @param {hex} hex     The freshly created hex, just before it's added to the grid.
         * @param {grid} grid   The grid (for as far as it's created).
         * @returns {void}      Nothing.
         */
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
     * Creates a grid in the shape of a [(equilateral) triangle](https://en.wikipedia.org/wiki/Equilateral_triangle) △.
     *
     * @memberof Grid
     * @static
     * @method
     * @see {@link https://www.redblobgames.com/grids/hexagons/implementation.html#map-shapes|redblobgames.com}
     *
     * @todo Validate params
     * @todo Move duplicate code to util
     *
     * @param {Object} options                      An options object.
     * @param {number} options.size                 The side length (in hexes).
     * @param {Hex} [options.start=Hex(0)]          The start hex. **Note**: it's not the first hex, but rather a hex relative to the triangle.
     * @param {(1|5)} [options.direction=1]         The direction in which to create the shape. Each direction corresponds to a different arrangement of hexes. In this case a triangle pointing up (`direction: 1`) or down (`direction: 5`) (with pointy hexes) or right (`direction: 1`) or left (`direction: 5`) (with flat hexes).
     *                                              Each direction corresponds to a different arrangement of hexes.
     * @param {onCreate} [options.onCreate=no-op]   Callback that's called for each hex. Defaults to a {@link https://en.wikipedia.org/wiki/NOP|no-op}.
     *
     * @returns {grid}                              Grid of hexes in a triangle arrangement.
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
     * Creates a grid in the shape of a [hexagon](https://en.wikipedia.org/wiki/Hexagon) ⬡.
     *
     * @memberof Grid
     * @static
     * @method
     * @see {@link https://www.redblobgames.com/grids/hexagons/implementation.html#map-shapes|redblobgames.com}
     *
     * @todo Validate params
     * @todo Move duplicate code to util
     *
     * @param {Object} options                      An options object.
     * @param {number} options.radius               The radius (in hexes) *excluding* the center hex.
     * @param {Hex} [options.center=Hex(0)]         The center hex.
     *                                              Each direction corresponds to a different arrangement of hexes.
     * @param {onCreate} [options.onCreate=no-op]   Callback that's called for each hex. Defaults to a {@link https://en.wikipedia.org/wiki/NOP|no-op}.
     *
     * @returns {grid}                              Grid of hexes in a hexagon arrangement.
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

export function rectangleFactory({ Grid, Hex, compassToNumberDirection, signedModulo }) {
    /**
     * Creates a grid in the shape of a [rectangle](https://en.wikipedia.org/wiki/Rectangle) ▭.
     *
     * @memberof Grid
     * @static
     * @method
     * @see {@link https://www.redblobgames.com/grids/hexagons/implementation.html#map-shapes|redblobgames.com}
     *
     * @todo Validate params
     * @todo Move duplicate code to util
     *
     * @param {Object} options                          An options object.
     * @param {number} options.width                    The width (in hexes).
     * @param {number} options.height                   The height (in hexes).
     * @param {Hex} [options.start=Hex(0)]              The start hex.
     * @param {(COMPASS_DIRECTION|number)} [options.direction=E|S]
     * The direction (from the start hex) in which to create the shape.
     * Defaults to `0` (`E`) for pointy hexes and `1` (`S`) for flat hexes.
     * Each direction corresponds to a different arrangement of hexes.
     * @param {onCreate} [options.onCreate=no-op]       Callback that's called for each hex. Defaults to a {@link https://en.wikipedia.org/wiki/NOP|no-op}.
     *
     * @returns {grid}                              Grid of hexes in a rectangular arrangement.
     */
    return function rectangle({
        width,
        height,
        start,
        direction = Hex().isPointy() ? 0 : 1, // E or S
        onCreate = () => { }
    }) {
        start = Hex(start)

        if (isString(direction)) {
            direction = compassToNumberDirection(direction, start.orientation)
        }

        if (direction < 0 || direction > 5) {
            direction = signedModulo(direction, 6)
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
            const secondOffset = offsetFromZero(start.offset, second)

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
