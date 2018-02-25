/* eslint-disable import/no-extraneous-dependencies */
const Path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const BUILD_DIR = 'build';
const SRC_DIR = 'src';

const plugins = {
    clean: new CleanWebpackPlugin([BUILD_DIR], {
        root: process.cwd()
    })
};

module.exports = {
    entry: Path.join(process.cwd(), SRC_DIR, 'index.jsx'),
    output: {
        path: Path.join(process.cwd(), BUILD_DIR),
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
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
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
