<template lang="pug">
    .sidebar()
      .sidebar__wrapper
        today_best_meme
        recently_added_meme
</template>

<script>
import today_best_meme from './sidebar-content/today-best-meme.vue'
import recently_added_meme from './sidebar-content/recently-added-meme.vue'
export default {
  components: {
    today_best_meme,
    recently_added_meme
  },
  mounted: function () {
  },
  methods: {
  }
}
</script>
