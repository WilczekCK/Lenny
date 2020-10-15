<template lang="pug">
    .header
      .header__wrapper
        nuxt-link(to="/").header__wrapper__menuItem--logo
          h1!="{{appInfo.name}}"
          h2="{{appInfo.description}}"
        .header__wrapper__menuItem--searchBar
          input(type="text" placeholder="Search category" v-model="categorySearch" @keyup.enter="findCategory()")
        .header__wrapper__menuItem--waitingRoom
          nuxt-link(to="/meme/waiting")
            i(class="far fa-hourglass")
        .header__wrapper__menuItem--accountManagement
          a(v-if="!this.$store.state.isLogged" href="/api/login")
            img(src="~/static/fb_login.png")
          a(class="header__wrapper__menuItem--accountManagement-logged" v-else)
            h3='Hello {{this.$store.state.isLogged.username}}'
            .header__wrapper__menuItem--accountManagement-logged-settings
              nuxt-link(:to="'/users/'+this.$store.state.isLogged.id")
                i(class="fas fa-user")
              a(@click="logout()")
                i(class="fas fa-sign-out-alt" )
        hamburger

</template> 

<script>
import axios from "axios";
import * as config from '../../server/config/index.js';
import _ from 'underscore';
import hamburger from './hamburger.vue';

export default {
  props: ['user'],
  components:{
    config,
    hamburger
  },
  data: function(){
    return {
      appInfo: config.default.app,
      categorySearch: undefined
    }
  },
  methods: {
    logout: async function() {
      this.$emit('checkUserSession', 'logout')
      this.$store.state.isLogged = false;
    },
    findCategory: async function() {
      var {name} = this.$router.history.current.params;
      
      //disable redirecting to the same page!
      if(name === this.categorySearch || _.isEmpty(this.categorySearch) && _.isEmpty(name)){
        return 0;
      }else if(!this.categorySearch ){
        return this.$router.push(`/`)
      }

      this.$router.push(`/meme/cat/${this.categorySearch}`)
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
