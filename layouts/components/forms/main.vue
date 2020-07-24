<template lang="pug">
    transition
        div            
            form(@submit.prevent="sendForm")
                memeForm(v-on:inputChanged="setValueFromExternalForm" v-if="formType == 'meme'")
                avatarForm(v-if="formType == 'avatar'")
                
                .imageUploader(v-if="formType == 'meme'")
                    div(v-if="currentFile" class="progress") {{ progress }}
                    input(type="file" ref="file" @change="selectFile" style="display:none") 
                    img(v-if="base64image" :src="base64image" class="imageUploader__placeholder")
                    .imageUploader__placeholder(v-else)
                        ="Your image will be displayed here"
                        button.file__add(@click.prevent="$refs.file.click()" v-if="!selectedFiles")
                            i(class="fas fa-images")
                            ="Select an image"
            button(class="btn btn-success" @click.prevent="checkForm")
                i(class="fas fa-cloud-upload-alt")
                ="Upload"
            .form__messages
                p(v-if="message") {{ message }}
                p(v-if="errors")
                    span(v-for="error in errors") {{error}}
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

            //for type meme
            memeTitle: undefined,
            memeDesc: undefined,
            memeTags: undefined,

            //for type user
            authorNewName: undefined,

            //for type avatar
            //only file
        };
    },
    methods: {
        checkForm: function(e){
        this.errors = [];

        if(!this.memeTitle|| !this.memeDesc || !this.memeTags || !this.selectedFiles){
            this.errors.push('You are missing one of the fields!')
        }else{
            this.upload();
        }

        e.preventDefault()
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
