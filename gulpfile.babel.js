'use strict'

const gulp = require('gulp')
const webpack = require('webpack')
const path = require('path')
const gutil = require('gulp-util')
const serve = require('browser-sync')
const del = require('del')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const colorsSupported = require('supports-color')
const historyApiFallback = require('connect-history-api-fallback')
const yargs = require('yargs')
const template = require('gulp-template')
const rename = require('gulp-rename')
const proxyMiddleWare = require('http-proxy-middleware')
const config = require('./config')
const utils = require('./config/utils')

// use webpack.config.js to build modules
gulp.task('webpack', ['clean'], (cb) => {
  const webpackConfig = require('./config/webpack.dist.config')

  webpack(webpackConfig, (err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack', err)
    }

    gutil.log('[webpack]', stats.toString({
      colors: colorsSupported,
      chunks: false,
      errorDetails: true
    }))

    cb()
  })
})

gulp.task('serve:dist', () => {
  serve({
    port: process.env.PORT || 3000,
    open: false,
    server: {baseDir: config.prod.root}
  })
})

gulp.task('serve', () => {
  const webpackConfig = require('./config/webpack.dev.config')
  webpackConfig.devtool = 'source-map'
  webpackConfig.entry.app = [
    // this modules required to make HRM working
    // it responsible for all this webpack magic
    'webpack-hot-middleware/client?reload=true'
    // application entry point
  ].concat(webpackConfig.entry.app)

  let compiler = webpack(webpackConfig)

  let middleware = [
    historyApiFallback(),
    webpackDevMiddleware(compiler, {
      stats: {
        colors: colorsSupported,
        chunks: false,
        modules: false
      },
      publicPath: webpackConfig.output.publicPath
    }),
    webpackHotMiddleware(compiler)
  ]

  Object.keys(config.dev.proxyTable).forEach(function (context) {
    let options = {
      target: config.dev.proxyTable[context],
      changeOrigin: true,
      onProxyRes (proxyRes) {
        if (!proxyRes.header['set-cookie']) return

        proxyRes.header['set-cookie'] =
          [].slice.call(proxyRes.header['set-cookie'] || '')
            .map(item => {
              return item.replace(/Path=\/.*?;/, 'Path=/;')
            })
      }
    }
    middleware.unshift(proxyMiddleWare(context, options))
  })

  serve({  // browser sync的配置
    port: config.dev.port,
    open: false,
    server: {baseDir: config.dev.root},
    middleware
  })
})

gulp.task('component', () => {
  const cap = (val) => {
    return val.charAt(0).toUpperCase() + val.slice(1)
  }
  const name = yargs.argv.name
  const parentPath = yargs.argv.parent || ''
  const destPath = path.join(utils.resolveToComponents(), parentPath, name)

  return gulp.src(config.dev.blankTemplates)
    .pipe(template({
      name: name,
      upCaseName: cap(name)
    }))
    .pipe(rename((path) => {
      path.basename = path.basename.replace('temp', name)
    }))
    .pipe(gulp.dest(destPath))
})

gulp.task('clean', (cb) => {
  del([config.dev.dest]).then(function (paths) {
    gutil.log('[clean]', paths)
    cb()
  })
})

gulp.task('default', ['serve'])
