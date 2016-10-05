import $ from 'jquery'

function setBackgroundColor() {
    var hue = $(window).scrollTop() / $(window).height() * 60
    $('body').css({'background-color': 'hsl(' + hue + ', 100%, 90%)'})
}

$(window).on('scroll', () => {
    // change color at a rate of 60% Hue per window scroll.
    setBackgroundColor()
})
setBackgroundColor()
