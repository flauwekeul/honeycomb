# ⬡ Honeycomb [![NPM version](https://img.shields.io/npm/v/honeycomb-grid.svg)](https://www.npmjs.com/package/honeycomb-grid) [![Minified size](https://img.shields.io/bundlephobia/min/honeycomb-grid.svg)](https://www.npmjs.com/package/honeycomb-grid) [![Gitter](https://img.shields.io/gitter/room/flauwekeul/honeycomb.svg)](https://gitter.im/honeycomb-grid)

A hexagon grid library made in ~~JavaScript~~[TypeScript](https://www.typescriptlang.org/), heavily inspired by [Red Blob Games'](http://www.redblobgames.com/grids/hexagons/) blog posts and code samples.

Honeycomb works in modern browsers and Node (>=18). It's recommended to use Honeycomb with TypeScript, but not required.

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/I2I24E3QI)

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

## Documentation

Documentation is available at [abbekeultjes.nl/honeycomb](https://abbekeultjes.nl/honeycomb). API docs can be found at [abbekeultjes.nl/honeycomb/api/](https://abbekeultjes.nl/honeycomb/api/).

## Backlog

These are ideas that may require further investigation 🕵️. Don't hesitate to [open an issue](https://github.com/flauwekeul/honeycomb/issues) or [start a discussion](https://github.com/flauwekeul/honeycomb/discussions).

- [ ] Playground:
  - [x] Use [Pinia](https://pinia.vuejs.org/) instead of prop drilling
  - [ ] Add visual aids: highlight active tiles, toggle origins, more?
  - [x] Support traversing (`grid.traverse(…)`)
  - [x] Support multiple traverser options (e.g. `RingOptions` and `RingFromRadiusOptions`)
  - [x] Support list of traversers
  - [x] Don't make all traverser options required. E.g. `start` should be optional and is ignored when it's not the first traverser.
  - [x] Support the 2nd argument of `grid.traverse()` (`{ bail: boolean }`)
  - [x] Add help buttons that link to the docs
  - [ ] Implement playground (with limited controls) in guide
  - [x] Add "hex picker" to select hexes in the grid
  - [ ] Add a way to import/export code
  - [x] Make the grid draggable
  - [x] Support multiple traversers in Grid tab
  - [x] Show "infinite" background grid
  - [x] Persist state (in localStorage)
  - [ ] Integrate code editor ([Sandpack](https://sandpack.codesandbox.io/))?
  - [ ] Add examples (A* path finding, Perlin noise (?) for map generation, "chunking")
- [ ] Release both stable and next version of docs
- [ ] Write migration guide from v4 to v5
- [ ] Investigate API without classes
- [ ] Add https://lea.verou.me/2023/04/private-fields-considered-harmful/ to docs?
- [ ] Add `"type": "module"` to package.json?
- [ ] Implement https://stackoverflow.com/a/3234074/660260?
- [ ] Directions should also be given in degrees (in steps of 30°)?
- [ ] Add functionality related to [edges](https://github.com/flauwekeul/honeycomb/issues/58#issuecomment-642099947) and/or corners. Use https://www.redblobgames.com/grids/parts/#hexagons.
- [x] Add path finding (e.g. A*) functionality. Currently available as an example, see `/examples/a-star-path-finding/`.
- [ ] Clarify the "Line of sight" example (and rename to "Field of view"). Maybe add animations and some enemies as well?
- [ ] Add examples for (procedural) map generation (from a seed).
