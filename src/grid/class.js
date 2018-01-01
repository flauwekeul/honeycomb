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
}
