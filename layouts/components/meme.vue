<template lang="pug">
    .meme__container
            memeItem(v-for="post in memes" :memeDetails="post" :key="post.id")
            //InfiniteLoading(@infinite="infiniteHandler")
</template>

<script>
import axios from 'axios'
import memeItem from './mixins/meme-item.vue'
//import InfiniteLoading from 'vue-infinite-loading';
import qs from 'qs';

export default {
    data: () => {
        return {
            memes: [],
            page: 2
        }
    },
    mounted () {
        axios
            .post('http://localhost:3000/meme')
            .then( ({data}) => {
                data.forEach(meme => (this.memes.push(meme)))
            })
    },
    components:{
        memeItem: memeItem,
        //InfiniteLoading: InfiniteLoading
    },
    methods: {
        infiniteHandler($state) {
            axios({
                method: 'post',
                url: '/meme/load',
                headers: {'page': this.page, 
                         'loadElements': 5}
                }).then(({ data }) => {
                    if (data.length) {
                        this.page += 1;
                        data.forEach(meme => (this.memes.push(meme)))
                        $state.loaded();
                    } else {
                        $state.complete();
                    }
                });
        }
    }
}
</script>

<style>

</style>
