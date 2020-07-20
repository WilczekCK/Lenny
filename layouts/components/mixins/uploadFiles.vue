<template lang="pug">
    form
        div(v-if="currentFile" class="progress") {{ progress }}
        input(type="file" ref="file" @change="selectFile")
        button(class="btn btn-success" :disabled="!selectedFiles" @click.prevent="upload")="Upload"
        p {{ message }}
        img(v-if="base64image" :src="base64image")
</template>

<script>
import UploadService from "../../../plugins/uploadService";

export default {
    name: "upload-files",
    data() {
    return {
        selectedFiles: undefined,
        currentFile: undefined,
        base64image: undefined,
        progress: 0,
        message: "",

        fileInfos: []
    };
    },
    methods: {
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

            UploadService.upload(this.currentFile, event => {
                this.progress = Math.round((100 * event.loaded) / event.total);
                this.base64decod = reader.readAsText(this.currentFile)
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
        }
    }
    };
</script>
