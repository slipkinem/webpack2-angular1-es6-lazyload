/**
 * Created by slipkinem on 2017/3/21.
 */
'use strict'
import angular from 'angular'

import settingsComponent from './settings.component'

let settingsModule = angular.module('settings', [])
  .component('settings', settingsComponent)
  .name

export default settingsModule