const path = require("path")
const CompressionWebpackPlugin = require("compression-webpack-plugin")

module.exports = {
    mode: 'production',
    entry: './public/assets/javascript/start.js',
    output: {
        filename: 'javascript.js',
        path: path.resolve(__dirname, 'public')
    },
    devtool: false,
    plugins: [
        new CompressionPlugin({   
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            minRatio: 0.8,
            compressionOptions: { level: 9 },
        })
    ]
    
}
