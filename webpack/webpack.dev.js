/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');

const plugins = {
    html: new HtmlWebpackPlugin({ template: 'public/index.html' })
};

module.exports = merge(common, {
    devtool: 'cheap-module-source-map',
    devServer: {
        port: 8080,
        contentBase: 'public', // serve static assets from here
        historyApiFallback: true // avoid 404 on app reload
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                include: /node_modules/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [plugins.html]
});
