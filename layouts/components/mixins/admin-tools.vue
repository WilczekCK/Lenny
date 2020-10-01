<template lang="pug">
    .admin_tools_wrapper
      .admin_tools_container
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

    }
  }
}
</script>
