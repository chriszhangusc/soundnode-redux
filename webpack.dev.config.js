const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const PORT = process.env.PORT || 3000;

module.exports = {
  entry: {
    main: ['babel-polyfill', path.join(__dirname, 'client', 'index.jsx')],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/dist/',
  },

  devServer: {
    // enable HMR on the server
    // hot: true,
    // Serve the static files under public folder
    contentBase: path.resolve(__dirname, 'public'),

    // match the output publicPath
    // will create folder in memory
    // on server there will be a server-root/dist folder
    publicPath: '/dist/',
    port: PORT,
    compress: true,

    // Reduce the amount of console outputs when we run webpack-dev-server
    // stats: 'errors-only',
    // Opens new browser window when we run devserer for the first time
    open: true,
    // proxy: {
    //   '/sc/*': {
    //     target: 'http://127.0.0.1:3001',
    //     secure: false
    //   }
    // },
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
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\S+)?$/,
        use: ['url-loader?limit=10000&name=images/[hash:12].[ext]'],
      },
    ],
  },

  plugins: [
    // From doc: enable HMR globally
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    // From doc: prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),

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
