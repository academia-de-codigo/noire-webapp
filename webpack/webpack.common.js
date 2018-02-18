/* eslint-disable import/no-extraneous-dependencies */
const Path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BUILD_DIR = 'build';

const plugins = {
  html: new HtmlWebpackPlugin({ template: 'public/index.html' }),
  clean: new CleanWebpackPlugin([BUILD_DIR], {
    root: process.cwd()
  })
};

module.exports = {
  entry: './src/index.jsx',
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
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.jsx']
  },
  plugins: [plugins.html, plugins.clean]
};
