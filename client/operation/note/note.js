/**
 * Created by slipkinem on 2017/3/21.
 */
'use strict'
import angular from 'angular'
import uiRouter from 'angular-ui-router'
import NoteComponent from './note.component'

let noteModule = angular.module('note', [
  uiRouter
])

  .component('note', NoteComponent)
  .name

export default noteModule
