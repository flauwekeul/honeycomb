import { defineHex, Grid, rectangle } from '../src'
import { render } from './render'

class CustomHex extends defineHex({ dimensions: 30, origin: 'topLeft' }) {
  custom = 'test'
}

const grid = new Grid(CustomHex, rectangle({ width: 10, height: 10 }))

for (const hex of grid) {
  render(hex)
}
