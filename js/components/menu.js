import $ from 'jquery'

$('.js-menu__item').on('click', function(e) {
    $('.menu__items').removeClass('menu__items--open')
    var target = $(this).find('a').attr('href').match(/#.*/).pop()
    console.log(target)
    if ($(target).length) {
      e.preventDefault()
      $("html, body").animate({ scrollTop: $(target).offset().top}, 1000)
    }
})

$('.js-menu-button').on('click', () => {
    $('.menu__items').toggleClass('menu__items--open')
})

let search = () => {
  let url = '/search/node?keys=' + encodeURIComponent($('.menu__search-input').val()) + '&f[0]=type%3Aarticle'
  window.location = url
}

$('.js-search__button').on('click', (e) => {
  e.stopPropagation()
  if ($('.menu__search-input').hasClass('menu__search-input--hidden')) {
    $('.menu__search-input').removeClass('menu__search-input--hidden').focus()
  }
  else {
    search()
  }
})

$(document).on('click', () => {
  $('.menu__search-input').addClass('menu__search-input--hidden')
  $('.menu__search-input').val('')
})

$('.js-search__input')
.on('keypress', (e) => {
  if (e.keyCode == 13) {
    search()
  }
}).on('click', (e) => {
  e.stopPropagation()
})
