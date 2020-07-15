<template lang="pug">
    .header
      .header__wrapper
        nuxt-link(to="/").header__wrapper__menuItem--logo
          img(src="~/assets/img/logo.png")
          span!="Semes<br>Koa + Nuxt meme template"
        .header__wrapper__menuItem--searchBar
          input(type="text" placeholder="Browse by #tags")
        .header__wrapper__menuItem--accountManagement
          a(v-if="!this.$store.state.isLogged" href="/api/login")="Login using facebook"
          a(class="header__wrapper__menuItem--accountManagement-logged" v-else)
            h3='Hello {{this.$store.state.isLogged.username}}'
            .header__wrapper__menuItem--accountManagement-logged-settings
              i(class="fas fa-list")
              i(class="fas fa-user-cog")
              a(@click="logout()")
                i(class="fas fa-sign-out-alt" )

</template>

<script>
import axios from "axios";
import { mapGetters } from 'vuex'
export default {
  props: ['user'],
  data: function(){
    return {}
  },
  methods: {
    logout: async function() {
      this.$emit('checkUserSession', 'logout')
    }
  }
}
</script>
