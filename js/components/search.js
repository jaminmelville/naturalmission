import $ from 'jquery'

// @TODO: DRY.
let search = (term) => {
  let url = '/search/node?keys=' + encodeURIComponent(term)
  window.location = url
}

$('.js-search__input').on('keypress', (e) => {
  if (e.keyCode === 13) {
    search($(e.currentTarget).val())
  }
})

$('.js-search__button').on('click', (e) => {
  let $input = $(e.currentTarget).closest('.js-search').find('.js-search__input')
  if ($input.val()) {
    search($input.val())
  }
})
