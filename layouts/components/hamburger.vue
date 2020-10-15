<template lang="pug">
    .hamburger__menu
      p(@click="slideDown = !slideDown")='HAMBURGER'
        .hamburger__menu__container
          transition(name='slideDown')
            ul(v-if="slideDown")
                li="Waiting room"
                li="Search category"
                li="Login"
</template>

<script>
import Vue from 'vue';
import axios from 'axios';

export default {
  data: function() {
    return {
      slideDown: false,
    }
  },
  mounted: async function () {
  },
  methods: {
   
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
