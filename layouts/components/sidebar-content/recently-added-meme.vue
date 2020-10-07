<template lang="pug">
    .ram__container
        h4="Recently added meme:"
        .ram__container__content(v-if="isPageLoaded")
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
        url: '/api/meme/recent',
        method: 'GET'
    }).then(({data}) => {
        this.recentlyAddedMeme = data.data[0];
        this.isPageLoaded = true;
    })
}
}
</script>
