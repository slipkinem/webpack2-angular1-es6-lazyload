var webpack = require('webpack')
var path = require('path')
var config = require('./webpack.config')
let OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const publicPath = require('./index').prod.publicPath

config.output = {
  filename: 'js/[name].[hash].js',
  publicPath,
  path: path.resolve(__dirname, '../dist'),
  chunkFilename: 'js/chunks/[name].chunk.[chunkhash].js'
}

var CompressionWebpackPlugin = require('compression-webpack-plugin')
config.plugins = config.plugins.concat([
  new OptimizeCssAssetsPlugin(),

  // Reduces bundles total size
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    mangle: {

      // You can specify all variables that should not be mangled.
      // For example if your vendor dependency doesn't use modules
      // and relies on global variables. Most of angular modules relies on
      // angular global variable, so we should keep it unchanged
      except: ['$super', '$', 'exports', 'require', 'angular']
    }
  }),
  new CompressionWebpackPlugin({
    asset: '[path].gz[query]',
    algorithm: 'gzip',
    test: /\.(js|html|css)$/,
    threshold: 10240,
    minRatio: 0.8
  })
])

module.exports = config
