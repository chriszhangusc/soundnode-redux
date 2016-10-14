var path = require('path');
// var webpack = require('webpack');
var buildPath = path.resolve(__dirname, 'public', 'build');

var PORT = 3000;

module.exports = {
  entry: [
    './client/index.jsx'
  ],

  // Here if we are using webpack-dev-server, it will generate a single file
  // directly on the server's root.

  // Just like app.use(publicPath, express.static(__dirname, contentBase))
  output: {
    // We need to give Webpack a path. It does not actually need it,
    // because files are kept in memory in webpack-dev-server, but an
    // error will occur if nothing is specified. We use the buildPath
    // as that points to where the files will eventually be bundled
    // in production
    path: buildPath,
    filename: 'bundle.js',
    // This modified bundle is served from memory at the relative path specified in publicPath (see API).
    // It will not be written to your configured output directory.
    // Where a bundle already exists at the same URL path, the bundle in memory takes precedence (by default).
    // Using the configuration above, the bundle is available at localhost:3000/build/bundle.js.
    publicPath: '/build/'
  },

  devServer: {
    historyApiFallback: true,
    // Serve the static files under public folder
    contentBase: './public',
    port: PORT
  },
  // Use resolve.moduleDirectories only for package managers with a depth dependency structure.
  // In every other case use resolve.root.
  resolve: {
    root: [
      path.resolve(__dirname, './node_modules')
    ],
    alias: {
      client: path.resolve(__dirname, './client'),
      assets: path.resolve(__dirname, './public')
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
        exclude: [path.resolve(__dirname, 'node_modules')]
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\S+)?$/,
        loader: 'file-loader?name=[name].[ext]'
      }
    ]
  },
  devtool: 'source-map'
};
