module.exports = {
  "transpileDependencies": [
    "vuetify"

  ],
  devServer: {
    proxy: {
      '/api': {
        target: 'http://155.230.248.67:5000/api',
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
