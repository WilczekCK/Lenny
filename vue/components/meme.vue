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
            .post('http://localhost:3000/meme')
            .then(response => (this.memes = response))
    },
    components:{
        memeItem: memeItem
    }
}
</script>

<style>

</style>
