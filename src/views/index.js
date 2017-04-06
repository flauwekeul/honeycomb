import Point from '../point'
import isDom from 'is-dom'

import DOMFactory from './dom'

/**
 * @namespace
 */
const Views = {
    DOM: DOMFactory({ Point, isDom })
}

export default Views
