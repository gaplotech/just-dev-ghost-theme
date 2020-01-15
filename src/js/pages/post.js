document.addEventListener('DOMContentLoaded', () => {
  // FitVids - start
  const $postContent = $('.post-full-content')
  $postContent.fitVids()
  // FitVids - end

  // Hover on avatar
  let hoverTimeout
  $('.author-list-item').hover(
    function() {
      clearTimeout(hoverTimeout)

      $('.author-card').removeClass('hovered')
      $(this)
        .children('.author-card')
        .addClass('hovered')
    },
    function() {
      const $this = $(this)

      hoverTimeout = setTimeout(() => {
        $this.children('.author-card').removeClass('hovered')
      }, 800)
    }
  )
})
