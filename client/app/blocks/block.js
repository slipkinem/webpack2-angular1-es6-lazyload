/**
 * Created by slipkinem on 2017/3/21.
 */
'use strict'
import angular from 'angular'
import Front from './front/front'

let blockModule = angular.module('app.block', [
  Front
])
  .name

export default blockModule