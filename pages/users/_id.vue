<template lang="pug">
.profile__page
  .profile__container(v-if="isPageLoaded")
    .profile__container__header
        .profile__container__header--cover()
        .profile__container__header--avatar
          img(v-if="user.avatar_uploaded == 1" :src='"~/assets/img/avatars/"+user.fb_id+".jpg"')
          img(v-else :src='"~/assets/img/avatars/default.jpg"')
          .avatar_config(v-if="user.fb_id === $store.state.isLogged.id" @click="$store.commit('modalToggle', 'avatar')")
            ="Config"
            addAvatarModal(:modalType="'avatar'" :fb_id="user.fb_id")
            
        .profile__container__header--nickname {{user.username}}
        .profile__container__header--role
          p(v-if="user.role === 1")
            ="Administrator"
          p(v-else-if="user.role === -1")
            ="Banned"
          p(v-else)
            ="User"
        .profile__container__header--joinedDate
            p="Joined: {{moment(user.registered)}}"
    .profile__container__content
        .profile__container__content__stats
            .profile__container__content__stats--uploadedMemes
                ="Uploaded memes: {{user.memes_count}}"
            .profile__container__content__stats--ppSum
                ="Total reach likes: {{user.sum_likes}}"
  .profile__memes__container
    .meme__container
      memeItem(v-for="post in userMemes" :memeDetails="post" :key="post.id")
      no-ssr
        infinite-loading(@infinite="infiniteScroll")
</template>

<script>
import axios from '~/plugins/axios'
import moment from "moment";
import addAvatarModal from '~/layouts/components/modals/modal'
import memeItem from '~/layouts/components/mixins/meme-item.vue'
export default {
  name: 'id',
  components:{
    addAvatarModal,
    memeItem
  },
  data: function() {
    return{
      avatarName: undefined,
      user: null,
      isPageLoaded: false,
      userMemes: [],
      page: 1,
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

    await axios
      .get(`/api/meme/user/${this.$route.params.id}`)
      .then( ( {data} ) => {
        let userMemes = data.data;
        userMemes.forEach((meme) => { this.userMemes.push(meme) })
      })

    this.avatarName = this.user.fb_id;
    this.isPageLoaded = true;
  },
  methods:{
    provideDefaultAvatar(){
      this.avatarName = 'default'
    },
    moment: function(date){
      const today = moment();
      const incomingDate = moment(date);
      return incomingDate.from(today);
    },
     infiniteScroll($state){
      axios({
        url:'/api/meme/load/user',
        method:'GET',
        headers:{
          "page": this.page,
          "loadElements":5,
          "userid": this.$route.params.id
        }
      })
      .then( ( {data} ) => {
        if(data.data.length){
          this.page += 1;

          let memes = data.data;
          memes.forEach((meme) => { this.userMemes.push(meme) })
          $state.loaded();
        }else{
          $state.complete()
        }
      })
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
