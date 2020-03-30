const path = require('path');
const autoprefixer = require('autoprefixer');

const srcDir = path.join(__dirname, 'src');

module.exports = {
  entry: {
    main: ['@babel/polyfill', path.join(srcDir, 'index.tsx')],
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
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: {
          loader: 'babel-loader',
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
};
