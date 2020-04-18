const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT;

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    // enable HMR on the server
    // hot: true,

    // Serve the files generated in dist folder(in memory)
    contentBase: path.join(__dirname, 'build'),

    // 1.Match the output publicPath
    // will create folder in memory
    // on server there will be a server-root/dist folder
    // 2. Do not remove publicPath
    publicPath: '/',
    port: PORT,
    compress: true,

    // Opens new browser window when we run devserer for the first time
    open: false,
    host: 'localhost',
    historyApiFallback: true,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
    }),
  ],
  devtool: 'source-map',
});
