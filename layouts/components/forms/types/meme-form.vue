<template lang="pug">
    div
        input(type="text" v-model="memeTitle" placeholder="title" @change="$emit('inputChanged', {paramToChange: 'memeTitle', value: memeTitle})")
        input(type="text" v-model="memeDesc"  placeholder="desc" @change="$emit('inputChanged', {paramToChange: 'memeDesc', value: memeDesc})")
        input(type="text" v-model="memeTags" placeholder="tags" @change="$emit('inputChanged', {paramToChange: 'memeTags', value: memeTags})")
</template>

<script>
export default {
    name:'memeForm',
    data (){
        return {
            memeTitle: undefined,
            memeDesc: undefined,
            memeTags: undefined,
        }
    }
}
</script>

<style>

</style>