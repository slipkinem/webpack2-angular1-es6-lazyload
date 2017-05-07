/**
 * Created by slipkinem on 2017/3/21.
 */
'use strict'

import angular from 'angular'
import uiRouter from 'angular-ui-router'
import translate from 'angular-translate'
import frontComponent from './front.component'
import uiToggleclass from '../../../js/directives/ui-toggleclass'
import Settings from '../settings/settings'
import Header from '../header/header'
import Aside from '../aside/aside'

let frontModule =
  angular.module('front', [
    uiRouter,
    translate,
    Settings,
    Header,
    Aside,
    uiToggleclass
  ])

    .config(($stateProvider) => {
      'ngInject'
      $stateProvider.state('tpa', {
        url: '/tpa',
        component: 'front',
        abstract: true
      })
    })

    .component('front', frontComponent)

    .name

export default frontModule
