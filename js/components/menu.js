import $ from 'jquery'

$('.js-menu__item').on('click', function(e) {
    $('.menu__items').removeClass('menu__items--open')
    var target = $(this).find('a').attr('href').match(/#.*/).pop()
    if ($(target).length) {
      e.preventDefault()
      $("html, body").animate({ scrollTop: $(target).offset().top}, 1000)
    }
})

$('.js-menu-button').on('click', () => {
    $('.menu__items').toggleClass('menu__items--open')
})

$('.js-menu__search-button').on('click', (e) => {
  let $input = $(e.currentTarget).closest('.js-search').find('.js-search__input')
  if ($input.hasClass('menu__search-input--hidden')) {
    $input.removeClass('menu__search-input--hidden').focus()
  }
})

$(document).on('click', () => {
  $('.menu__search-input').addClass('menu__search-input--hidden')
  $('.menu__search-input').val('')
})

$('.js-search').on('click', (e) => {
  e.stopPropagation()
})
