<template lang="pug">
  transition
    .container
      headerComp(:user="userLogged" v-on:checkUserSession="checkUserSessionStatus")
      .content
        sidebarComp
        nuxt(:user="userLogged")

        .addMemeModal(v-if="$store.state.isLogged")
          addMemeModal
          button(id="show-modal" @click="$store.commit('modalToggle', 'meme')")
            i(class="fas fa-plus")
            ='Add meme'
</template>

<script>
import header from "./components/header";
import sidebar from "./components/sidebar";
import memeModal from "./components/modals/modal";
export default {
  head: {
    meta: [
      { property: "og:image", content: `${process.env.baseUrl}/og-image.png`}
    ],
  },
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
    }
  },
  mounted: function(){
     this.$store.commit('login')
  },
  methods: {
    checkUserSessionStatus: async function(reply){
      switch (reply){
        case 'status':
          this.$store.commit('login')
          break;
        case 'logout':
          await this.$axios
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
