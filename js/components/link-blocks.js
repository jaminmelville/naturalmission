import $ from 'jquery'

let activationTime = 0

$(document).on('click', () => {
    $('.js-link-block').removeClass('link-blocks--active')
})

$('.js-link-block').on('click', (e) => {
    e.stopPropagation()
    $('.js-link-block').removeClass('link-blocks--active')
    $(e.currentTarget).addClass('link-blocks--active')
    activationTime = new Date().getTime()
})

$('.js-link-block').on('mouseover', (e) => {
    $('.js-link-block').removeClass('link-blocks--active')
    $(e.currentTarget).addClass('link-blocks--active')
    activationTime = new Date().getTime()
})

$('.js-link-block').on('mouseout', () => {
    $('.js-link-block').removeClass('link-blocks--active')
})

$('.js-link-block__link').on('click', (e) => {
  e.stopPropagation()
  let tooSoon = new Date().getTime() - activationTime < 200
  if (tooSoon) {
    e.preventDefault()
  }
})
