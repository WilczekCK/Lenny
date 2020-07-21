<template lang="pug">
    button="Upload via forms sender"
</template>

<script>
export default {
    name: 'formSender',
    props: ['imageForm', 'textForm'],
    data() {
        return{
            imageDetails: this.imageForm,
            textDetails: this.textForm,
        }
    },
    watch: {
        imageDetails: function(){
            console.log(this.imageDetails)
        },
        textDetails: function(){
            console.log(this.textDetails)
        }
    }
}
</script>

<style>

</style>