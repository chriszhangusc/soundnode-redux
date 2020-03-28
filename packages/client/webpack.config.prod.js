const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  optimization: {
    runtimeChunk: 'single',
  },
  plugins: [new MiniCssExtractPlugin(), new OptimizeCssAssetsPlugin({})],
  mode: 'production',
  devtool: 'source-map',
});
