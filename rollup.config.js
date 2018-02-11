/* eslint-env node */

import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

const config = {
    input: 'src/honeycomb.js',
    output: {
        name: 'Honeycomb',
        format: 'umd'
    },
    plugins: [
        babel({
            exclude: 'node_modules/**',
            plugins: ['external-helpers']
        }),
        resolve(),
        commonjs({
            namedExports: {
                'axis.js': ['isObject', 'isNumber', 'isArray', 'isString']
            }
        })
    ]
}

if (process.env.NODE_ENV === 'production') {
    Object.assign(config.output, {
        file: 'dist/honeycomb.min.js'
    })
    config.plugins.push(uglify())
} else {
    Object.assign(config.output, {
        file: 'dist/honeycomb.js',
        sourcemap: true
    })
}

export default config
