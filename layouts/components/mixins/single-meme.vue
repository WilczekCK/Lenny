<template lang="pug">
.meme__container(v-if="isPageLoaded")
    .meme__item
        .meme__item__header
            .meme__item__header__meta 
                span {{memeDetails.author_username}}
                span {{moment(memeDetails.added_in)}}
            .meme__item__header__title
                h1 {{memeDetails.meme_title}}   
        iframe(v-if="memeDetails.video_id" :src="'http://www.youtube.com/embed/'+memeDetails.video_id+'?controls=0&modestbranding=1'" frameborder="0")
        img(v-else :src='"~/assets/img/uploads/"+memeDetails.id+".jpg"')
        .meme__item__footer
            .meme__item__footer__tags
                h6(v-for="tag in memeDetails.tagsDivider" :hashtag="tag") {{tag}}
            .meme__item__footer__likes
                span.pp__counter(:meme_id="memeDetails.id")
                    i(class='fab fa-pied-piper-pp')
                    .pp__amount {{memeDetails.likes}}
        .meme__item__comments
            commentComp()
.meme__container(v-else)
    h2="Wait, meme is loading..."
</template>

<script>
import comment from "./comments";

import moment from "moment";
import axios from 'axios'
export default {
    data(){
        return{
            memeDetails: null,
            memeComments: null,
            isPageLoaded: false
        }
    },
    components: {
        commentComp: comment
    },
    methods: {
        moment: function(date){
            const today = moment();
            const incomingDate = moment(date);
            return " · "+incomingDate.from(today);
        }
    },
    async mounted (error) {
        await axios
            .get(`/api/meme/${this.$route.params.id}`)
            .then(async ({data}) => {
                this.memeDetails = data.data[0];

                //load comments below
                await axios
                    .get(`/api/meme/comments/load/${this.$route.params.id}`)
                    .then(({data}) => {
                        if(data.data.length) this.memeComments = [];
                        data.data.forEach(comment => {
                            this.memeComments.push(comment)
                        }) 
                    })
                //comments loaded
            })
            .catch((error) => {
                error({statusCode: 404, message: 'Meme not found!'})
            })


        this.isPageLoaded = true;
    },
}
</script>

<style>

</style>