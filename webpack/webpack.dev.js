/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');

const ASSETS_DIR = 'public';

const plugins = {
    html: new HtmlWebpackPlugin({
        template: 'public/index.html',
        favicon: 'public/favicon.ico'
    }),
    named: new webpack.NamedModulesPlugin(),
    hmr: new webpack.HotModuleReplacementPlugin()
};

module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        port: 8000,
        contentBase: ASSETS_DIR,
        historyApiFallback: true, // avoid 404 on app reload
        hot: true,
        inline: true,
        overlay: {
            warnings: false,
            errors: true
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                include: [/node_modules/, /src/],
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [plugins.html, plugins.named, plugins.hmr]
});
