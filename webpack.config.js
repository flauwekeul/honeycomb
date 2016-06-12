const path = require('path')

module.exports = {
    entry: './src/index',
    output: {
        path: './lib',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'src'),
                loader: 'babel-loader',
                query: {
                    presets: [ 'es2015' ],
                }
            }
        ]
    }
}
