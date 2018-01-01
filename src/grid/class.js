/**
 * @private
 *
 * The only way to prevent setting invalid items in a grid (`grid[0] = 'not a hex'`) is by using proxies.
 * A proxy can have a `set` trap that can prevent the setting of invalid hexes.
 *
 * Some approaches include:
 * 1. Wrapping the grid instance returned from GridFactory in a proxy.
 * 2. Putting a proxy in the prototype chain of Grid (this "shields" the Array prototype methods).
 * 3. Using a proxy to forward certain calls to the Array prototype (and not extending Array at all).
 */

export default class Grid extends Array {
    static isValidHex(value) {
        return (value || {}).__isHoneycombHex === true
    }

    fill() {
        throw new TypeError('Grid.prototype.fill is not implemented')
    }

    includes(searchHex, fromIndex = 0) {
        if (!Grid.isValidHex(searchHex)) {
            return false
        }

        for (let i = fromIndex; i < this.length; i++) {
            if (this[i].equals(searchHex)) {
                return true
            }
        }

        return false
    }

    indexOf(searchHex, fromIndex = 0) {
        if (!Grid.isValidHex(searchHex)) {
            return -1
        }

        for (let i = fromIndex; i < this.length; i++) {
            if (this[i].equals(searchHex)) {
                return i
            }
        }

        return -1
    }

    // a grid has no duplicate hexes, so there's no reason to start searching from the end of the grid
    // except maybe for performance reasons, but Grid#indexOf seems fast enough
    lastIndexOf(searchHex, fromIndex) {
        return this.indexOf(searchHex, fromIndex)
    }

    push(...elements) {
        return super.push(...elements.filter(Grid.isValidHex))
    }

    splice(start, deleteCount, ...elements) {
        return super.splice(start, deleteCount, ...elements.filter(Grid.isValidHex))
    }

    unshift(...elements) {
        return super.unshift(...elements.filter(Grid.isValidHex))
    }
}
