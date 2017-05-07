/**
 * Created by HASEE on 2017/5/7.
 */
const path = require('path')
module.exports = {
  dev: {
    root: 'client',
    publicPath: '/',
    // js: utils.resolveToComponents(this.paths.root, '**/*!(.spec.js).js'), // exclude spec files
    // scss: utils.resolveToApp('client', '**/*.scss'), // stylesheets
    // html: [
    //   utils.resolveToApp('client', '**/*.html'),
    //   path.join(this.paths.root, 'index.html')
    // ],
    blankTemplates: path.join(__dirname, 'generator', 'component/**/*.**'),
    dest: path.join(__dirname, '../dist'),
    proxyTable: {
      '/api': 'localhost:8080'
    },
    port: process.env.PORT || 3000
  },
  prod: {
    root: 'dist',
    publicPath: '/'
  }
}
