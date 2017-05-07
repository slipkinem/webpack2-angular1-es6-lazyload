/**
 * Created by slipkinem on 2017/3/21.
 */
'use strict'
import template from './settings.html'

let settingsComponent = {
  restrict: 'E',
  template,
  bindings: {
    setting: '<'
  }
}

export default settingsComponent
