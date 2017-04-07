import Point from '../point'
import isDom from 'is-dom'
import { stringToDOMNodes } from '../utils'

import DOMFactory from './dom'

/**
 * @namespace
 */
const Views = {
    DOM: DOMFactory({ Point, isDom, stringToDOMNodes })
}

export default Views
