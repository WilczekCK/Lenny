<template lang="pug">
    .meme__uploader__form
        h3="Please select your new avatar and upload it!"
        input(type="text" name="fb_id" :value="fb_id" style="display:none")
</template>

<script>
export default {
    props: ['fb_id'],
}
</script>

<style>
    h3{
        padding:0px 10px;
    }
</style>