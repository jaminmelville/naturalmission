import $ from 'jquery'

$('.js-contact-option').on('click', (e) => {
    $('.contact__option').removeClass('contact__option--selected')
    $(e.currentTarget).addClass('contact__option--selected')

    let target = $(e.currentTarget).data('target')
    $('.contact__value').removeClass('contact__value--selected')
    $('.contact__value[data-contact-option="' + target + '"]').addClass('contact__value--selected')
})
