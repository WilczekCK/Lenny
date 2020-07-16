<template lang="pug">
  transition
    .container
      headerComp(:user="userLogged" v-on:checkUserSession="checkUserSessionStatus")
      .content
        sidebarComp
        nuxt(:user="userLogged")

        addMemeModal(:modalStatus="this.modalState" v-on:childStatusChanged="modalTrigger")
        button(id="show-modal" @click="modalTrigger();")
</template>

<script>
import header from "./components/header";
import sidebar from "./components/sidebar";
import memeModal from "./components/modals/addMeme";
import axios from "axios";
export default {
  transition: {
    name: 'page',
    mode: 'out-in'
  },
  components:{
    headerComp: header,
    sidebarComp: sidebar,
    addMemeModal: memeModal
  },
  data: function() {
    return {
      userLogged: null,
      modalState: false
    }
  },
  mounted: function(){
     this.$store.commit('login')
  },
  methods: {
    modalTrigger: function(){
      this.modalState = !this.modalState;
    },
    checkUserSessionStatus: async function(reply){
      switch (reply){
        case 'status':
          this.$store.commit('login')
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
