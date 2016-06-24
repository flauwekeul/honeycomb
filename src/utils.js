export const is = {
    number(value) {
        return !isNaN(parseFloat(value)) && isFinite(value)
    },

    object(value) {
        return value !== null && typeof value === 'object'
    },

    array(value) {
        return Array.isArray(value)
    }
}

export function unsignNegativeZero(value) {
    return is.number(value) ? (value || 0) : value
}

export function stringToDOMNodes(string) {
    const div = document.createElement('div')
    div.innerHTML = string.trim()
    return div.childNodes
}
