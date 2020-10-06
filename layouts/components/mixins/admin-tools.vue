<template lang="pug">
    .admin_tools_wrapper(v-if="$store.state.isLogged.role === 1")
      p(@click="slideDown = !slideDown")='Admin tools'
        .admin_tools_container
          transition(name='slideDown')
            ul(v-if="slideDown")
              li(@click="banUser()")="Ban Author"
              li(@click="removeMeme()" v-if="whereUsed === 'meme'")="Remove Meme"
              li(@click="removeComment()" v-if="whereUsed === 'comments'")="Remove Comment"
              li(@click="approveMeme()" v-if="whereUsed === 'meme' && info.status === 0")="Approve Meme"
</template>

<script>
import Vue from 'vue';
import axios from 'axios';

export default {
  props: ['whereUsed', 'info'],
  data: function() {
    return {
      slideDown: false,
      showChild: false,
      userTriggered: null,
    }
  },
  mounted: async function () {
  },
  methods: {
    banUser: async function() {
      await axios({
        url: '/api/users/block',
        method: 'PATCH',
        data: {
          user_id: this.info.author_id,
          moderator_id: this.$store.state.isLogged.id
        }
      }).then((response) => {
        if(response.status === 200) this.$toast.success('User banned!')
        else this.$toast.error('Something went wrong, try again later')
      });
    },
    removeMeme: async function () {
      await axios({
        url: `/api/meme/remove/${this.info.id}`,
        method: 'DELETE',
        data: {
          moderator_id: this.$store.state.isLogged.id
        }
      }).then((response) => {
        if(response.status === 200) {
          this.$emit('adminRemoveMeme');
          return this.$toast.success('Meme removed!')
        }
        else this.$toast.error('Something went wrong, try again later')
      });
    },
    removeComment: async function () {
      return this.$emit('adminRemoveComment');
    },
    approveMeme: async function () {
      await axios({
        url: `/api/meme/approve/${this.info.id}`,
        method: 'PATCH',
        data: {
          moderator_id: this.$store.state.isLogged.id
        }
      }).then((response) => {
        if(response.status === 200) this.$toast.success('Meme approved!')
        else this.$toast.error('Something went wrong, try again later')
      });
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
