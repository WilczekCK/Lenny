<template lang="pug">
    div
        h1="Hello App!"
        p
            router-link(to='/foo')="go to foo"
            router-link(to='/bar')="go to bar"
        router-view
</template>

<script>
export default {

}
</script>

<style>

</style>