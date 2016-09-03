var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    main: [
      './scripts/index.jsx',
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server'
    ]
  },

  output: {
    publicPath: 'http://localhost:3000/',
    filename: '/js/[name].js'
  },

  devServer: {
      host: '0.0.0.0',
      port: 3000,
  },

  resolve: {
    root: __dirname,
    extensions: ['', '.js', '.jsx', 'stage-0']
  },

  module: {
    loaders: [
      {
        loaders: ['react-hot', 'babel?' + JSON.stringify({presets: ['react', 'es2015', 'stage-0']})],
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
    ]
  },
  devtool: 'source-map'
};
