<template lang="pug">
    .meme__container
        h2=`All memes in "{{route}}" category`
        memeItem(v-for="meme in memesInCat" :memeDetails="meme" :key="meme.id")
        no-ssr
            infinite-loading(@infinite="infiniteScroll")
</template>

<script>
import memeItem from "../../../layouts/components/mixins/meme-item"
import axios from '~/plugins/axios'
export default {
    data () {
        return {
            memesInCat: [],
            page: 1,
            route: undefined
        }
    },
    components:{
        memeItem
    },
    async mounted () {
         this.route = this.$route.params.name;
         await axios
            .get(`/api/meme/cat/${this.route}`)
            .then(async ({data}) => {
                if(data.data.length == 0) return this.$nuxt.error({ statusCode: 404, message: 'No memes with that category found!'})
                var memes = data.data;
                memes.forEach(meme => this.memesInCat.push(meme))
            })
            .catch(() => {
                this.$nuxt.error({ statusCode: 404, message: 'No memes with that category found!'})
            })
    },
    methods: {
        infiniteScroll($state){
            axios({
                url:'/api/meme/load/cat',
                method:'GET',
                headers:{
                    "page": this.page,
                    "loadElements":5,
                    "category": this.$route.params.name
                }
            })
            .then( ( {data} ) => {
                if(data.data.length){
                    this.page += 1;

                    let memes = data.data;
                    memes.forEach((meme) => { this.memesInCat.push(meme) })
                    $state.loaded();
                }else{
                    $state.complete()
                }
            })
        }
    }
}
</script>

<style>

</style>
