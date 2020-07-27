<template lang="pug">
    .meme__container
        memeItem(v-for="meme in memesInCat" :memeDetails="meme")
</template>

<script>
import memeItem from "../../../layouts/components/mixins/meme-item"
import axios from '~/plugins/axios'
export default {
    data () {
        return {
            memesInCat: []
        }
    },
    components:{
        memeItem
    },
    async mounted () {
         await axios
            .get(`/api/meme/cat/${this.$route.params.name}`)
            .then(async ({data}) => {
                var memes = data.data;
                memes.forEach(meme => this.memesInCat.push(meme))
            })
    }
}
</script>

<style>

</style>
