<template lang="pug">
    .meme__container
            memeItem
</template>

<script>
import axios from 'axios'
import singleMeme from '~/layouts/components/mixins/single-meme.vue'
//import InfiniteLoading from 'vue-infinite-loading';
import qs from 'qs';

export default {
    components:{
        memeItem: singleMeme,
    },
}
</script>

<style>

</style>
