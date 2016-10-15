import $ from 'jquery'

function setLandingOpacity() {
    var opacity = 1 - $(window).scrollTop() / $(window).height()
    $('.js-landing').css({opacity: opacity})
}

$(window).on('scroll', setLandingOpacity)
setLandingOpacity()
