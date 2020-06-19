<template lang="pug">
    div
        h1="Hello App!"
        p
            router-link(to='/memes')="go to memes"
            router-link(to='/home')="go to home"
        router-view
</template>

<script>
export default {

}
</script>

<style>

</style>