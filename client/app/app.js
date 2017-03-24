import angular from 'angular'
import uiRouter from 'angular-ui-router'
import uiBootstrap from 'angular-ui-bootstrap'
import angularAnimate from 'angular-animate'
import ocLazyLoad from 'oclazyload'

import AppRouter from '../operation'
import Block from './blocks/block'
import Components from './components'
import AppComponent from './app.component'

var app = angular.module('app', [
  uiRouter,
  uiBootstrap,
  angularAnimate,
  ocLazyLoad,
  Block,
  Components,
  AppRouter
])
  .config(($locationProvider, $urlRouterProvider) => {
    'ngInject'
    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    $urlRouterProvider.otherwise('/tpa/front')

    $locationProvider.html5Mode(false).hashPrefix('!')
  })
  .config(function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
    'ngInject'
    // lazy controller, directive and service
    app.controller = $controllerProvider.register
    app.directive = $compileProvider.directive
    app.filter = $filterProvider.register
    app.factory = $provide.factory
    app.service = $provide.service
    app.constant = $provide.constant
    app.value = $provide.value
  })

  .component('app', AppComponent)
