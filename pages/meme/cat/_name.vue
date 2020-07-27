<template lang="pug">
    p='xD'
</template>

<script>
import memeItem from "../../../layouts/components/mixins/meme-item"
import axios from '~/plugins/axios'
export default {
    components:{
        memeItem
    },
    async mounted () {
         await axios
            .get(`/api/meme/cat/${this.$route.params.name}`)
            .then(async ({data}) => {
                console.log(data)
            })
    }
}
</script>

<style>

</style>
