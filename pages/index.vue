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
    infiniteScroll(){
      console.log('yay')
    }
}}
</script>

<style>
h1 {
  font-size: 40px;
}

p {
  font-size: 20px;
}
</style>
