<template lang="pug">
    .meme__uploader__form(v-if="!isLimitUploadedCrossed")
        h3="Please fill all of the fields below and upload a meme"
        
        div
            input(type="radio" v-model="memeType" id="memeType-video" value="video" @change="$emit('inputChanged', {paramToChange: 'memeType', value: 'video'}), refreshInputs()")
            label(style="display:block" for="memeType-video")="Video"

            input(type="radio" v-model="memeType" id="memeType-image" value="image" @change="$emit('inputChanged', {paramToChange: 'memeType', value: 'image'}), refreshInputs()")
            label(style="display:block" for="memeType-image")="Image"

        label(for="memeTitle")='Provide the title of the meme'
        input(type="text" v-model="memeTitle" id="memeTitle" placeholder="Title of your meme" @change="$emit('inputChanged', {paramToChange: 'memeTitle', value: memeTitle})")
        
        label(for="memeDesc")='Provide the ID of video of the meme'
        input(type="text" v-if="memeType == 'video'" v-model="memeVideo" id="memeVideo"  placeholder="ID of youtube video" @change="$emit('inputChanged', {paramToChange: 'memeVideo', value: memeVideo})")

        label(for="memeTags")='Provide tags of the meme'
        input(type="text" v-model="memeTags" id="memeTags" placeholder="Tags which are related to your meme" @change="$emit('inputChanged', {paramToChange: 'memeTags', value: memeTags})")
    .meme__uploader__form(v-else)
        h3="You crossed the limit of uploaded memes!"
        span="Please wait till moderator will judge your other memes in waiting room"
</template>

<script>
export default {
    name:'memeForm',
    props: [
        'userId'
    ],
    data (){
        return {
            memeTitle: undefined,
            memeTags: undefined,
            memeVideo: undefined,
            memeType: undefined,
            isLimitUploadedCrossed: false,
        }
    },
    async mounted() {
        //Prevent spam of memes - limit at the same time set to 5! (also set in query!!)
        const amountWaitingMemes = await this.checkMemesInWaitingRoom(this.$axios);
        this.isLimitUploadedCrossed = true ? amountWaitingMemes >= 5 : false;
    },
    methods:{
        refreshInputs () {
            this.$emit('inputChanged', {paramToChange: 'memeTitle', value: ''})
            this.$emit('inputChanged', {paramToChange: 'memeTags', value: ''})
            this.$emit('inputChanged', {paramToChange: 'memeVideo', value: ''})
            this.memeTitle = ''
            this.memeVideo = ''
            this.memeTags = ''
        },
        checkMemesInWaitingRoom: async (axios) => {
                const memesWaiting = await axios({
                    url: `/api/meme/load/user/allWaiting`,
                    body:{
                        userid: this.userId
                    }
                })
                .then( ({data}) => {
                    return data;
                })
                
            return memesWaiting.data.length;
        }
    }
}
</script>

<style>

</style>