/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const common = require('./webpack.common.js');

const plugins = {
    html: new HtmlWebpackPlugin({
        template: 'public/index.html',
        favicon: 'public/favicon.ico',
        minify: {
            html5: true,
            removeComments: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            minifyJS: true,
            minifyCSS: true
        }
    }),

    uglifyJs: new UglifyJSPlugin({
        sourceMap: true,
        uglifyOptions: {
            compress: {
                ie8: false,
                unused: true,
                dead_code: true
            },
            output: {
                comments: false
            }
        },
        exclude: [/\.min\.js$/gi]
    }),

    extractText: new ExtractTextPlugin('styles.css')
};

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                include: [/node_modules/, /src/],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: { loader: 'css-loader', options: { minimize: true } }
                })
            }
        ]
    },
    plugins: [plugins.uglifyJs, plugins.extractText, plugins.html]
});
