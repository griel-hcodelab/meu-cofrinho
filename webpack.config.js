const path = require("path")
const CompressionWebpackPlugin = require("compression-webpack-plugin")

module.exports = {
    mode: 'development',
    entry: './public/assets/javascript/start.js',
    output: {
        filename: 'javascript.js',
        path: path.resolve(__dirname, 'public')
    },
    devtool: false,
    plugins: [
        new CompressionWebpackPlugin(),
    ]
}