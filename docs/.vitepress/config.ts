import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Honeycomb',
  description: `A hexagon grid library made in TypeScript.`,
  lastUpdated: true,

  themeConfig: {
    socialLinks: [{ icon: 'github', link: 'https://github.com/flauwekeul/honeycomb' }],
    nav: [{ text: 'Guide', link: '/guide/getting-started', activeMatch: '/guide/' }],
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
            { text: 'Pixel → hex', link: '/guide/pixel-to-hex' },
            { text: 'Hex → pixel', link: '/guide/hex-to-pixel' },
            { text: '(De)serializing', link: '/guide/serializing' },
            { text: 'Custom traverser', link: '/guide/custom-traverser' },
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
