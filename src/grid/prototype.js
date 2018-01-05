export function get(targetHex) {
    return this.find(hex => hex.equals(targetHex))
}

/**
 * @method Hex#hexesBetween
 *
 * @see {@link http://www.redblobgames.com/grids/hexagons/#line-drawing|redblobgames.com}
 *
 * @param {Hex} otherHex    The other hex.
 *
 * @returns {Hex[]}         Array of hexes from the current hex and up to the passed `otherHex`.
 */
export function hexesBetween(firstHex, lastHex) {
    const _distance = firstHex.distance(lastHex)
    const step = 1.0 / Math.max(_distance, 1)
    let hexes = []

    for (let i = 0; i <= _distance; i++) {
        const hex = firstHex.nudge().lerp(lastHex.nudge(), step * i).round()
        hexes.push(this.get(hex))
    }

    return hexes
}
