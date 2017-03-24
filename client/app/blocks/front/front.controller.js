/**
 * Created by slipkinem on 2017/3/21.
 */
'use strict'
import angular from 'angular'

class FrontController {
  constructor($translate, $window) {
    'ngInject'
    this.$translate = $translate
    this.$window = $window
    // config
    this.app = {
      name: 'angular',
      version: '1.3.3',
      // for chart colors
      color: {
        primary: '#7266ba',
        info: '#23b7e5',
        success: '#27c24c',
        warning: '#fad733',
        danger: '#f05050',
        light: '#e8eff0',
        dark: '#3a3f51',
        black: '#1c2b36'
      },
      settings: {
        themeID: 1,
        navbarHeaderColor: 'bg-black',
        navbarCollapseColor: 'bg-white-only',
        asideColor: 'bg-black',
        headerFixed: true,
        asideFixed: false,
        asideFolded: false,
        asideDock: false,
        container: false
      }
    }
    // angular translate
    this.lang = {isopen: false}
    this.langs = {en: 'English', de_DE: 'German', it_IT: 'Italian'}
    this.selectLang = this.langs[$translate.proposedLanguage()] || 'English'

  }

  $onInit() {
    this.addIESmart(this.$window)
  }

  addIESmart($window) {
    let isIE = !!navigator.userAgent.match(/MSIE/i)
    isIE && angular.element($window.document.body).addClass('ie')
    this.isSmartDevice($window) && angular.element($window.document.body).addClass('smart')
  }

  setLang(langKey) {
    // set the current lang
    this.selectLang = this.langs[langKey]
    // You can change the language during runtime
    this.$translate.use(langKey)
    this.lang.isopen = !this.lang.isopen
  }

  isSmartDevice($window) {
    // Adapted from http://www.detectmobilebrowsers.com
    var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera']
    // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
    return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua)
  }

}


export default FrontController