import $ from 'jquery'

$(document).on('click', () => {
    $('.js-link-block').removeClass('link-blocks--active')
})

$('.js-link-block').on('click', (e) => {
    e.stopPropagation()
    $('.js-link-block').removeClass('link-blocks--active')
    $(e.currentTarget).addClass('link-blocks--active')
})

$('.js-link-block').on('mouseover', (e) => {
    $('.js-link-block').removeClass('link-blocks--active')
    $(e.currentTarget).addClass('link-blocks--active')
})

$('.js-link-block').on('mouseout', (e) => {
    $('.js-link-block').removeClass('link-blocks--active')
})
