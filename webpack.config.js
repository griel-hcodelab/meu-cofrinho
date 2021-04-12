const path = require("path")

module.exports = {
    mode: 'development',
    entry: './public/assets/js/start.js',
    output: {
        filename: 'javascript.js',
        path: path.resolve(__dirname, 'public')
    },
    devtool: false
}