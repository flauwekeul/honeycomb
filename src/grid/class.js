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
        return !!(this.indexOf(searchHex, fromIndex) + 1)
    }

    indexOf(searchHex, fromIndex = 0) {
        const { length } = this
        let i = Number(fromIndex)

        i = Math.max(i >= 0 ? i : length + i, 0)

        for (i; i < length; i++) {
            if (this[i].equals(searchHex)) {
                return i
            }
        }

        return -1
    }

    // a grid has no duplicate hexes, so there's no reason to start searching from the end of the grid
    // except maybe for performance reasons, but Grid#indexOf seems fast enough
    lastIndexOf(searchHex, fromIndex = this.length - 1) {
        const { length } = this
        let i = Number(fromIndex)

        i = i >= 0 ? Math.min(i, length - 1) : length + i

        for (i; i >= 0; i--) {
            if (this[i].equals(searchHex)) {
                return i
            }
        }

        return -1
    }

    push(...hexes) {
        return super.push(...hexes.filter(Grid.isValidHex))
    }

    splice(start, deleteCount, ...hexes) {
        // when deleteCount is undefined/null, it's casted to 0, deleting 0 hexes
        // this is not according to spec: it should delete all hexes (starting from `start`)
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
        if (deleteCount == null) {
            return super.splice(start)
        }

        return super.splice(start, deleteCount, ...hexes.filter(Grid.isValidHex))
    }

    unshift(...hexes) {
        return super.unshift(...hexes.filter(Grid.isValidHex))
    }
}
