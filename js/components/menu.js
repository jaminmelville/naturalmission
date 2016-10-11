import $ from 'jquery'

$(document).ready(() => {
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
})
