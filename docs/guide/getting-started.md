# Getting started

## Installation

NPM:

```bash
npm i honeycomb-grid@alpha
```

Yarn:

```bash
yarn add honeycomb-grid@alpha
```

Or download the distribution from [unpkg.com](https://unpkg.com/honeycomb-grid@alpha).

## Basic example

Create a rectangular grid of 10 by 10 hexes and log each hex:

```typescript
import { createHexPrototype, Grid, rectangle } from 'honeycomb-grid'

// 1. Create a hex prototype.
//    All hexes will have this object as their prototype:
const hexPrototype = createHexPrototype({ dimensions: 30 })

// 2. Create a grid by passing the prototype and a "traverser" for a
//    rectangular-shaped grid:
const grid = new Grid(hexPrototype, rectangle({ width: 10, height: 10 }))

// 3. Iterate over the grid to log each hex:
grid.forEach(console.log)
```
