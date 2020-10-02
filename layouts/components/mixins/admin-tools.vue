<template lang="pug">
    .admin_tools_wrapper
      p(@click="slideDown = !slideDown")='Admin tools'
      transition(name='slideDown')
        .admin_tools_container(v-if="slideDown")
          ul
            li(@click="banUser()")="Ban Author"
            li(@click="removeMeme()")="Remove Meme"
            li(@click="approveMeme()")="Approve meme"
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
  .slideDown-enter-active, .slideDown-leave-active { transition: opacity .5s; }
  .slideDown-enter, .slideDown-leave-active { opacity: 0; }
</style>
