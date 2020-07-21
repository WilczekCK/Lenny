<template lang="pug">
    form(@submit.prevent="sendForm")
        memeForm(v-on:inputChanged="setValueFromExternalForm")
        div(v-if="currentFile" class="progress") {{ progress }}
        input(type="file" ref="file" @change="selectFile")
        button(class="btn btn-success" :disabled="!selectedFiles" @click.prevent="upload")="Upload"
        p {{ message }}    
        img(v-if="base64image" :src="base64image" style="width:100%;")
</template>

<script>
import axios from 'axios';
//import avatarForm from "./types/avatar-form.vue"
import memeForm from "./types/meme-form.vue"

export default {
    name: "upload-files",
    components:{memeForm},
    props: ["typeOfForm"],
    data() {
        return {
            selectedFiles: undefined,
            currentFile: undefined,
            base64image: undefined,
            progress: 0,
            message: "",
            formType: this.typeOfForm,

            //for type meme
            memeTitle: undefined,
            memeDesc: undefined,
            memeTags: undefined,

            //for type avatar
            authorTitle: undefined,
            authorAvatar: undefined,
        };
    },
    methods: {
        uploadToServer (file, onUploadProgress) {
            let formData = new FormData();
            formData.append("file", file);

            return axios.post("/api/meme/uploadImage", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "title": this.memeTitle,
                    "desc": this.memeDesc,
                    "tags": this.memeTags
                },
                onUploadProgress
            })
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
