const path = require('path');
const webpack = require('webpack');

const srcDir = path.join(__dirname, 'src');

module.exports = {
  entry: {
    main: ['@babel/polyfill', path.join(srcDir, 'index.tsx')],
  },

  externals: {
    'styled-components': {
      commonjs: 'styled-components',
      commonjs2: 'styled-components',
      amd: 'styled-components',
    },
  },

  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/',
  },

  // Use resolve.moduleDirectories only for package managers with a depth dependency structure.
  // In every other case use resolve.root.
  resolve: {
    modules: [path.join(srcDir, 'client'), 'node_modules'],
    alias: {
      assets: path.join(__dirname, 'public'),
      '@soundnode-redux/client': __dirname,
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
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\S+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              esModule: false,
              limit: 8192,
            },
          },
        ],
      },
    ],
  },

  plugins: [new webpack.EnvironmentPlugin(['NODE_ENV', 'HOST'])],
};
