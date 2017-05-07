import angular from 'angular'

export default angular.module('uiToggleClass', [])
  .directive('uiToggleClass', [function () {
    return {
      restrict: 'AC',
      link: function (scope, el, attr) {
        el.on('click', function (e) {
          e.preventDefault()
          let classes = attr.uiToggleClass.split(',')
          let targets = (attr.target && attr.target.split(',')) || Array(el)
          let key = 0
          angular.forEach(classes, function (_class) {
            let target = targets[(targets.length && key)];
            (_class.indexOf('*') !== -1) && magic(_class, target)
            $(target).toggleClass(_class)
            key++
          })
          $(el).toggleClass('active')

          function magic (_class, target) {
            let patt = new RegExp('\\s' +
              _class.replace(/\*/g, '[A-Za-z0-9-_]+').split(' ').join('\\s|\\s') +
              '\\s', 'g')
            let cn = ' ' + $(target)[0].className + ' '
            while (patt.test(cn)) {
              cn = cn.replace(patt, ' ')
            }
            $(target)[0].className = $.trim(cn)
          }
        })
      }
    }
  }]).name
