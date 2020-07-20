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
                        //form(v-if="memeType == 'Video'")
                        //    h2="TBD" v-if="memeType == 'Image'"
                        uploadInput
                        form(@submit.prevent="checkForm()")
                            input(type="text" v-model="memeTitle" name="title" value="XD" placeholder="Title of video")
                            input(type="text" v-model="memeDesc" name="description" value="lol" placeholder="Description")
                            input(type="text" v-model="memeTags" name="tags" value='lol2' placeholder="Tags")
                            button()="Upload"
                    .modal__mask__wrapper__container--footer
                        button(class="modal-default-button" @click="changeState()")
                            ="CLOSE"
</template>

<script>
import axios from 'axios'
import uploadInput from '../mixins/uploadFiles.vue';
export default {
    components: {
        uploadInput
    },
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
            var params3 = {
                memeTitle: this.memeTitle,
                memeDesc: this.memeDesc,
                memeTags: this.memeTags,
                memeImage: this.memeImage
            }

            await this.$axios.$post('/api/meme/addimage', {
                data: params3,
            }).then(({data}) => {
                console.log(data)
            })
        },
    },

}
</script>

<style>

</style>