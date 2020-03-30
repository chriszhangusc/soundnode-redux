const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

const PORT = process.env.PORT || 3000;

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    // enable HMR on the server
    // hot: true,

    // Serve the files generated in dist folder(in memory)
    contentBase: path.join(__dirname, 'dist'),

    // 1.Match the output publicPath
    // will create folder in memory
    // on server there will be a server-root/dist folder
    // 2. Do not remove publicPath
    publicPath: '/',
    port: 3000,
    compress: true,

    // Opens new browser window when we run devserer for the first time
    open: false,
    host: 'localhost',
    historyApiFallback: true,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join('./src', 'public', 'index.html'),
    }),

    // DefinePlugin makes it possible for us to use env variables in src code
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
      PORT,
    }),

    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer()],
      },
    }),
  ],
  devtool: 'source-map',
});
