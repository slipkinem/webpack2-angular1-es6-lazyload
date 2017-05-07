/**
 * Created by slipkinem on 2017/3/21.
 */
'use strict'
import angular from 'angular'
import uiRouter from 'angular-ui-router'

import settingsComponent from './settings.component'

let settingsModule = angular.module('settings2', [uiRouter])
  .component('settings2', settingsComponent)

  .config(($stateProvider) => {
    'ngInject'
    $stateProvider
      .state('tpa.front', {
        url: '/front',
        component: 'settings2'
      })
  })

  .name

export default settingsModule
