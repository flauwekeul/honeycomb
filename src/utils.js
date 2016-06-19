export function noNegativeZero(value) {
    return isNumber(value) ? (value || 0) : value
}

export function isNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value)
}

export function isObject(value) {
    return value !== null && typeof value === 'object'
}
