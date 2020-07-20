<template lang="pug">
    form
        div(v-if="currentFile" class="progress") {{ progress }}
        input(type="file" ref="file" @change="selectFile")
        button(class="btn btn-success" :disabled="!selectedFiles" @click.prevent="upload")="Upload"
        p {{ message }}
</template>

<script>
import UploadService from "../../../plugins/uploadService";

export default {
    name: "upload-files",
    data() {
    return {
        selectedFiles: undefined,
        currentFile: undefined,
        progress: 0,
        message: "",

        fileInfos: []
    };
    },
    methods: {
        selectFile(e) {
            this.selectedFiles = e.target.files[0];
            return this.selectedFiles;
        },
        upload() {
            this.progress = 0;
            this.currentFile = this.selectedFiles;

            UploadService.upload(this.currentFile, event => {
                this.progress = Math.round((100 * event.loaded) / event.total);
            })
            .then(response => {
                this.message = response.data.message;
            })
            .catch((e) => {
                console.log('error '+e)
                this.progress = 0;
                this.message = "Could not upload the file!";
                this.currentFile = undefined;
            });

            this.selectedFiles = undefined;
        }
    }
    };
</script>
