# Honeycomb [![NPM version](https://img.shields.io/npm/v/honeycomb-grid.svg)](https://www.npmjs.com/package/honeycomb-grid) [![Minified size](https://img.shields.io/bundlephobia/min/honeycomb-grid.svg)](https://www.npmjs.com/package/honeycomb-grid) [![Gitter](https://img.shields.io/gitter/room/flauwekeul/honeycomb.svg)](https://gitter.im/honeycomb-grid)

**⚠️ This is an experimental version and the API ~~is likely to~~ may change. I encourage anyone to try it out and open an [issues](https://github.com/flauwekeul/honeycomb/issues/new) if you have any suggestions or questions ⚠️**

A hexagon grid library made in ~~JavaScript~~[TypeScript](https://www.typescriptlang.org/), heavily inspired by [Red Blob Games'](http://www.redblobgames.com/grids/hexagons/) blog posts and code samples.

Honeycomb works in modern browsers and Node (>=16). It's recommended to use Honeycomb with TypeScript, but not required.

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/I2I24E3QI)

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

```javascript
import { createHexPrototype, Grid, rectangle } from 'honeycomb-grid'

// 1. Create a hex prototype. All hexes will have this object as their prototype:
const hexPrototype = createHexPrototype({ dimensions: 30 })

// 2. Create a grid by passing the prototype and a "traverser" for a rectangular-shaped grid:
const grid = new Grid(hexPrototype, rectangle({ width: 10, height: 10 }))

// 3. Iterate over the grid to log each hex:
grid.forEach(console.log)
```

## Documentation

Documentation is available at [abbekeultjes.nl/honeycomb](https://abbekeultjes.nl/honeycomb). API docs can be found at [abbekeultjes.nl/honeycomb/api/](https://abbekeultjes.nl/honeycomb/api/).

## Backlog

These are ideas that may require further investigation 🕵️. Don't hesitate to [open an issue](https://github.com/flauwekeul/honeycomb/issues) or [start a discussion](https://github.com/flauwekeul/honeycomb/discussions).

- [ ] Use [semantic-release](https://semantic-release.gitbook.io/semantic-release/)
- [ ] Directions should also be given in degrees (in steps of 30°)?
- [ ] Replace compass class with util functions:
  - [ ]  `vector()`: accepts start coordinates, a direction and length and returns coordinates (`length` can also be a function?)
  - [ ]  `turn()`: accepts start coordinates, a direction and an amount to turn (in degrees or "compass steps"?)
  - [ ]  functions to convert between degrees and compass directions
- [ ] Functions/methods should also accept strings for compass directions.
- [ ] Add functionality related to [edges](https://github.com/flauwekeul/honeycomb/issues/58#issuecomment-642099947) and/or corners. Use https://www.redblobgames.com/grids/parts/#hexagons.
- [ ] Add path finding (e.g. A*) functionality.
