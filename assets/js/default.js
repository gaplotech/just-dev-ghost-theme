// Parse the URL parameter
function getParameterByName(name, url) {
  if (!url) url = window.location.href
  name = name.replace(/[[]]/g, '\\$&')
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`)
  const results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

// Give the parameter a variable name
const action = getParameterByName('action')

$(document).ready(() => {
  if (action === 'subscribe') {
    $('body').addClass('subscribe-success')
  }

  $('.subscribe-success-message .subscribe-close').click(() => {
    $('.subscribe-success-message').addClass('close')
  })

  // Reset form on opening subscrion overlay
  $('.subscribe-button').click(() => {
    $('.subscribe-overlay form').removeClass()
    $('.subscribe-email').val('')
  })

  $('.nav-more-btn').click(() => {
    const content = $('.full-site-nav-content')
    if (content.hasClass('active')) {
      content.removeClass('active')
    } else {
      $(document).one('mouseup', () => {
        requestAnimationFrame(() => {
          $('.full-site-nav-content').removeClass('active')
        })
      })
      content.addClass('active')
    }
  })
})
