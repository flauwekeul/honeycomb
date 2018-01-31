import { ORIENTATIONS, EPSILON } from './constants'
import { offsetFromZero } from '../utils'

export function setFactory({ Hex }) {
    /**
     * @method Hex#set
     *
     * @description
     * Accepts the same arguments as the {@link Hex} factory and merges them into itself.
     *
     * @returns {this}  Itself.
     */
    return function set(...args) {
        return Object.assign(this, Hex(...args))
    }
}

/**
 * @method Hex#coordinates
 * @returns {Object}    The hex's cartesian `x` and `y` coordinates.
 */
export function coordinates() {
    return { x: this.x, y: this.y }
}

/**
 * @method Hex#cube
 * @returns {Object}    The hex's cube `q`, `r` and `s` coordinates.
 */
export function cube() {
    return { q: this.q, r: this.r, s: this.s }
}

export function cubeToCartesian({ q, r }) {
    let x, y

    if (this.isPointy()) {
        x = q + offsetFromZero(this.offset, r)
        y = r
    } else {
        x = q
        y = r + offsetFromZero(this.offset, q)
    }

    return { x, y }
}

export function cartesianToCube({ x, y }) {
    let q, r

    if (this.isPointy()) {
        q = x - offsetFromZero(this.offset, y)
        r = y
    } else {
        q = x
        r = y - offsetFromZero(this.offset, x)
    }

    return { q, r, s: -q - r }
}
/**
 * @method Hex#isPointy
 * @returns {boolean}   Whether hexes have a pointy ⬢ orientation.
 */
export function isPointy() {
    return this.orientation.toUpperCase() === ORIENTATIONS.POINTY
}

/**
 * @method Hex#isFlat
 * @returns {boolean}   Whether hexes have a flat ⬣ orientation.
 */
export function isFlat() {
    return this.orientation.toUpperCase() === ORIENTATIONS.FLAT
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
        const { q, r, size } = this
        let x, y

        if (this.isPointy()) {
            x = size * Math.sqrt(3) * (q + r / 2)
            y = size * 3/2 * r
        } else {
            x = size * 3/2 * q
            y = size * Math.sqrt(3) * (r + q / 2)
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
            this.y + otherHex.y
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
            this.y - otherHex.y
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
    return this.x === otherHex.x && this.y === otherHex.y
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
        Math.abs(this.q - otherHex.q),
        Math.abs(this.r - otherHex.r),
        Math.abs(this.s - otherHex.s)
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
        let { q, r, s } = this
        let roundedQ = Math.round(q)
        let roundedR = Math.round(r)
        let roundedS = Math.round(s)
        const diffQ = Math.abs(q - roundedQ)
        const diffR = Math.abs(r - roundedR)
        const diffS = Math.abs(s - roundedS)

        if (diffQ > diffR && diffQ > diffS) {
            roundedQ = -roundedR - roundedS
        } else if (diffR > diffS) {
            roundedR = -roundedQ - roundedS
        } else {
            roundedS = -roundedQ - roundedR
        }

        // use call() to bind any custom properties to Hex(), which get merged into the resulting hex.
        return Hex.call(this, { q: roundedQ, r: roundedR, s: roundedS })
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
        const q = this.q * (1 - t) + otherHex.q * t
        const r = this.r * (1 - t) + otherHex.r * t
        // use call() to bind any custom properties to Hex(), which get merged into the resulting hex.
        return Hex.call(this, { q, r, s: -q - r })
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
    return `${this.x},${this.y}`
}
