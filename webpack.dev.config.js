// Webpack 2 dev config
var path = require('path');
var webpack = require('webpack');
var HTMLWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

const PORT = process.env.PORT || 3000;

module.exports = {

  entry: {
    main: ['babel-polyfill', path.join(__dirname, 'client', 'index.jsx')]
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/dist/',
  },

  devServer: {
    // enable HMR on the server
    hot: true,
    // Serve the static files under public folder
    contentBase: path.resolve(__dirname, 'public'),

    // match the output publicPath
    // will create folder in memory
    // on server there will be a server-root/dist folder
    publicPath: '/dist/',
    port: PORT,
    compress: true,

    // Reduce the amount of console outputs when we run webpack-dev-server
    stats: 'errors-only',
    // Opens new browser window when we run devserer for the first time
    open: true,
    // http://localhost:3000/api/abc will be redirect to 3001/api/abc
    proxy: {
      // /sc/api-v1/* and /sc/api-v2/*
      '/sc/*': {
        target: 'http://localhost:3001',
        secure: false
      }
    },
    historyApiFallback: true
  },
  // Use resolve.moduleDirectories only for package managers with a depth dependency structure.
  // In every other case use resolve.root.
  resolve: {

    modules: [
      // From documentaton
      // path.join(__dirname, "src"),
      "node_modules"
    ],
    alias: {
      client: path.join(__dirname, 'client'),
      assets: path.join(__dirname, 'public')
    },
    extensions: ['*', '.js', '.jsx', 'stage-0']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          'babel-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]
      },

      {
        test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\S+)?$/,
        use: [
          'url-loader?limit=10000&name=images/[hash:12].[ext]'
        ]
      }
    ]
  },

  plugins: [
    // From doc: enable HMR globally
    new webpack.HotModuleReplacementPlugin(),

    // From doc: prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),

    // DefinePlugin makes it possible for us to use env variables in src code
    new webpack.DefinePlugin({
      PRODUCTION: false, 
      PORT,
    }),

    // ProvidePlugin: automatically load modules.
    // new webpack.ProvidePlugin({
    //   React: 'react'
    // }),

    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer(),
        ]
      }
    })

  ],

  devtool: 'source-map'
};
