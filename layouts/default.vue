<template lang="pug">
  transition
    .container
      headerComp
      nuxt
</template>

<script>

import header from "./components/header";
export default {
  transition: {
    name: 'page',
    mode: 'out-in'
  },
  components:{
    headerComp: header
  }
}
</script>

<style>
.page-enter-active, .page-leave-active {
 transition: all .30s ease-out;
}
.page-enter, .page-leave-active {
  opacity: 0;
  transform-origin: 50% 50%;
}
</style>
