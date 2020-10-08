<template lang="pug">
    .header
      .header__wrapper
        nuxt-link(to="/").header__wrapper__menuItem--logo
          h1!="{{appInfo.name}}"
          h2="{{appInfo.description}}"
        .header__wrapper__menuItem--searchBar
          input(type="text" placeholder="Browse by #tags")
        .header__wrapper__menuItem--accountManagement
          a(v-if="!this.$store.state.isLogged" href="/api/login")
            img(src="~/static/fb_login.png")
          a(class="header__wrapper__menuItem--accountManagement-logged" v-else)
            h3='Hello {{this.$store.state.isLogged.username}}'
            .header__wrapper__menuItem--accountManagement-logged-settings
              nuxt-link(to=`/meme/waiting`)
                i(class="fas fa-user-clock")
              nuxt-link(:to="'/users/'+this.$store.state.isLogged.id")
                i(class="fas fa-user")
              a(@click="logout()")
                i(class="fas fa-sign-out-alt" )

</template> 

<script>
import axios from "axios";
import * as config from '../../server/config/index.js';
import { mapGetters } from 'vuex'
export default {
  props: ['user'],
  components:{
    config
  },
  data: function(){
    return {
      appInfo: config.default.app
    }
  },
  methods: {
    logout: async function() {
      this.$emit('checkUserSession', 'logout')
    }
  },
}
</script>

<style>
.header__wrapper__menuItem--logo h1::before{
  content:'( ͡° ͜ʖ ͡°)';
  position:relative;
  left:0;
  padding-right:10px;
}

</style>
