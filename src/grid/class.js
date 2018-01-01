export default class Grid extends Array {
    static isValidHex(value) {
        return (value || {}).__isHoneycombHex === true
    }
}
