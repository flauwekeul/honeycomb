/* eslint-env node */

import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'

const isProduction = process.env.NODE_ENV === 'production'

export default {
  input: 'src/honeycomb.js',
  output: [
    {
      name: 'Honeycomb',
      format: 'umd',
      file: `dist/honeycomb${isProduction ? '.min' : ''}.js`,
      sourcemap: true,
    },
    {
      name: 'Honeycomb',
      format: 'es',
      file: `dist/honeycomb.esm${isProduction ? '.min' : ''}.js`,
      sourcemap: true,
    },
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    resolve(),
    commonjs({
      namedExports: {
        'axis.js': ['isObject', 'isNumber', 'isArray', 'isString'],
      },
    }),
    ...(isProduction ? [terser()] : []),
  ],
}
