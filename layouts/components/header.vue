<template lang="pug">
    .header
      .header__wrapper
        nuxt-link(to="/").header__wrapper__menuItem--logo
          img(src="~/assets/img/logo.png")
          span!="Semes<br>Koa + Nuxt meme template"
        .header__wrapper__menuItem--searchBar
          input(type="text" placeholder="Browse by #tags")
        .header__wrapper__menuItem--accountManagement
          a(href="/api/login" v-if="!this.user")="Login using facebook"
          a(class="header__wrapper__menuItem--accountManagement-logged" v-else)
            h3='Hello {{this.user.username}}'
            .header__wrapper__menuItem--accountManagement-logged-settings
              i(class="fas fa-list")
              i(class="fas fa-user-cog")
              a(@click="logout()")
                i(class="fas fa-sign-out-alt" )

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
