/**
 * Created by slipkinem on 2017/3/21.
 */
'use strict'
import template from './header.html'

let headerComponent = {
  restrict: 'E',
  bindings: {
    setting: '<'
  },
  template,
}

export default headerComponent