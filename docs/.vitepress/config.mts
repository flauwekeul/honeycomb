import { generateSitemap as sitemap } from 'sitemap-ts'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vitepress'

const pkg = require('../../package.json')

export default defineConfig({
  title: '⬡ Honeycomb',
  description: `A hexagon grid library made in TypeScript.`,
  lastUpdated: true,
  base: '/honeycomb/',
  markdown: {
    lineNumbers: true,
  },
  appearance: 'dark',

  buildEnd: ({ outDir }) => {
    sitemap({ hostname: 'https://abbekeultjes.nl/honeycomb/', basePath: 'honeycomb', outDir })
  },

  themeConfig: {
    outline: [2, 3],
    algolia: {
      appId: 'AF859G6W5B',
      apiKey: '147ebb46c4c31e0ffbce1ae7961148e7',
      indexName: 'abbekeultjes',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/flauwekeul/honeycomb' },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g transform="scale(1.9656)" fill="none"><circle cx="16.28" cy="16.28" r="16.28" fill="#29abe0"/><path d="M22.26 8.8h1.6c3.1 0 5.62 2.51 5.62 5.61v.33c0 3.1-2.51 5.62-5.61 5.62h-1.61v1.69a2.6 2.6 0 0 1-2.6 2.59H7.44a2.6 2.6 0 0 1-2.59-2.6V10.1c0-.72.58-1.3 1.3-1.3Zm0 3v5.56h1.46a2.78 2.78 0 1 0 0-5.56z" fill="#fff"/></g><path d="M25.95 27.67c.78-2.3 2.65-3.45 5.59-3.45 4.41 0 6.05 5.49 3.74 9.08-1.55 2.4-4.66 5.42-9.33 9.08-4.68-3.66-7.8-6.69-9.33-9.08-2.32-3.6-.68-9.08 3.73-9.08 2.94 0 4.8 1.15 5.6 3.45Z" fill="#ff5e5b"/></svg>',
        },
        link: 'https://ko-fi.com/flauwekeul',
        ariaLabel: 'ko-fi',
      },
    ],
    nav: [
      { text: 'Guide', link: '/guide/getting-started', activeMatch: '/guide/' },
      { text: 'API', link: '/api/index', activeMatch: '/api/' },
      { text: 'Playground', link: '/playground.md', activeMatch: '/playground/' },
      {
        text: pkg.version,
        items: [{ text: 'Changelog', link: 'https://github.com/flauwekeul/honeycomb/releases' }],
      },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [{ text: 'Getting started', link: '/guide/getting-started' }],
        },
        {
          text: 'Hexes',
          items: [
            { text: 'Coordinate system', link: '/guide/coordinate-system' },
            { text: 'Custom hexes', link: '/guide/custom-hexes' },
            { text: 'Custom hex creation', link: '/guide/custom-hex-creation' },
          ],
        },
        {
          text: 'Grid',
          items: [
            { text: 'Creating grids', link: '/guide/creating-grids' },
            { text: 'Iterating grids', link: '/guide/iterating-grids' },
            { text: 'Traversing grids', link: '/guide/traversing-grids' },
            { text: 'Other grid methods', link: '/guide/other-grid-methods' },
          ],
        },
        {
          text: 'Recipes',
          items: [
            { text: 'Rendering', link: '/guide/rendering' },
            { text: 'Point → hex', link: '/guide/point-to-hex' },
            { text: '(De)serializing', link: '/guide/serializing' },
            { text: 'Custom traverser', link: '/guide/custom-traverser' },
            { text: 'Custom Grid', link: '/guide/custom-grid' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'Coordinates',
          items: [
            { text: 'Axial', link: '/api/interfaces/AxialCoordinates' },
            { text: 'Cube', link: '/api/interfaces/CubeCoordinates' },
            { text: 'Offset', link: '/api/interfaces/OffsetCoordinates' },
            { text: 'Tuple', link: '/api/#TupleCoordinates' },
            { text: 'HexCoordinates', link: '/api/#HexCoordinates' },
            { text: 'Point', link: '/api/interfaces/Point' },
          ],
        },
        {
          text: 'Hex',
          items: [
            { text: 'Hex class', link: '/api/classes/Hex' },
            { text: 'defineHex', link: '/api/#defineHex' },
          ],
        },
        {
          text: 'Grid',
          items: [{ text: 'Grid class', link: '/api/classes/Grid' }],
        },
        {
          text: 'Traversers',
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

  vite: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    ssr: { noExternal: ['element-plus'] },
  },
})
