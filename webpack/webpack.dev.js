/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');

const plugins = {
    html: new HtmlWebpackPlugin({ template: 'public/index.html' }),
    define: new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('dev')
    })
};

module.exports = merge(common, {
    devtool: 'cheap-module-source-map',
    devServer: {
        port: 8000,
        contentBase: 'public', // serve static assets from here
        historyApiFallback: true // avoid 404 on app reload
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
    plugins: [plugins.html]
});
