const proxy = require('http-proxy-middleware');

function configureProxy(app) {
  // proxy middleware options
  const optionsV1 = {
    target: 'https://api.soundcloud.com',
    changeOrigin: true,
    ws: true,
    pathRewrite: {
      '^/sc/v1': '/',
    },
  };

  const optionsV2 = {
    target: 'https://api-v2.soundcloud.com', // target host
    changeOrigin: true, // needed for virtual hosted sites
    ws: true, // proxy websockets
    pathRewrite: {
      '^/sc/v2': '/',
    },
  };

  const proxyV1 = proxy(optionsV1);
  const proxyV2 = proxy(optionsV2);

  app.use('/sc/v1', proxyV1);
  app.use('/sc/v2', proxyV2);
}

module.exports = configureProxy;
