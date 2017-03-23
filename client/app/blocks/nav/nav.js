/**
 * Created by slipkinem on 2017/3/21.
 */
'use strict'
import angular from 'angular'
import navComponent from './nav.component'

let navModule = angular.module('nav', [])
  .component('tpaNav', navComponent)
  .name

export default navModule
