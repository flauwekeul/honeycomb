import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Honeycomb',
  description: `A hexagon grid library made in TypeScript.`,
  lastUpdated: true,

  themeConfig: {
    socialLinks: [{ icon: 'github', link: 'https://github.com/flauwekeul/honeycomb' }],
    nav: [
      { text: 'Guide', link: '/guide/getting-started', activeMatch: '/guide/' },
      { text: 'API', link: '/api/index', activeMatch: '/api/' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          collapsible: true,
          items: [{ text: 'Getting started', link: '/guide/getting-started' }],
        },
        {
          text: 'Hexes',
          collapsible: true,
          items: [
            { text: 'Defining hexes', link: '/guide/defining-hexes' },
            { text: 'Coordinate system', link: '/guide/coordinate-system' },
          ],
        },
        {
          text: 'Grid',
          collapsible: true,
          items: [
            { text: 'Creating', link: '/guide/creating-grids' },
            { text: 'Iterating', link: '/guide/iterating-grids' },
            { text: 'Traversing', link: '/guide/traversing' },
            { text: 'Other methods', link: '/guide/other-grid-methods' },
          ],
        },
        {
          text: 'Directions',
          collapsible: true,
          items: [{ text: 'Compass', link: '/guide/compass-directions' }],
        },
        {
          text: 'Recipes',
          collapsible: true,
          items: [
            { text: 'Rendering', link: '/guide/rendering' },
            { text: 'Point → hex', link: '/guide/point-to-hex' },
            { text: 'Hex → point', link: '/guide/hex-to-point' },
            { text: '(De)serializing', link: '/guide/serializing' },
            { text: 'Custom traverser', link: '/guide/custom-traverser' },
          ],
        },
      ],
      '/api/': [
        {
          items: [{ text: 'Table of contents', link: '/api/#table-of-contents' }],
        },
        {
          text: 'Hex',
          collapsible: true,
          items: [
            { text: 'Hex interface', link: '/api/interfaces/Hex' },
            { text: 'createHexPrototype', link: '/api/#createHexPrototype' },
          ],
        },
        {
          text: 'Coordinates',
          collapsible: true,
          items: [
            { text: 'Axial', link: '/api/interfaces/AxialCoordinates' },
            { text: 'Cube', link: '/api/interfaces/CubeCoordinates' },
            { text: 'Offset', link: '/api/interfaces/OffsetCoordinates' },
            { text: 'Tuple', link: '/api/#TupleCoordinates' },
            { text: 'HexCoordinates', link: '/api/#HexCoordinates' },
          ],
        },
        {
          text: 'Grid',
          collapsible: true,
          items: [{ text: 'Grid class', link: '/api/classes/Grid' }],
        },
        {
          text: 'Traversers',
          collapsible: true,
          items: [
            { text: 'concat', link: '/api/#concat' },
            { text: 'fromCoordinates', link: '/api/#fromCoordinates' },
            { text: 'line', link: '/api/#line' },
            { text: 'move', link: '/api/#move' },
            { text: 'rectangle', link: '/api/#rectangle' },
            { text: 'repeat', link: '/api/#repeat' },
            { text: 'repeatWith', link: '/api/#repeatWith' },
            { text: 'ring', link: '/api/#ring' },
            { text: 'spiral', link: '/api/#spiral' },
          ],
        },
      ],
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2016-present Abbe Keultjes',
    },
  },
})
