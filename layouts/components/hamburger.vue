<template lang="pug">
    .hamburger__menu(:class="{active: slideDown}")
      p(@click="slideDown = !slideDown")
        i(class="fas fa-bars")
        .hamburger__menu__container
            transition(name='slideDown')
                ul(v-if="slideDown")
                    li="Waiting room"
                    li
                        a(v-if="!this.$store.state.isLogged" href="/api/login")
                            img(src="~/static/fb_login.png")
                        a(class="header__wrapper__menuItem--accountManagement-logged" v-else)
                            h3='Hello {{this.$store.state.isLogged.username}}'
                            .header__wrapper__menuItem--accountManagement-logged-settings
                                nuxt-link(:to="'/users/'+this.$store.state.isLogged.id")
                                    i(class="fas fa-user")
                                a(@click="logout()")
                                    i(class="fas fa-sign-out-alt" )
                    li
                        input(type="text" placeholder="Search category" v-model="categorySearch" @keyup.enter="findCategory()")
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import _ from 'underscore';
export default {
  data: function() {
    return {
      slideDown: false,
      active: false,
      categorySearch: ''
    }
  },
  mounted: async function () {
  },
  methods: {
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
  transition: {
    name: 'slideDown',
    mode: 'out-in'
  }
}
</script>

<style>
.slideDown-enter,
.slideDown-leave-to {
  transform: scaleY(0.7);
  opacity: 0;
}

.slideDown-enter-to,
.slideDown-leave {
  opacity: 1;
  transform: scaleY(1);
}

.slideDown-enter-active,
.slideDown-leave-active {
  transition: all 0.3s ease-out;
  transform-origin: top center;
}
</style>
