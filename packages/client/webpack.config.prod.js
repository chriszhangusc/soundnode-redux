// TODO: Refactor before deploying to production
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  optimization: {
    runtimeChunk: 'single',
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),

    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),

    new OptimizeCssAssetsPlugin({}),
  ],
  mode: 'production',
  devtool: 'source-map',
});
