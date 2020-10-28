<template lang="pug">
    .meme__container
        h2=`All memes in waiting room`
        small="Owners of this website does not take any responsibility for this content"
        memeItem(v-for="meme in waitingRoom" :memeDetails="meme" :key="meme.id")
        no-ssr
            infinite-loading(@infinite="infiniteScroll")
</template>

<script>
import memeItem from "../../layouts/components/mixins/meme-item"
export default {
    head: {
        meta: [
            {name:'robots', content: 'noindex, nofollow'},
        ]
    },
    data () {
        return {
            waitingRoom: [],
            page: 1,
        }
    },
    components:{
        memeItem: memeItem,
    },
    async mounted () {
         await this.$axios
            .get(`/api/meme/waiting`)
            .then(async ({data}) => {
                var memes = data.data;
                memes.forEach(meme => this.waitingRoom.push(meme))
            })
            .catch(() => {
                this.$nuxt.error({ statusCode: 404, message: 'No memes found!'})
            })
    },
    methods: {
        infiniteScroll($state){
            this.$axios({
                url:'/api/meme/load/waiting',
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
                    memes.forEach((meme) => { this.waitingRoom.push(meme) })
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
    h2{margin-bottom:0px; padding-bottom:0px;}
    small{margin:0px; padding:0px;}
</style>
