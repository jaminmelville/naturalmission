import $ from 'jquery'

let initialColor = 300

function setBackgroundColor() {
    var hue = (initialColor + $(window).scrollTop() / $(window).height() * 60) % 360
    $('.js-background').css({'background-color': 'hsl(' + hue + ', 100%, 95%)'})
}

$(window).on('scroll', setBackgroundColor)
setBackgroundColor()
