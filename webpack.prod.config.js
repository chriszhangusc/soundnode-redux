// webpack config for production
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    path.resolve(__dirname, 'client', 'index.jsx'),
  ],

  // If confused: https://github.com/webpack/docs/wiki/configuration#outputpublicpath
  output: {
    // Base path: ./public/build/
    path: path.join(__dirname, 'public', 'build'),
    filename: 'bundle.js',

    publicPath: '/build/'
  },

  resolve: {
    root: [
      path.resolve(__dirname, './node_modules')
    ],
    alias: {
      client: path.resolve(__dirname, './client'),
      assets: path.resolve(__dirname, './public')
    },
    extensions: ['', '.js', '.jsx', 'stage-0'],
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    // Make sure environment variables are also accessible in client side.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],

  module: {
    loaders: [
      {
        loaders: ['react-hot', 'babel-loader'],
        test: /\.jsx?$/,
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\S+)?$/,
        loader: 'file-loader?name=[name].[ext]'
      }
    ]
  },

  devtool: 'cheap-module-source-map'
};
