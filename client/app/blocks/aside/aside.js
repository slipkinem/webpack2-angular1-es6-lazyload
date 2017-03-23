/**
 * Created by slipkinem on 2017/3/21.
 */
'use strict'
import angular from 'angular'
import asideComponent from './aside.component'
import Nav from '../nav/nav'
import uiNav from '../../../js/directives/ui-nav'
let asideModule = angular.module('aside', [
  Nav,
  uiNav
])
  .component('aside', asideComponent)
  .name

export default asideModule
