import {
    ORIENTATIONS,
    EPSILON
} from './constants'

/**
 * @method Hex#coordinates
 * @returns {Object}    The hex's x, y and z coordinates.
 */
export function coordinates() {
    return {
        x: this.x,
        y: this.y,
        z: this.z
    }
}

/**
 * @method Hex#isPointy
 * @returns {boolean}   Whether hexes have a pointy ⬢ orientation.
 */
export function isPointy() {
    return this.orientation === ORIENTATIONS.POINTY
}

/**
 * @method Hex#isFlat
 * @returns {boolean}   Whether hexes have a flat ⬣ orientation.
 */
export function isFlat() {
    return this.orientation === ORIENTATIONS.FLAT
}

/**
 * @method Hex#oppositeCornerDistance
 * @returns {number}    The distance between opposite corners of a hex.
 */
export function oppositeCornerDistance() {
    return this.size * 2
}

/**
 * @method Hex#oppositeSideDistance
 * @returns {number}    The distance between opposite sides of a hex.
 */
export function oppositeSideDistance() {
    return Math.sqrt(3) / 2 * this.oppositeCornerDistance()
}

/**
 * @method Hex#width
 * @returns {number}    The (horizontal) width of any hex.
 */
export function width() {
    return this.isPointy() ?
        this.oppositeSideDistance() :
        this.oppositeCornerDistance()
}

/**
 * @method Hex#height
 * @returns {number}    The (vertical) height of any hex.
 */
export function height() {
    return this.isPointy() ?
        this.oppositeCornerDistance() :
        this.oppositeSideDistance()
}

export function cornersFactory({ Point }) {
    /**
     * @method Hex#corners
     * @returns {Point[]}   Array of corner points. Starting at the top right corner for pointy hexes and the right corner for flat hexes.
     */
    return function corners() {
        const width = this.width()
        const height = this.height()

        if (this.isPointy()) {
            return [
                Point(width, height * 0.25),
                Point(width, height * 0.75),
                Point(width * 0.5, height),
                Point(0, height * 0.75),
                Point(0, height * 0.25),
                Point(width * 0.5, 0)
            ]
        } else {
            return [
                Point(width, height * 0.5),
                Point(width * 0.75, height),
                Point(width * 0.25, height),
                Point(0, height * 0.5),
                Point(width * 0.25, 0),
                Point(width * 0.75, 0)
            ]
        }
    }
}

export function toPointFactory({ Point }) {
    /**
     * @method Hex#toPoint
     *
     * @description
     * Converts the current hex to its origin {@link Point|point} relative to the start hex.
     *
     * @returns {Point} The 2D point the hex corresponds to.
     */
    return function toPoint() {
        let x, y

        if (this.isPointy()) {
            x = this.size * Math.sqrt(3) * (this.x + this.y / 2)
            y = this.size * 3/2 * this.y
        } else {
            x = this.size * 3/2 * this.x
            y = this.size * Math.sqrt(3) * (this.y + this.x / 2)
        }

        // `x` and `y` are always the hex's center, so the origin needs to be subtracted
        return Point(x - this.origin.x, y - this.origin.y)
    }
}

export function addFactory({ Hex }) {
    /**
     * @method Hex#add
     * @param {Hex} otherHex    The hex that will be added to the current.
     *
     * @todo Accept any number of hexes to add.
     *
     * @returns {Hex}           The sum of the current hexes coordinates and the passed hexes coordinates.
     */
    return function add(otherHex) {
        // use call() to bind any custom properties to Hex(), which get merged into the resulting hex.
        return Hex.call(
            this,
            this.x + otherHex.x,
            this.y + otherHex.y,
            this.z + otherHex.z
        )
    }
}

export function subtractFactory({ Hex }) {
    /**
     * @method Hex#subtract
     * @param {Hex} otherHex    The hex that will be subtracted from the current.
     *
     * @todo Accept any number of hexes to subtract.
     *
     * @returns {Hex}           The difference between the current hexes coordinates and the passed hexes coordinates.
     */
    return function subtract(otherHex) {
        // use call() to bind any custom properties to Hex(), which get merged into the resulting hex.
        return Hex.call(
            this,
            this.x - otherHex.x,
            this.y - otherHex.y,
            this.z - otherHex.z
        )
    }
}

/**
 * @method Hex#equals
 * @param {Hex} otherHex    The hex of which the coordinates will be compared against the current hex.
 *
 * @returns {boolean}       Whether the coordinates of the current and the passed hex are equal.
 */
export function equals(otherHex) {
    return this.x === otherHex.x && this.y === otherHex.y && this.z === otherHex.z
}

/**
 * @method Hex#distance
 *
 * @see {@link http://www.redblobgames.com/grids/hexagons/#distances|redblobgames.com}
 *
 * @param   {Hex} otherHex  The end hex.
 *
 * @returns {number}        The amount of hexes between the current and the given hex.
 *
 * @example
 * import { Grid } from 'Honeycomb'
 * const Hex = Grid().Hex
 *
 * Hex(0, 0, 0).distance(Hex(1, 0, -1))    // 1
 * Hex(-3, -3, 6).distance(Hex(-1, 4, -3)) // 9
 */
export function distance(otherHex) {
    return Math.max(
        Math.abs(this.x - otherHex.x),
        Math.abs(this.y - otherHex.y),
        Math.abs(this.z - otherHex.z)
    )
}

export function roundFactory({ Hex }) {
    /**
     * @method Hex#round
     *
     * @description
     * Rounds the current floating point hex coordinates to their nearest integer hex coordinates.
     *
     * @see {@link http://www.redblobgames.com/grids/hexagons/#rounding|redblobgames.com}
     *
     * @returns {Hex}   A new hex with rounded coordinates.
     */
    return function round() {
        let roundedX = Math.round(this.x)
        let roundedY = Math.round(this.y)
        let roundedZ = Math.round(this.z)
        const diffX = Math.abs(this.x - roundedX)
        const diffY = Math.abs(this.y - roundedY)
        const diffZ = Math.abs(this.z - roundedZ)

        if (diffX > diffY && diffX > diffZ) {
            roundedX = Hex.thirdCoordinate(roundedY, roundedZ)
        } else if (diffY > diffZ) {
            roundedY = Hex.thirdCoordinate(roundedX, roundedZ)
        } else {
            roundedZ = Hex.thirdCoordinate(roundedX, roundedY)
        }

        // use call() to bind any custom properties to Hex(), which get merged into the resulting hex.
        return Hex.call(this, roundedX, roundedY, roundedZ)
    }
}

export function lerpFactory({ Hex }) {
    /**
     * @method Hex#lerp
     *
     * @description
     * Returns an interpolation between the current hex and the passed hex for a `t` between 0 and 1.
     * More info on [wikipedia](https://en.wikipedia.org/wiki/Linear_interpolation).
     *
     * @param   {Hex} otherHex  The other hex.
     * @param   {number} t      A "parameter" between 0 and 1.
     *
     * @returns {Hex}           A new hex (with possibly fractional coordinates).
     */
    return function lerp(otherHex, t) {
        // use call() to bind any custom properties to Hex(), which get merged into the resulting hex.
        return Hex.call(
            this,
            this.x * (1 - t) + otherHex.x * t,
            this.y * (1 - t) + otherHex.y * t,
            this.z * (1 - t) + otherHex.z * t
        )
    }
}

/**
 * @method Hex#nudge
 *
 * @description
 * Returns a new hex with a tiny offset from the current hex. Useful for interpolating in a consistent direction.
 *
 * @see {@link http://www.redblobgames.com/grids/hexagons/#line-drawing|redblobgames.com}
 *
 * @returns {Hex}   A new hex with a minute offset.
 */
export function nudge() {
    return this.add(EPSILON)
}

/**
 * @method Hex#toString
 *
 * @returns {string}    String containing the coordinates of the hex.
 */
export function toString() {
    return `{ x: ${this.x}, y: ${this.y}, z: ${this.z} }`
}
