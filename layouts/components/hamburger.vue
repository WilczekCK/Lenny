<template lang="pug">
    .hamburger__menu(:class="{active: slideDown}")
      p(@click="slideDown = !slideDown")
        i(class="fas fa-bars")
        .hamburger__menu__container
            transition(name='slideDown')
                ul(v-if="slideDown")
                    li="Waiting room"
                    li
                        input(type="text" placeholder="Search category" v-model="categorySearch" @keyup.enter="findCategory()")
                    li="Login"
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
