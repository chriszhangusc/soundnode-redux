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
    historyApiFallback: true,
    contentBase: './server/public',
    port: 3000
  },
  // Use resolve.moduleDirectories only for package managers with a depth dependency structure.
  // In every other case use resolve.root.
  resolve: {
    root: [
      path.resolve(__dirname, './node_modules')
    ],
    alias: {
      client: path.resolve(__dirname, './scripts')
    },
    extensions: ['', '.js', '.jsx', 'stage-0']
  },

  module: {
    loaders: [
      {
        loaders: ['react-hot',
        'babel?' + JSON.stringify({
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['transform-runtime'] })],
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\S+)?$/,
        loader: 'file-loader?name=[name].[ext]'
      }
    ]
  },
  devtool: 'source-map'
};
