<template lang="pug">
.meme__container(v-if="isPageLoaded")
    .meme__item
        .meme__item__header
            .meme__item__header__meta 
                span
                    admin-tools(:whereUsed="'meme'" :info="memeDetails")
                span
                    nuxt-link(:to="'/users/'+memeDetails.author_id") {{memeDetails.author_username}}
                span {{moment(memeDetails.added_in)}}
            .meme__item__header__title
                h1 {{memeDetails.meme_title}}
        nuxt-link( :to="'/meme/'+memeDetails.id")
            iframe(v-if="memeDetails.video_id" :src="'http://www.youtube.com/embed/'+memeDetails.video_id+'?controls=0&modestbranding=1'" frameborder="0")
            img(v-else :src='checkImage(memeDetails.id)')
        .meme__item__footer
            .meme__item__footer__tags
                h6(v-for="tag in memeDetails.tagsDivider" :hashtag="tag") 
                    nuxt-link(:to="'/meme/cat/'+tag") {{tag}}
            .meme__item__footer__stats
                .meme__item__footer__likes(@click="giveLikeToMeme(memeDetails.id)")
                    span.pp__counter(:meme_id="memeDetails.id")
                        i(class='fa fa-thumbs-up')
                        .pp__amount {{this.likes}}
        .meme__item__comments
            commentComp()
.meme__container(v-else)
    h2="Wait, meme is loading..."
</template>

<script>
import comment from "./comments";
import admintools from './admin-tools.vue';
import moment from "moment";
export default {
    data(){
        return{
            memeDetails: null,
            memeComments: null,
            isPageLoaded: false,
            likes: null
        }
    },
    components: {
        commentComp: comment,
        'admin-tools':admintools,
    },
    methods: {
        checkImage: function(id){
            try{
                return require(`~/assets/img/uploads/${id}.jpg`);
            }catch(err){
                //create a mockup for remobved images!
                return require(`~/assets/img/avatars/default.jpg`);
            }
        },
        moment: function(date){
            const today = moment();
            const incomingDate = moment(date);
            return " · "+incomingDate.from(today);
        },
        giveLikeToMeme: async function(meme_id){
            if(!this.$store.state.isLogged) return this.$toast.error('You have to be logged to like memes!')
            await this.$axios({
                url:`/api/meme/like/${meme_id}`,
                method:'PATCH'
            }).then(({data}) => {
                if(data.data){return this.$toast.error('You already gave a like!')} 
                else this.likes++;
            })
        }
    },
    async mounted () {
        await this.$axios
            .get(`/api/meme/${this.$route.params.id}`)
            .then(async ({data}) => {
                this.memeDetails = data.data[0];
                this.likes = this.memeDetails.likes
                //load comments below
                await this.$axios
                    .get(`/api/meme/comments/load/${this.$route.params.id}`)
                    .then(({data}) => {
                        if(data.data.length) this.memeComments = [];
                        data.data.forEach(comment => {
                            this.memeComments.push(comment)
                        }) 
                    })
                //comments loaded
            })
            .catch(() => {
                this.$nuxt.error({ statusCode: 404, message: 'No meme found!'})
            })


        this.isPageLoaded = true;
    },
}
</script>

<style>

</style>