import { createHexPrototype, Grid } from '../dist'

interface CustomHex {
  custom: string
}

const hexTemplate = createHexPrototype<CustomHex>({ size: 20, custom: 'custom' })
const grid = new Grid(hexTemplate)
const rect = grid.rectangle({ width: 10, height: 10 })

const array = [...rect]
console.log(array)
