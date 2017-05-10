'use strict';

const webpack = require('webpack')
const path = require('path')

const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
const PRODUCTION = process.env.NODE_ENV === 'production'

const libraryName = 'Honeycomb'

let plugins = []
let filename = libraryName.toLowerCase()
let devtool

if (PRODUCTION) {
    plugins.push(new UglifyJsPlugin({ compress: { warnings: false } }))
    filename += '.min.js'
} else {
    filename += '.js'
    devtool = 'source-map'
}

module.exports = {
    entry: './src/honeycomb.js',
    output: {
        path: path.resolve('./dist'),
        filename: filename,
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    devtool: devtool,
    plugins: plugins,
    module: {
        rules: [{
            test: /\.js$/,
            use: { loader: 'babel-loader' }
        }]
    }
}
