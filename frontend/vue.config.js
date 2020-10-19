module.exports = {
  "transpileDependencies": [
    "vuetify"

  ],
  devServer: {
    proxy: {
      '/api': {
        target: 'http://23alice.duckdns.org:5000/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  outputDir: '../backend/public',
   runtimeCompiler: true
}
