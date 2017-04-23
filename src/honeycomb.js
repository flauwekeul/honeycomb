import isDom from 'is-dom'
import { stringToDOMNodes } from './utils'

import { ORIENTATIONS } from './hex/constants'
import GridFactory from './grid'
import HexFactory from './hex'
import Point from './point'
import ViewFactory from './view'
import DOMTemplateFactory from './dom-template'

const Grid = GridFactory({ HexFactory })
const View = ViewFactory({ Point, isDom })
const DOMTemplate = DOMTemplateFactory({ stringToDOMNodes })

export {
    ORIENTATIONS as HEX_ORIENTATIONS,
    Grid,
    Point,
    View,
    DOMTemplate
}
