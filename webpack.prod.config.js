// For Webpack 2
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

const PORT = process.env.PORT || 3000;

module.exports = {
  entry: {
    main: ['babel-polyfill', path.join(__dirname, 'client', 'index.jsx')],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].min.js',
    publicPath: '/',
  },

  // Use resolve.moduleDirectories only for package managers with a depth dependency structure.
  // In every other case use resolve.root.
  resolve: {
    modules: [path.join(__dirname, 'client'), 'node_modules'],
    alias: {
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader'],
        }),
      },

      {
        test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\S+)?$/,
        use: ['url-loader?limit=10000&name=images/[hash:12].[ext]'],
      },
    ],
  },

  plugins: [
    // // separate css code from bundle.js into style.css so that the browser
    // // can load javascript and css asynchrously
    // // Note in order to let the browser cache the content
    new ExtractTextPlugin({
      filename: 'style-[contenthash:10].css',
    }),

    new HTMLWebpackPlugin({
      template: path.join(__dirname, 'public', 'index-template.html'),
      filename: 'index.html',
    }),

    // DefinePlugin makes it possible for us to use env variables in src code
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),

    // ProvidePlugin: automatically load modules.
    new webpack.ProvidePlugin({
      React: 'react',
    }),

    // From doc: implicit vendor code splitting
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        // this assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf('node_modules') !== -1;
      },
    }),

    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer()],
      },
    }),
  ],
};
