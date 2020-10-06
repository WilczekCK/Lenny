<template lang="pug">
    .tbm__container
        h4="Today best meme:"
        .tbm__container__content(v-if="isPageLoaded")
        .lol(v-else)="Loading..."
</template>

<script>
import axios from 'axios';
export default {
  data: function() {
    return{
        isPageLoaded:false,
    }
  },
  mounted: async function () {
    this.todayBestMeme = this.getTodayBestMeme();
    this.isPageLoaded = true;
  },    
  methods: {
    getTodayBestMeme: async function () {
        await axios({
            url: '/api/meme/tbm',
            method: 'GET'
        }).then(({data}) => {
            console.log(data)
        })
    }
  }
}
</script>
