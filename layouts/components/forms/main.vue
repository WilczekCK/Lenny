<template lang="pug">
    transition
        div            
            form(@submit.prevent="sendForm")
                memeForm(v-on:inputChanged="setValueFromExternalForm" v-if="formType == 'meme'")
                avatarForm(v-if="formType == 'avatar'")
                
                .imageUploader(v-if="formType == 'meme' && memeType == 'image'")
                    input(type="file" ref="file" @change="selectFile" style="display:none") 
                    img(v-if="base64image" :src="base64image" class="imageUploader__placeholder")
                    .imageUploader__placeholder(v-else)
                        ="Your image will be displayed here"
                        button.file__add(@click.prevent="$refs.file.click()" v-if="!selectedFiles")
                            i(class="fas fa-images")
                            ="Select an image"
                .videoUploader(v-if="formType == 'meme' && memeType == 'video'")
                    .imageUploader__placeholder()
                        span(v-if="!memeVideo")="Your video preview will be displayed here"
                        vue-friendly-iframe(v-else :src="'https://www.youtube.com/embed/'+memeVideo+'?controls=0&modestbranding=1'" @load="onLoad")
                .memePlaceholder(v-if="formType == 'meme' && !memeType")
                    .imageUploader__placeholder
                        ="Select a type of meme on the right"
            button(class="btn btn-success" @click.prevent="checkForm")
                i(class="fas fa-cloud-upload-alt")
                ="Upload"
            .form__messages 
                p(v-if="errors")
                    span(v-for="error in errors") {{error}}
                p(v-if="message")
                    span {{ message }}
</template>

<script>
import axios from 'axios';
import avatarForm from "./types/avatar-form.vue"
import memeForm from "./types/meme-form.vue"

export default {
    name: "upload-files",
    transition: {
        name: 'page',
        mode: 'out-in'
    },
    components:{memeForm, avatarForm},
    props: ["typeOfForm"],
    data() {
        return {
            selectedFiles: undefined,
            currentFile: undefined,
            base64image: undefined,
            errors: undefined,
            progress: 0,
            message: "",
            formType: this.typeOfForm,


            memeType: undefined,
            //for type meme
            memeTitle: undefined,
            memeVideo: undefined,
            memeTags: undefined,

            //for type user
            authorNewName: undefined,

            //for type avatar
            //only file
        };
    },
    methods: {
        checkForm: function(e){
        this.errorHandler();

        if(this.memeVideo){
            //video meme
            this.uploadVideo();
        }else if(this.selectedFiles){
            //image meme
            this.upload();
        }else{
            this.errors.push('You are missing one of the fields!')
        }

        e.preventDefault()
        },
        errorHandler: function(){
            this.errors = [];
            if(!this.memeTitle || !this.memeTags){
                this.errors.push('You are missing one of the fields!')
            } 
        },
        uploadVideo(){
            return axios.post('/api/meme/uploadVideo', {
                body:{
                    title: this.memeTitle,
                    videoid: this.memeVideo,
                    tags: this.memeTags
                },
            })
        },
        uploadToServer (file, onUploadProgress) {
            let formData = new FormData();
            formData.append("file", file);

            var {url, headers} = this.prepareDataFromFormType()

            return axios.post(url, formData, {
                headers,
                onUploadProgress
            })
        },
        prepareDataFromFormType(){
            let dataToSet = {};
            switch(this.formType) {
                case 'meme':
                    dataToSet.url = '/api/meme/uploadImage'
                    dataToSet.headers = {
                        "Content-Type": "multipart/form-data",
                        "title": this.memeTitle,
                        "desc": this.memeDesc,
                        "tags": this.memeTags
                    }
                    break;
                case 'avatar':
                    dataToSet.url = '/api/user/tbc-a'
                    break;
                case 'username':
                    dataToSet.url = '/api/user/tbc-t'
                    dataToSet.headers = {
                        newUsername: this.authorNewName
                    }
                    break;
            }

            return dataToSet;
        },
        selectFile(e) {
            this.selectedFiles = e.target.files[0];
            this.createBase64Image(this.selectedFiles)
            return this.selectedFiles;
        },
        createBase64Image(fileObject){
            const reader = new FileReader();

            reader.onload = (e) => {
                this.base64image = e.target.result;
            }

            reader.readAsDataURL(fileObject)
        },
        upload() {
            this.progress = 0;
            this.currentFile = this.selectedFiles;

            this.uploadToServer(this.currentFile, event => {
                this.progress = Math.round((100 * event.loaded) / event.total);
            })
            .then(response => {
                this.message = response.data.message;
            })
            .catch((e) => {
                this.progress = 0;
                this.message = "Could not upload the file!";
                this.currentFile = undefined;
            });

            this.selectedFiles = undefined;
        },
        setValueFromExternalForm({paramToChange, value}){
            this[paramToChange] = value;
        }
    }
    };
</script>
