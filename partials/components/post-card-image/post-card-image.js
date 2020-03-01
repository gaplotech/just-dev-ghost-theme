import Vue from 'vue/dist/vue.min'

const PostCardImage = () =>
  document.querySelectorAll('.post-card-image').forEach(
    el =>
      new Vue({
        el,
        data: function() {
          return {
            defaultImage: '/assets/120x63.png'
          }
        },
        methods: {
          loadDefaultImage() {
            this.$el.removeAttribute('srcset')
          }
        }
      })
  )

export { PostCardImage }
