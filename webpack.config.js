const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
// I know about default progress plugin in webpack module
// just want to try something new :)
const ProgressPlugin = require('progress-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const isDevMode = () => process.env.MODE === 'development';

module.exports = () => ({
  mode: isDevMode() ? 'development' : 'production',
  entry: path.resolve(__dirname, './src/js/main.js'),
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, './src/assets'), to: path.resolve(__dirname, './build/assets') }
      ],
    }),
    new webpack.DefinePlugin({
      'process.env.MODE': JSON.stringify(process.env.MODE),
    }),
    new Dotenv({
      path: './.env',
    }),
    ...(isDevMode() ? [new ProgressPlugin(true)] : []),
  ],
  devtool: 'source-map',
  devServer: {
    hot: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 3000,
  },
});
