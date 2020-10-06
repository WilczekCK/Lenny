<template lang="pug">
    .tbm__container
        h4="Today best meme:"
        .tbm__container__content(v-if="isPageLoaded")
        .lol(v-else)="Loading..."
</template>

<script>
export default {
  data: function() {
    return{
        isPageLoaded:false,
    }
  },
  mounted: function () {

  },
  methods: {
  }
}
</script>
