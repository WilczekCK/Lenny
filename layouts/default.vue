<template lang="pug">
  transition
    .container
      headerComp
      .content
        sidebarComp
        nuxt
</template>

<script>

import header from "./components/header";
import sidebar from "./components/sidebar";
export default {
  transition: {
    name: 'page',
    mode: 'out-in'
  },
  components:{
    headerComp: header,
    sidebarComp: sidebar
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

.container{
  display:flex;
  flex-direction:column;
  }
</style>
