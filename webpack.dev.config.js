const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const PORT = process.env.PORT || 3000;

const VENDOR_LIBS = [
  'copy-to-clipboard',
  'humps',
  'isomorphic-fetch',
  'lodash',
  'moment',
  'normalizr',
  'pluralize',
  'react-onclickoutside',
  'react-transition-group',
  'react',
  'prop-types',
  'react-dom',
  'react-bootstrap',
  'react-redux',
  'react-router',
  'react-router-dom',
  'redux-thunk',
  'recompose',
  'redux',
  'redux-saga',
  'reselect',
  'shortid',
  'soundcloud',
  'styled-components',
];

module.exports = {
  entry: {
    main: ['babel-polyfill', path.join(__dirname, 'client', 'index.jsx')],
    vendor: VENDOR_LIBS,
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].bundle.js',
    publicPath: '/',
  },

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
    port: PORT,
    compress: true,

    // Opens new browser window when we run devserer for the first time
    open: true,
    host: 'localhost',
    historyApiFallback: true,
  },
  // Use resolve.moduleDirectories only for package managers with a depth dependency structure.
  // In every other case use resolve.root.
  resolve: {
    modules: [path.join(__dirname, 'client'), 'node_modules'],
    alias: {
      // client: path.join(__dirname, 'client'),
      assets: path.join(__dirname, 'public'),
    },
    extensions: ['*', '.js', '.jsx', 'stage-0'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\S+)?$/,
        use: ['url-loader?limit=40000&name=images/[hash:12].[ext]', 'image-webpack-loader'],
      },
    ],
  },

  plugins: [
    // From doc: enable HMR globally
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),

    // From doc: prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),

    new HTMLWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest'],
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
};
