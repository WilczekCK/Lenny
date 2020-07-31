<template lang="pug">
.profile__container(v-if="isPageLoaded")
  .profile__container__header
      .profile__container__header--cover()
      .profile__container__header--avatar
        img(v-if="user.avatar_uploaded == 1" :src='"~/assets/img/avatars/"+user.fb_id+".jpg"')
        img(v-else :src='"~/assets/img/avatars/default.jpg"')
      .profile__container__header--nickname {{user.username}}
      .profile__container__header--role
        p(v-if="user.role === 1")
          ="Administrator"
        p(v-else-if="user.role === -1")
          ="Banned"
        p(v-else)
          ="User"
      .profile__container__header--joinedDate
          p="since: {{user.registered}}"
  .profile__container__content
      .profile__container__content__stats
          .profile__container__content__stats--uploadedMemes
              ="Uploaded memes: {{user.memes_count}}"
          .profile__container__content__stats--ppSum
              ="Total reach likes: {{user.sum_likes}}"
</template>

<script>
import axios from '~/plugins/axios'

export default {
  name: 'id',
  data: function() {
    return{
      avatarName: undefined,
      user: null,
      isPageLoaded: false,
    }
  },
  async mounted() {
       await axios
            .get(`/api/users/${this.$route.params.id}`)
            .then(async ({data}) => {
                this.user = data.data;
            })
            .catch(() => {
                this.$nuxt.error({ statusCode: 404, message: 'No user found!'})
            })

        this.avatarName = this.user.fb_id;
        this.isPageLoaded = true;
  },
  methods:{
    provideDefaultAvatar(){
      this.avatarName = 'default'
    }
  },
  head () {
    return {

    }
  }
}
</script>

<style scoped>
.title
{
  margin-top: 30px;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
  margin-top: 10px;
}
.button
{
  margin-top: 30px;
}
</style>
