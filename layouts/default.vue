<template lang="pug">
  transition
    .container
      headerComp(:user="userLogged" v-on:checkUserSession="checkUserSessionStatus")
      .content
        sidebarComp
        nuxt(:user="userLogged")
</template>

<script>

import header from "./components/header";
import sidebar from "./components/sidebar";
import axios from "axios";

export default {
  transition: {
    name: 'page',
    mode: 'out-in'
  },
  components:{
    headerComp: header,
    sidebarComp: sidebar
  },
  data: function() {
    return {
      userLogged: null
    }
  },
  mounted: function(){
    this.checkUserSessionStatus('status')
  },
  methods: {
    checkUserSessionStatus: async function(reply){
      switch (reply){
        case 'status':
          await axios
            .get(`/api/auth/check`)
            .then(async ({data}) => {
              this.userLogged = data.data;
            })
          break;
        case 'logout':
          await axios
            .get(`/api/auth/logout`)
            .then(async (_) => {
              this.checkUserSessionStatus('status')
            })
      }
    }
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
