<template lang="pug">
    transition(name="modal" v-if="this.modalState")
        .modal__mask()
            .modal__mask__wrapper
                .modal__mask__wrapper__container
                    .modal__mask__wrapper__container--header
                        h2="Add your meme!"
                        p="What type of meme is it?"
                        input(type="radio" id="image" value="Image" v-model="memeType")
                        label(for="image")="Image"
                        input(type="radio" id="video" value="Video" v-model="memeType")
                        label(for="video")="Video"
                    .modal__mask__wrapper__container--body
                        form(v-if="memeType == 'Video'")
                            h2="TBD"
                        form(v-if="memeType == 'Image'" @submit.prevent="checkForm")
                            input(type="file" name="file" id="file")
                        input(type="text" name="title" placeholder="Title of video")
                        input(type="text" name="description" placeholder="Description")
                        input(type="text" name="tags" placeholder="Tags")
                        button="Upload"
                    .modal__mask__wrapper__container--footer
                        button(class="modal-default-button" @click="changeState()")
                            ="CLOSE"
</template>

<script>
import axios from 'axios'

export default {
    data: function(){
        return{
            memeTitle: null,
            memeDesc: null,
            memeTags: null,
            memeType: null,
            modalState: this.$store.state.addMemeModal
        }
    },
    watch: {
        storeModalState: function(newVal, oldVal){
            this.modalState = newVal;
        }
    },
    computed: {
        storeModalState: function(){
            return this.$store.state.addMemeModal;
        }
    },
    methods:{
        changeState: function(){
            this.$store.commit('addMemeModalTrigger');
            this.modalState = this.$store.state.addMemeModal;
        },
        checkForm: async function(){
            await axios({
                method: 'post',
                headers: {
                    'Content-Type': 'multipart/form-data"',
                    'memeTitle': this.memeTitle,
                    'memeDesc': this.memeDesc,
                    'memeTags': this.memeTags,
                },
                url: `/api/meme/add-image`,
            }).then(({data}) => {
                
            })
        },
    },

}
</script>

<style>

</style>