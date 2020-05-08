import { createHexTemplate, Grid } from '../dist/honeycomb'

const hexTemplate = createHexTemplate({ size: 20 })
const grid = new Grid(hexTemplate)
const rect = grid.rectangle({ width: 10, height: 10 })

const array = [...rect]
console.log(array)
