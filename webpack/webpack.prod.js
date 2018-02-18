/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const common = require('./webpack.common.js');

const plugins = {
  uglifyJs: new UglifyJSPlugin({
    sourceMap: true,
    uglifyOptions: { compress: true }
  }),
  define: new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  extractText: new ExtractTextPlugin('styles.css')
};

module.exports = merge(common, {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: { loader: 'css-loader', options: { minimize: true } }
        })
      }
    ]
  },
  plugins: [plugins.uglifyJs, plugins.define, plugins.extractText]
});
