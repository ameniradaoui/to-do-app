const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function(app) {
  app.use(
    "/task/",
    createProxyMiddleware({
      target: "http://localhost:3002",
      changeOrigin: true,
      secure: false,
      logLevel: "info",
      timeout: 40000
    })
  );
  app.use(
    "/oauth/",
    createProxyMiddleware({
      target: 'http://localhost:3002',
      changeOrigin: true,
      secure: false,
      logLevel: "info",
      timeout: 3000
    })
  );

  app.use(
    "/app",
    createProxyMiddleware({
      target: "http://3.21.237.200",
      changeOrigin: true,
      secure: false,
      logLevel: "info",
      timeout: 3000
    })
  );
};
