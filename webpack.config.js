var path = require('path')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var autoprefixer = require('autoprefixer')
var sassLintPlugin = require('sasslint-webpack-plugin')
const webpack = require('webpack');

module.exports = {
    entry: './js/app.js',
    output: {
        path: './web/themes/custom/naturalmission/',
        filename: 'js/app.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015']
            }
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader')
        }, {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&mimetype=application/font-woff"
        }, {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&mimetype=application/font-woff"
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&mimetype=application/octet-stream"
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file"
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&mimetype=image/svg+xml"
        }]
    },
    sassLoader: {
        includePaths: [path.resolve(__dirname, "node_modules")]
    },
    plugins: [
        new ExtractTextPlugin("css/style.css"),
        new sassLintPlugin({
          glob: './scss/**/*.s?(a|c)ss'
        }),
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery'
        })
    ],
    postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ]
}
