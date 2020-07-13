<template lang="pug">
    .header
      .header__wrapper
        nuxt-link(to="/").header__wrapper__menuItem--logo
          img(src="~/assets/img/logo.png")
          span!="Semes<br>Koa + Nuxt meme template"
        .header__wrapper__menuItem--searchBar
          input(type="text" placeholder="Browse by #tags")
          a(href="/api/login" v-if="!this.user").header__wrapper__menuItem--accountManagement="Login using facebook"
          a(v-else)
            h6="LOGGED!"
            h6(@click="logout()")="logout"

</template>

<script>
import axios from "axios";

export default {
  props: ['user'],
  data: function(){
    return {}
  },
  async mounted() {
  },
  methods: {
    logout: async function() {
      this.$emit('checkUserSession', 'logout')
    }
  }
}
</script>
