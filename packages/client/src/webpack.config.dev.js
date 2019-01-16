const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

const PORT = process.env.PORT || 3000;

module.exports = {
  mode: 'development',
  entry: {
    main: path.join(__dirname, 'index.jsx'),
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
    open: false,
    host: 'localhost',
    historyApiFallback: true,
  },
  // Use resolve.moduleDirectories only for package managers with a depth dependency structure.
  // In every other case use resolve.root.
  resolve: {
    modules: [path.join(__dirname, 'client'), 'node_modules'],
    alias: {
      assets: path.join(__dirname, 'public'),
    },
    extensions: ['*', '.ts', '.tsx', '.js', '.jsx', 'stage-0'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            // This is a feature of `babel-loader` for webpack (not Babel itself).
            // It enables caching results in ./node_modules/.cache/babel-loader/
            // directory for faster rebuilds.
            cacheDirectory: true,
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer],
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\S+)?$/,
        use: ['url-loader?limit=40000&name=images/[hash:12].[ext]', 'image-webpack-loader'],
      },
    ],
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
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
