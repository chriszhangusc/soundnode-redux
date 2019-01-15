const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  mode: 'production',

  entry: {
    main: ['babel-polyfill', path.join(__dirname, 'client', 'index.jsx')],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].min.js',
    // Matching app.use('/dist', express.static(distPath)); in server.prod.js
    publicPath: '/',
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
        use: ['babel-loader'],
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
    new HTMLWebpackPlugin({ template: path.join(__dirname, 'public', 'index.html') }),

    // DefinePlugin makes it possible for us to use env variables in src code
    // Running webpack -p will include this plugin
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),

    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer()],
      },
    }),
  ],
};
