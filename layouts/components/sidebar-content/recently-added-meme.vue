<template lang="pug">
    .tbm__container
        h4="Today best meme:"
        .tbm__container__content(v-if="isPageLoaded")
            .meme__container(v-if="recentlyAddedMeme")
                memeItem(:memeDetails="recentlyAddedMeme")
            p(v-else)="There is no memes on that website!"
        p(v-else)="Loading..."
</template>

<script>
import axios from 'axios';
import memeItem from '../mixins/meme-item.vue';
export default {
  components: {
      memeItem
  },
  data: function() {
    return{
        isPageLoaded:false,
        recentlyAddedMeme: undefined,
    }
  },
  async mounted() {
    await axios({
        url: '/api/meme/ram',
        method: 'GET'
    }).then(({data}) => {
        this.todayBestMeme = data.data[0];
        this.isPageLoaded = true;
    })
}
}
</script>
