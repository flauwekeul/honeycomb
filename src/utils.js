export const is = {
    string(value) {
        return typeof value === 'string'
    },

    number(value) {
        return !isNaN(parseFloat(value)) && isFinite(value)
    },

    object(value) {
        return value !== null && typeof value === 'object'
    },

    objectLiteral(value) {
        return Object.prototype.toString.call(value) === '[object Object]'
    },

    function(value) {
        return typeof value === 'function'
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
    return div
}
