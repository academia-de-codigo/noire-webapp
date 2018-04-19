/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');
const common = require('./webpack.common.js');

const plugins = {
    html: new HtmlWebpackPlugin({
        template: 'public/index.html',
        favicon: 'public/favicon.ico'
    })
};

module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    serve: {
        port: 8000,
        // use apiHistoryFallback when serving from webpack
        add: app => app.use(convert(history()))
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
