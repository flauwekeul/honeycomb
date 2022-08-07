import { defineHex, Grid, rectangle } from '../src'
import { render } from './render'

// interface CustomHex extends Hex {
//   custom: string
// }

// this creates this prototype chain:
// CustomHex -> class extends Hex -> Hex -> Object
// while creating a class that extends Hex has this:
// CustomHex -> Hex -> Object
class CustomHex extends defineHex({ dimensions: 30, origin: 'topLeft' }) {
  custom = 'test'
}
// class CustomHex extends Hex {
//   get dimensions(): Ellipse {
//     return createHexDimensions(30)
//   }
//   get origin(): Point {
//     return createHexOrigin('topLeft', this)
//   }

//   custom = 'test'
// }
const grid = new Grid(CustomHex, rectangle({ width: 10, height: 10 }))

let i = 0
for (const hex of grid) {
  render(hex, i++)
}
