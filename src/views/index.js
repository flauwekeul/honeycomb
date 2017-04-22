import Point from '../point'
import isDom from 'is-dom'
import { stringToDOMNodes } from '../utils'

import DOMFactory from './dom'
import DOMElementFactory from './dom/element'
// import SVGFactory from './svg'

const DOMElement = DOMElementFactory({ stringToDOMNodes })

/**
 * @namespace
 */
const Views = {
    DOM: DOMFactory({ Point, isDom, Element: DOMElement }),
    // SVG: SVGFactory({ Point, isDom, stringToDOMNodes })
}

export default Views
