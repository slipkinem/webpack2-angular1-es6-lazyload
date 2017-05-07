import angular from 'angular'
export default angular.module('uiNav', [])
  .directive('uiNav', [() => {
    return {
      restrict: 'AC',
      link: function (scope, el) {
        let _window = $(window)
        let _mb = 768
        let wrap = $('.app-aside')
        let next
        let backdrop = '.dropdown-backdrop'
        // unfolded
        el.on('click', 'a', function (e) {
          next && next.trigger('mouseleave.nav')
          let _this = $(this)
          _this.parent().siblings('.active').toggleClass('active')
          _this.next().is('ul') && _this.parent().toggleClass('active') && e.preventDefault()
          // mobile
          _this.next().is('ul') || ((_window.width() < _mb) && $('.app-aside').removeClass('show off-screen'))
        })

        // folded & fixed
        el.on('mouseenter', 'a', function (e) {
          next && next.trigger('mouseleave.nav')
          $('> .nav', wrap).remove()
          if (!$('.app-aside-fixed.app-aside-folded').length || (_window.width() < _mb) || $('.app-aside-dock').length) return
          let _this = $(e.target)
          let top
          let wh = $(window).height()
          let offset = 50
          let min = 150

          !_this.is('a') && (_this = _this.closest('a'))
          if (_this.next().is('ul')) {
            next = _this.next()
          } else {
            return
          }

          _this.parent().addClass('active')
          top = _this.parent().position().top + offset
          next.css('top', top)
          if (top + next.height() > wh) {
            next.css('bottom', 0)
          }
          if (top + min > wh) {
            next.css('bottom', wh - top - offset).css('top', 'auto')
          }
          next.appendTo(wrap)

          next.on('mouseleave.nav', function () {
            $(backdrop).remove()
            next.appendTo(_this.parent())
            next.off('mouseleave.nav').css('top', 'auto').css('bottom', 'auto')
            _this.parent().removeClass('active')
          })

          $('.smart').length && $('<div class="dropdown-backdrop"/>').insertAfter('.app-aside')
            .on('click', function (next) {
              next && next.trigger('mouseleave.nav')
            })
        })

        wrap.on('mouseleave', function () {
          next && next.trigger('mouseleave.nav')
          $('> .nav', wrap).remove()
        })
      }
    }
  }]).name
