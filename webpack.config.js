const path = require("path")
const CompressionWebpackPlugin = require("compression-webpack-plugin")

module.exports = {
    mode: 'development',
    entry: './public/assets/js/start.js',
    output: {
        filename: 'javascript.js',
        path: path.resolve(__dirname, 'public')
    },
    devtool: false,
    plugins: [
        new CompressionWebpackPlugin(),
    ]
}