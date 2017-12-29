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
     * grid.pointToHex(Point(120, 300))     // { x: -1, y: 4, z: -3 }
     * // also accepts a point-like:
     * grid.pointToHex({ x: 120, y: 300 })  // { x: -1, y: 4, z: -3 }
     * grid.pointToHex([ 120, 300 ])        // { x: -1, y: 4, z: -3 }
     */
    return function pointToHex(point) {
        const hex = Hex()
        const size = hex.size
        let x, y

        // guarantee point is an actual Point instance
        point = Point(point)

        if (hex.isPointy()) {
            x = (point.x * Math.sqrt(3)/3 - point.y / 3) / size
            y = point.y * 2/3 / size
        } else {
            x = point.x * 2/3 / size
            y = (-point.x / 3 + Math.sqrt(3)/3 * point.y) / size
        }

        return Hex(x, y).round()
    }
}

/**
 * @method Grid#hexToPoint
 *
 * @description
 * Translates a hex to a point.
 *
 * @see {@link http://www.redblobgames.com/grids/hexagons/#hex-to-pixel|redblobgames.com}
 *
 * @borrows Hex#toPoint as Grid#hexToPoint
 *
 * @param {Hex} hex The hex to translate from.
 *
 * @returns {Point} The point to translate to.
 *
 * @example
 * import { Grid } from 'Honeycomb'
 *
 * const grid = Grid({ size: 50 })
 * const hex = grid.Hex(-1, 4, -3)
 * grid.hexToPoint(hex) // { x: 86.60254037844386, y: 300 }
 *
 * // a different origin...
 * const grid = Grid({ size: 50, origin: [50, 50] })
 * const hex = grid.Hex(-1, 4, -3)
 * // ...corresponds to a different point:
 * grid.hexToPoint(hex) // { x: 36.60254037844386, y: 250 }
 */
export function hexToPoint(hex) {
    return hex.toPoint()
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
            hex.width() * 3/4
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
            hex.height() * 3/4 :
            hex.height()
    }
}

export function parallelogramFactory({ Hex }) {
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
        onCreate = () => {}
    }) {
        start = Hex(start)
        // TODO: validate direction
        const DIRECTIONS = {
            1: ['x', 'y'],
            3: ['y', 'z'],
            5: ['z', 'x']
        }
        const [ firstCoordinate, secondCoordinate ] = DIRECTIONS[direction]
        const hexes = []

        for (let first = 0; first < width; first++) {
            for (let second = 0; second < height; second++) {
                // add the hex manually (instead of using Hex#add) for better performance
                const hex = Hex({
                    [firstCoordinate]: first + start.x,
                    [secondCoordinate]: second + start.y
                })
                onCreate(hex)
                hexes.push(hex)
            }
        }

        return new this.constructor(...hexes)
    }
}

export function triangleFactory({ Hex }) {
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
        onCreate = () => {}
    }) {
        start = Hex(start)
        // TODO: validate direction
        const DIRECTIONS = {
            1: {
                yStart: () => 0,
                yEnd: x => size - x
            },
            5: {
                yStart: x => size - x,
                yEnd: () => size + 1
            }
        }
        const { yStart, yEnd } = DIRECTIONS[direction]
        const hexes = []

        for (let x = 0; x < size; x++) {
            for (let y = yStart(x); y < yEnd(x); y++) {
                // add the hex manually (instead of using Hex#add) for better performance
                const hex = Hex(x + start.x, y + start.y)
                onCreate(hex)
                hexes.push(hex)
            }
        }

        return new this.constructor(...hexes)
    }
}

export function hexagonFactory({ Hex }) {
    /**
     * @method Grid#hexagon
     *
     * @description
     * Creates a grid in the shape of a [hexagon](https://en.wikipedia.org/wiki/Hexagon).
     *
     * @see {@link http://www.redblobgames.com/grids/hexagons/implementation.html#map-shapes|redblobgames.com}
     *
     * @param {Object} options                      An options object.
     * @param {number} options.radius               The radius (in hexes).
     * @param {Hex} [options.center=Hex(0,0,0)]     The center hex.
     * @param {Function} [options.onCreate=noop]    Callback that's called for each created hex, passing the created hex.
     *
     * @returns {Hex[]}                             Array of hexes in a hexagon arrangement (very meta 😎).
     */
    return function hexagon({
        radius,
        center,
        onCreate = () => {}
    }) {
        // radius includes the center hex
        radius -= 1
        center = Hex(center)

        const hexes = []

        for (let x = -radius; x <= radius; x++) {
            const startY = Math.max(-radius, -x - radius)
            const endY = Math.min(radius, -x + radius)

            for (let y = startY; y <= endY; y++) {
                // add the hex manually (instead of using Hex#add) for better performance
                const hex = Hex(x + center.x, y + center.y)
                onCreate(hex)
                hexes.push(hex)
            }
        }

        return new this.constructor(...hexes)
    }
}

export function rectangleFactory({ Hex }) {
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
     * @param {Function} [options.onCreate=noop]    Callback that's called for each created hex, passing the created hex.
     *
     * @returns {Hex[]}                             Array of hexes in a rectangular arrangement.
     */
    return function rectangle({
        width,
        height,
        start,
        direction = 0,
        onCreate = () => {}
    }) {
        start = Hex(start)

        const DIRECTIONS = {
            0: ['x', 'y'],
            1: ['y', 'x'],
            2: ['y', 'z'],
            3: ['z', 'y'],
            4: ['z', 'x'],
            5: ['x', 'z']
        }
        const [ firstCoordinate, secondCoordinate ] = DIRECTIONS[direction]
        const firstStop = start.isPointy() ? width : height
        const secondStop = start.isPointy() ? height : width
        const hexes = []

        for (let second = 0; second < secondStop; second++) {
            const secondOffset = Math.floor(second / 2)

            for (let first = -secondOffset; first < firstStop - secondOffset; first++) {
                // add the hex manually (instead of using Hex#add) for better performance
                const hex = Hex({
                    [firstCoordinate]: first + start.x,
                    [secondCoordinate]: second + start.y
                })
                onCreate(hex)
                hexes.push(hex)
            }
        }

        return new this.constructor(...hexes)
    }
}
