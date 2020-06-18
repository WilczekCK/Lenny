<template lang="pug">
    .meme__container
            memeItem(v-for="post in memes.data" :memeDetails="post" :key="post.id")
</template>

<script>
import axios from 'axios'
import memeItem from './mixins/meme-item.vue'

export default {
    data: () => {
        return {
            memes: null
        }
    },
    mounted () {
        axios
            .get('http://localhost:3000/')
            .then(response => (this.memes = response))
    },
    components:{
        memeItem
    }
}
</script>

<style>

</style>
