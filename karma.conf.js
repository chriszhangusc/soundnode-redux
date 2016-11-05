var path = require('path');
const webpackConfigPath = process.env.NODE_ENV === 'production' ?
                          path.resolve(__dirname, 'webpack.prod.config'):
                          path.resolve(__dirname, 'webpack.dev.config');
const webpackConfig = require(webpackConfigPath);
module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    singleRun: true,
    frameworks: ['mocha'],
    files: ['app/tests/**/*.test.jsx'],
    preprocessors: {
      'app/tests/**/*.test.jsx': ['webpack', 'sourcemap']
    },
    reporters: ['mocha'],
    client: {
      mocha: {
        timeout: '5000'
      }
    },
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    }
  });
};
