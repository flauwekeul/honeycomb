import Point from '../point'
import isDom from 'is-dom'
import { stringToDOMNodes } from '../utils'

import DOMFactory from './dom'
import SVGFactory from './svg'

/**
 * @namespace
 */
const Views = {
    DOM: DOMFactory({ Point, isDom, stringToDOMNodes }),
    SVG: SVGFactory({ Point, isDom, stringToDOMNodes })
}

export default Views
