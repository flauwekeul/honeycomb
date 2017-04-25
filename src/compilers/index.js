import { stringToDOMNodes } from '../utils'

import DOMCompilerFactory from './dom'
import SVGCompilerFactory from './svg'

const DOMCompiler = DOMCompilerFactory({ stringToDOMNodes })
const SVGCompiler = SVGCompilerFactory({ document })

export { DOMCompiler, SVGCompiler }
