<template lang="pug">
    .meme__item
        .meme__item__header
            .meme__item__header__meta 
                span {{memeDetails.author_username}}
                span {{moment(memeDetails.added_in)}}
            .meme__item__header__title
                h1 {{memeDetails.meme_title}}
        nuxt-link( :to="'/meme/'+memeDetails.id")
            iframe(v-if="memeDetails.video_id" :src="'http://www.youtube.com/embed/'+memeDetails.video_id+'?controls=0&modestbranding=1'" frameborder="0")
            img(v-else :src='"~/assets/img/uploads/"+memeDetails.id+".jpg"')
        .meme__item__footer
            .meme__item__footer__tags
                h6(v-for="tag in memeDetails.tagsDivider" :hashtag="tag") {{tag}}
            .meme__item__footer__stats
                .meme__item__footer__likes(@click="giveLikeToMeme(memeDetails.id)")
                    span.pp__counter(:meme_id="memeDetails.id")
                        i(class='fa fa-thumbs-up')
                        .pp__amount {{this.likes}}
                .meme__item__footer__comments
                    i(class='fa fa-comments')
                    span {{memeDetails.comments_sum}}
        .details(style="display:none")
        
</template>

<script>
import moment from 'moment';
import axios from 'axios';

export default {
    props: ['memeDetails'],
    data () {
        return{
            likes : this.memeDetails.likes
        }
    },
    methods: {
        moment: function(date){
            const today = moment();
            const incomingDate = moment(date);
            return " · "+incomingDate.from(today);
        },
        giveLikeToMeme: async function(meme_id){
            if(!this.$store.state.isLogged) return this.$toast.error('You have to be logged to like memes!')
            await axios({
                url:`/api/meme/like/${meme_id}`,
                method:'PATCH'
            }).then(({data}) => {
                if(data.data){return this.$toast.error('You already gave a like!')} //already gave like
                else this.likes++;
            })
        }
    }
}
</script>

<style>

</style>