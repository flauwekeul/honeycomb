import { createHexPrototype, rectangle } from '../dist'

interface CustomHex {
  custom: string
}

const hexPrototype = createHexPrototype<CustomHex>({ size: 20, custom: 'custom' })
// const grid = new Grid(hexPrototype)
const grid = rectangle(hexPrototype, { width: 1000, height: 1000 })

console.time()
;[...grid]
console.timeEnd()
