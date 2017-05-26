import { isNumber } from 'axis.js'

export function unsignNegativeZero(value) {
    return isNumber(value) ? (value || 0) : value
}
