export function pointToHexFactory({ Point, Hex }) {
    /**
     * @method Grid#pointToHex
     *
     * @description
     * Converts the passed 2-dimensional {@link Point|point} to a hex.
     *
     * @see {@link http://www.redblobgames.com/grids/hexagons/#pixel-to-hex|redblobgames.com}
     *
     * @param   {Point} point   The point to convert from.
     *
     * @returns {Hex}           The hex (with rounded coordinates) the passed 2D point corresponds to.
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

export function parallelogramFactory({ Hex, is }) {
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
     * @param   {(SE|SW|N)} [direction=SE]          The direction (from the start hex) in which to create the shape. Each direction corresponds to a different arrangement of hexes.
     *
     * @returns {Hex[]}                             Array of hexes in a parallelogram arrangement.
     */
    return function parallelogram(
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
            const { width, height, start = Hex(), direction = 'SE' } = widthOrOptions
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

export function triangleFactory({ Hex, is }) {
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
     * @param   {(down|up)} [direction=down]    The direction (from the start hex) in which to create the shape. Each direction corresponds to a different arrangement of hexes. In this case a triangle pointing up/down (with pointy hexes) or right/left (with flat hexes).
     *
     * @returns {Hex[]}                         Array of hexes in a triangular arrangement.
     */
    return function triangle(
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
            const { side, start = Hex(), direction = 'down' } = sideOrOptions
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

export function hexagonFactory({ Hex, is }) {
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
        if (is.objectLiteral(radiusOrOptions)) {
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

export function rectangleFactory({ Hex, is }) {
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
     * @param   {(E|NW|SW|SE|NE|W)} [direction=E/SE]
     * The direction (from the start hex) in which to create the shape. Each direction corresponds to a different arrangement of hexes. The default direction for pointy hexes is 'E' and 'SE' for flat hexes.
     *
     * @returns {Hex[]}                             Array of hexes in a rectengular arrangement.
     */
    return function rectangle(
        widthOrOptions,
        height,
        start = Hex(),
        // rotate 60° counterclockwise for flat hexes
        direction = Hex().isPointy() ? 'E' : 'SE'
    ) {
        const DIRECTIONS = {
            'E': ['x', 'y'],
            'NW': ['z', 'x'],
            'SW': ['y', 'z'],
            'SE': ['y', 'x'],
            'NE': ['x', 'z'],
            'W': ['z', 'y']
        }
        const hex = Hex()

        if (is.objectLiteral(widthOrOptions)) {
            const { width, height, start = Hex(), direction = hex.isPointy() ? 'E' : 'SE' } = widthOrOptions
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
