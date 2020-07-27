<template lang="pug">
  .meme__container
    memeItem(v-for="post in memes" :memeDetails="post" :key="post.id")
    no-ssr
      infinite-loading(@infinite="infiniteScroll")
</template>

<script>
import axios from '~/plugins/axios'
import memeItem from '~/layouts/components/mixins/meme-item.vue'
export default {
  head () {
    return {
      title: 'Nuxt + Koa'
    }
  },
  data: () => {
    return { 
      memes: [],
      page: 1
    }
  },
  components:{
    memeItem: memeItem
  },
  mounted() {
    axios
    .get('/api/meme')
    .then( ( {data} ) => {
      let memes = data.data;
      memes.forEach((meme) => { this.memes.push(meme) })
    })
  },
  methods: {
    infiniteScroll($state){
      axios({
        url:'/api/meme/load',
        method:'GET',
        headers:{
          "page": this.page,
          "loadElements":5
        }
      })
      .then( ( {data} ) => {
        if(data.data.length){
          this.page += 1;

          let memes = data.data;
          memes.forEach((meme) => { this.memes.push(meme) })
          $state.loaded();
        }else{
          $state.complete()
        }

      })

    }
}}
</script>

<style>
</style>
