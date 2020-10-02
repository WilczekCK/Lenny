<template lang="pug">
    .admin_tools_wrapper
      p(@click="slideDown = !slideDown")='Admin tools'
        .admin_tools_container
          transition(name='slideDown')
            ul(v-if="slideDown")
              li(@click="banUser()")="Ban Author"
              li(@click="removeMeme()")="Remove Meme"
              li(@click="removeComment()")="Remove Comment"
              li(@click="approveMeme()")="Approve Meme"
</template>

<script>
import Vue from 'vue';
export default {
  data: function() {
    return {
      slideDown: false,
    }
  },
  mounted: async function () {
  },
  methods: {
    banUser: async function () {

    },
    removeMeme: async function () {

    },
    removeComment: async function () {

    },
    approveMeme: async function () {

    },
    slideDownMenu: async function () {

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
