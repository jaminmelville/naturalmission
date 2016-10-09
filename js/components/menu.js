import $ from 'jquery'

$(document).ready(() => {
    $('.js-menu__item').on('click', function() {
        $('.menu__items').removeClass('menu__items--open')
        var target = $(this).data('scroll-target')
        console.log(target)
        $("html, body").animate({ scrollTop: $('#' + target).offset().top}, 1000)
    })

    $('.js-menu-button').on('click', () => {
        $('.menu__items').toggleClass('menu__items--open')
    })
})
