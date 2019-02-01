const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

const PORT = process.env.PORT || 3000;

const srcDir = path.join(__dirname, 'src');

module.exports = {
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', path.join(srcDir, 'index.jsx')],
  },

  output: {
    path: path.join(srcDir, 'dist'),
    filename: '[name].[hash].bundle.js',
    publicPath: '/',
  },

  // Use resolve.moduleDirectories only for package managers with a depth dependency structure.
  // In every other case use resolve.root.
  resolve: {
    modules: [path.join(srcDir, 'client'), 'node_modules'],
    alias: {
      assets: path.join(srcDir, 'public'),
    },
    extensions: ['*', '.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
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
      template: path.join(srcDir, 'public', 'index.html'),
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
};
