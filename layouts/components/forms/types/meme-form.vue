<template lang="pug">
    .meme__uploader__form
        h3="Please fill all of the fields below and upload a meme"
        
        div
            input(type="radio" v-model="memeType" id="memeType" value="video" @change="$emit('inputChanged', {paramToChange: 'memeType', value: 'video'})")
            label(style="display:block" for="memeType")="Video"

            input(type="radio" v-model="memeType" id="memeType" value="image" @change="$emit('inputChanged', {paramToChange: 'memeType', value: 'image'})")
            label(style="display:block" for="memeType")="Image"

        label(for="memeTitle")='Provide the title of the meme'
        input(type="text" v-model="memeTitle" id="memeTitle" placeholder="Title of your meme" @change="$emit('inputChanged', {paramToChange: 'memeTitle', value: memeTitle})")
        
        label(for="memeDesc")='Provide the ID of video of the meme'
        input(type="text" v-if="memeType == 'video'" v-model="memeVideo" id="memeVideo"  placeholder="ID of youtube video" @change="$emit('inputChanged', {paramToChange: 'memeVideo', value: memeVideo})")

        label(for="memeTags")='Provide tags of the meme'
        input(type="text" v-model="memeTags" id="memeTags" placeholder="Tags which are related to your meme" @change="$emit('inputChanged', {paramToChange: 'memeTags', value: memeTags})")
</template>

<script>
export default {
    name:'memeForm',
    data (){
        return {
            memeTitle: undefined,
            memeTags: undefined,
            memeVideo: undefined,
            memeType: undefined,
        }
    }
}
</script>

<style>

</style>