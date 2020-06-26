<template lang="pug">
    .meme__container
        .meme__item
            .meme__item__header
                .meme__item__header__meta 
                    span {{infoAboutMemeFromDb.author_username}}
                    span {{moment(infoAboutMemeFromDb.added_in)}}
                .meme__item__header__title
                    h1 {{infoAboutMemeFromDb.meme_title}}   
            iframe(v-if="infoAboutMemeFromDb.video_id" :src="'http://www.youtube.com/embed/'+memeDetails.video_id+'?controls=0&modestbranding=1'" frameborder="0")
            img(v-else :src="'/uploads/'+infoAboutMemeFromDb.id+'.jpg'")
            .meme__item__footer
                .meme__item__footer__tags
                    h6(v-for="tag in infoAboutMemeFromDb.tagsDivider" :hashtag="tag") {{tag}}
                .meme__item__footer__likes
                    span.pp__counter(:meme_id="infoAboutMemeFromDb.id")
                        i(class='fab fa-pied-piper-pp')
                        .pp__amount {{infoAboutMemeFromDb.likes}}
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
    data: () => {
        return {
            actualVisibleMemeID: null,
            infoAboutMemeFromDb: null,
        }
    },
    mounted () {
        this.actualVisibleMemeID = parseInt(this.$route.params.id);
        
        axios
            .post(`/meme/single/${this.actualVisibleMemeID}`)
            .then( ({data}) => {this.infoAboutMemeFromDb = data[0]})
    },
    methods: {
        moment: function(date){
            const today = moment();
            const incomingDate = moment(date);
            return " · "+incomingDate.from(today);
        }
    }
}
</script>

<style>

</style>