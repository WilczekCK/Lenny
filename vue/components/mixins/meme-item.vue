<template lang="pug">
    .meme__item
        iframe(v-if="memeDetails.video_id" :src="'http://www.youtube.com/embed/'+memeDetails.video_id+'}?controls=0&modestbranding=1'" frameborder="0")
        img(v-else :src="'/uploads/'+memeDetails.id+'.jpg'")
        .details
            span.pp__counter(:meme_id="memeDetails.id")
                i(class='fab fa-pied-piper-pp')
                .pp__amount {{memeDetails.likes}}
            span.title {{memeDetails.meme_title}}
            span.info {{memeDetails.author_username}}
        
</template>

<script>
export default {
    props: ['memeDetails']
}
</script>

<style>

</style>