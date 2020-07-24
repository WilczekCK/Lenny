<template lang="pug">
    .meme__uploader__form
        h3="Please fill all of the fields below and upload an image"

        label(for="memeTitle")='Provide the title of the meme'
        input(type="text" v-model="memeTitle" id="memeTitle" placeholder="Title of your meme" @change="$emit('inputChanged', {paramToChange: 'memeTitle', value: memeTitle})")
        
        label(for="memeDesc")='Provide the description of the meme'
        input(type="text" v-model="memeDesc" id="memeDesc"  placeholder="Description of your meme" @change="$emit('inputChanged', {paramToChange: 'memeDesc', value: memeDesc})")

        label(for="memeTags")='Provide tags of the meme'
        input(type="text" v-model="memeTags" id="memeTags" placeholder="Tags which are related to your meme" @change="$emit('inputChanged', {paramToChange: 'memeTags', value: memeTags})")
</template>

<script>
export default {
    name:'memeForm',
    data (){
        return {
            memeTitle: undefined,
            memeDesc: undefined,
            memeTags: undefined,
        }
    }
}
</script>

<style>

</style>