import $ from 'jquery'

let randomness = Math.random() * 360

function setBackgroundColor() {
    var hue = (randomness + $(window).scrollTop() / $(window).height() * 60) % 360
    $('.js-background').css({'background-color': 'hsl(' + hue + ', 100%, 90%)'})
}

$(window).on('scroll', () => {
    // change color at a rate of 60% Hue per window scroll.
    setBackgroundColor()
})
setBackgroundColor()
