<template lang="pug">
    div
        div(v-for="post in memes.data")
            p {{post.meme_title}}
</template>

<script>
import axios from 'axios'
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
    }
}
</script>

<style>

</style>