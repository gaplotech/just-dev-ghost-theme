<template>
  <div></div>
</template>

<script>
export default {
  name: 'tg-comment-widget',
  props: ['tgCommentSiteId'],
  mounted() {
    let tg = document.createElement('script')
    tg.async = true
    tg.defer = true
    tg.setAttribute('src', 'https://comments.app/js/widget.js?2')
    tg.setAttribute('data-comments-app-website', this.tgCommentSiteId)
    tg.setAttribute('data-limit', '10')
    this.$el.appendChild(tg)
  }
}
</script>

<style scoped></style>
