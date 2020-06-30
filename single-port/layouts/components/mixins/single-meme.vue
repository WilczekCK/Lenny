<template lang="pug"> 
    .meme__item(v-if="dataReady")
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
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
    data: () => {
        return {
            dataReady: false,
            memeDetails: null
        }
    },
    async mounted () {
            await axios
                .get(`/api/meme/${this.$route.params.id}`)
                .then(({data}) => {this.memeDetails = data.data[0]})

            this.dataReady = true;
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