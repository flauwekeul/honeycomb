# Getting started

## Installation

NPM:

```bash
npm i honeycomb-grid
```

Yarn:

```bash
yarn add honeycomb-grid
```

Or download the distribution from [jsdelivr](https://cdn.jsdelivr.net/npm/honeycomb-grid) or [unpkg.com](https://unpkg.com/honeycomb-grid).

## Basic example

Create a rectangular grid of 10 by 10 hexes and log each hex:

```javascript
import { defineHex, Grid, rectangle } from 'honeycomb-grid'

// 1. Create a hex class:
const Tile = defineHex({ dimensions: 30 })

// 2. Create a grid by passing the class and a "traverser" for a rectangular-shaped grid:
const grid = new Grid(Tile, rectangle({ width: 10, height: 10 }))

// 3. Iterate over the grid to log each hex:
grid.forEach(console.log)
```
