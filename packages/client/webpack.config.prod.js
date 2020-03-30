const path = require('path');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const common = require('./webpack.common.js');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  optimization: {
    runtimeChunk: 'single',
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
    }),
    new MiniCssExtractPlugin(),
    new OptimizeCssAssetsPlugin({}),
  ],
  mode: 'production',
  devtool: 'source-map',
});
