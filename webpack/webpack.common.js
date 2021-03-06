/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const BUILD_DIR = 'build';
const SRC_DIR = 'src';

const plugins = {
    clean: new CleanWebpackPlugin([BUILD_DIR], {
        root: process.cwd()
    })
};

module.exports = {
    // babel-polyfill required for ES2017 async-await to generator conversion
    entry: ['babel-polyfill', path.join(process.cwd(), SRC_DIR, 'index.jsx')],
    output: {
        path: path.join(process.cwd(), BUILD_DIR),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader']
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|mp3|wav)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 100000
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [plugins.clean]
};
