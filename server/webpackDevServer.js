// Currently not active
//
// import path from 'path';
// import express from 'express';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import path from 'path';
import config from '../webpack.config.js';

const devServer = new WebpackDevServer(webpack(config), {
  hot: true,
  historyApiFallback: true,
  contentBase: path.resolve(__dirname, '..', 'public'),
  publicPath: '/build/',
  // proxy: {
  //   '*': 'http://localhost: 3001'
  // },
  stats: { colors: true }
});

devServer.listen(3000, 'localhost', () => {
  console.log('Dev server started at 3000');
});
