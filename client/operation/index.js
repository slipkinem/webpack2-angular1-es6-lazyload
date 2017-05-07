/**
 * Created by slipkinem on 2017/3/23.
 */
'use strict'
import angular from 'angular'
import uiRouter from 'angular-ui-router'

let AppRouter = angular.module('app.router', [
  uiRouter
])
  .config(($stateProvider) => {
    'ngInject'
    $stateProvider
      .state('tpa.note', {
        url: '/note',
        component: 'note',
        resolve: {
          deps: ($ocLazyLoad) => {
            return System.import('./note/note')
              .then(r => $ocLazyLoad.inject(r.default))
          }
        }
      })
  })

export default AppRouter.name
