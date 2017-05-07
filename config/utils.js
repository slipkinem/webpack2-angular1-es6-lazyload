/**
 * Created by HASEE on 2017/5/7.
 */
const path = require('path')

// helper method for resolving paths
exports.resolveToApp = (root, glob = '') => {
  return path.join(root, 'app', glob) // app/{glob}
}

exports.resolveToComponents = (root, glob = '') => {
  return path.join(root, 'app/components', glob) // app/components/{glob}
}
