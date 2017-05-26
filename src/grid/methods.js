export function pointToHexFactory({ Point, Hex }) {
    /**
     * @method Grid#pointToHex
     *
     * @description
     * Converts the passed 2-dimensional {@link Point|point} to a hex.
     *
     * @see {@link http://www.redblobgames.com/grids/hexagons/#pixel-to-hex|redblobgames.com}
     *
     * @param   {Point} point   The point to convert from. Does not have to be created by {@link Point}.
     *
     * @returns {Hex}           The hex (with rounded coordinates) the passed 2D point corresponds to.
     *
     * @example
     * import { Grid, Point } from 'Honeycomb'
     *
     * const grid = Grid({ size: 50 })
     * grid.pointToHex({ x: 120, y: 300 })  // { x: -1, y: 4, z: -3 }
     * grid.pointToHex([ 120, 300 ])        // { x: -1, y: 4, z: -3 }
     * grid.pointToHex(Point(120, 300))     // { x: -1, y: 4, z: -3 }
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

        return Hex.round(Hex(x, y))
    }
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
 *
 * @example
 * import { Grid } from 'Honeycomb'
 *
 * const grid = Grid({ size: 50 })
 * const hex = grid.Hex(-1, 4, -3)
 * grid.hexToPoint(hex) // { x: 86.60254037844386, y: 300 }
 */
export function hexToPoint(hex) {
    return hex.toPoint()
}

export function colSizeFactory({ Hex }) {
    /**
     * @method Grid#colSize
     *
     * @see {@link http://www.redblobgames.com/grids/hexagons/#basics|redblobgames.com}
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
     * @see {@link http://www.redblobgames.com/grids/hexagons/#basics|redblobgames.com}
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

export function parallelogramFactory({ Hex, isObject }) {
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
     * @param   {(number|Object)} widthOrOptions    The width (in hexes) or an options object.
     * @param   {number} [height]                   The height (in hexes).
     * @param   {Hex} [start=Hex()]                 The origin hex.
     * @param   {(1|3|5)} [direction=1]             The direction (from the start hex) in which to create the shape. Each direction corresponds to a different arrangement of hexes.
     *
     * @returns {Hex[]}                             Array of hexes in a parallelogram arrangement.
     */
    return function parallelogram(
        widthOrOptions,
        height,
        start = Hex(),
        direction = 1
    ) {
        // TODO: validate direction
        const DIRECTIONS = {
            1: ['x', 'y'],
            3: ['y', 'z'],
            5: ['z', 'x']
        }

        if (isObject(widthOrOptions)) {
            const { width, height, start = Hex(), direction = 1 } = widthOrOptions
            return parallelogram(width, height, start, direction)
        }

        let width = widthOrOptions
        const [ firstCoordinate, secondCoordinate ] = DIRECTIONS[direction]
        const hexes = []

        for (let first = 0; first < width; first++) {
            for (let second = 0; second < height; second++) {
                hexes.push(
                    Hex.add(
                        Hex({ [firstCoordinate]: first, [secondCoordinate]: second }),
                        Hex(start)
                    )
                )
            }
        }

        return hexes
    }
}

export function triangleFactory({ Hex, isObject }) {
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
     * @param   {(number|Object)} sideOrOptions The side length (in hexes) or an options object.
     * @param   {Hex} [start=Hex()]             The origin hex.
     * @param   {(1|5)} [direction=1]           The direction in which to create the shape. Each direction corresponds to a different arrangement of hexes. In this case a triangle pointing up (`direction: 1`) or down (`direction: 5`) (with pointy hexes) or right (`direction: 1`) or left (`direction: 5`) (with flat hexes).
     *
     * @returns {Hex[]}                         Array of hexes in a triangular arrangement.
     */
    return function triangle(
        sideOrOptions,
        start = Hex(),
        direction = 1
    ) {
        // TODO: validate direction
        const DIRECTIONS = {
            1: {
                yStart: () => 0,
                yEnd: x => side - x
            },
            5: {
                yStart: x => side - x,
                yEnd: () => side + 1
            }
        }

        if (isObject(sideOrOptions)) {
            const { side, start = Hex(), direction = 1 } = sideOrOptions
            return triangle(side, start, direction)
        }

        let side = sideOrOptions
        const { yStart, yEnd } = DIRECTIONS[direction]
        const hexes = []

        for (let x = 0; x < side; x++) {
            for (let y = yStart(x); y < yEnd(x); y++) {
                hexes.push(Hex.add(Hex(x, y), Hex(start)))
            }
        }

        return hexes
    }
}

export function hexagonFactory({ Hex, isObject }) {
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
     * @param   {(number|Object)} radiusOrOptions   The radius (in hexes) or an options object.
     * @param   {Hex} [center=Hex()]                The center hex.
     *
     * @returns {Hex[]}                             Array of hexes in a hexagon arrangement (very meta 😎).
     */
    return function hexagon(
        radiusOrOptions,
        center = Hex()
    ) {
        if (isObject(radiusOrOptions)) {
            const { radius, center = Hex() } = radiusOrOptions
            return hexagon(radius, center)
        }

        let radius = radiusOrOptions
        const hexes = []
        // radius includes the center hex
        radius -= 1

        for (let x = -radius; x <= radius; x++) {
            const startY = Math.max(-radius, -x - radius)
            const endY = Math.min(radius, -x + radius)

            for (let y = startY; y <= endY; y++) {
                hexes.push(Hex.add(Hex(x, y), Hex(center)))
            }
        }

        return hexes
    }
}

export function rectangleFactory({ Hex, isObject }) {
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
     * @param   {(number|Object)} widthOrOptions    The width (in hexes) or an options object.
     * @param   {number} [height]                   The height (in hexes).
     * @param   {Hex} [start=Hex()]                 The origin hex.
     * @param   {(0|1|2|3|4|5)} [direction=0]       The direction (from the start hex) in which to create the shape. Each direction corresponds to a different arrangement of hexes.
     *
     * @returns {Hex[]}                             Array of hexes in a rectengular arrangement.
     */
    return function rectangle(
        widthOrOptions,
        height,
        start = Hex(),
        direction = 0
    ) {
        const DIRECTIONS = {
            0: ['x', 'y'],
            1: ['y', 'x'],
            2: ['y', 'z'],
            3: ['z', 'y'],
            4: ['z', 'x'],
            5: ['x', 'z']
        }
        const hex = Hex()

        if (isObject(widthOrOptions)) {
            const { width, height, start = Hex(), direction = 0 } = widthOrOptions
            return rectangle(width, height, start, direction)
        }

        let width = widthOrOptions
        const [ firstCoordinate, secondCoordinate ] = DIRECTIONS[direction]
        const firstStop = hex.isPointy() ? width : height
        const secondStop = hex.isPointy() ? height : width
        const hexes = []

        for (let second = 0; second < secondStop; second++) {
            const secondOffset = Math.floor(second / 2)

            for (let first = -secondOffset; first < firstStop - secondOffset; first++) {
                hexes.push(
                    Hex.add(
                        Hex({ [firstCoordinate]: first, [secondCoordinate]: second }),
                        Hex(start)
                    )
                )
            }
        }

        return hexes
    }
}
