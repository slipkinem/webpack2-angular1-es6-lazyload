var webpack = require('webpack')
var path = require('path')
var config = require('./webpack.config')
const publicPath = require('./index').dev.publicPath

config.output = {
  filename: 'js/[name].bundle.js',
  publicPath,
  path: path.resolve(__dirname, 'client'),
  chunkFilename: 'js/chunks/[id].[name].chunk.[chunkhash].js'
}

config.plugins = config.plugins.concat([

  // Adds webpack HMR support. It act's like livereload,
  // reloading page after webpack rebuilt modules.
  // It also updates stylesheets and inline assets without page reloading.
  new webpack.HotModuleReplacementPlugin()
])

module.exports = config
