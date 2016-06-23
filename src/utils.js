export function isNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value)
}

export function isObject(value) {
    return value !== null && typeof value === 'object'
}

export function isArray(value) {
    return Array.isArray(value)
}

export function unsignNegativeZero(value) {
    return isNumber(value) ? (value || 0) : value
}

export function stringToDOMNodes(string) {
    const div = document.createElement('div')
    div.innerHTML = string.trim()
    return div.childNodes
}
