<template lang="pug">
    .comment__feature
      .comment__feature--list(v-if="this.comments")
        h3="Comments:"
        .comment__feature--list__comment(v-for="comment in this.comments" :key="comment.id")
          .comment__avatar
            img(:src="checkAvatar(comment.fb_id)")
          .comment__content
            .comment__content__socials
              .comment__content__socials--author 
                span
                  nuxt-link(:to="'/users/'+comment.fb_id") {{comment.username}}
              .comment__content__socials--date {{moment(comment.date)}}
              admin-tools(:whereUsed="'comments'" :info="comment" v-on:adminRemoveComment="removeComment($store.state.isLogged.id, comment.id)")
            .comment__content--text  {{comment.content}}
            .comment__content--removeButton(@click="removeComment($store.state.isLogged.id, comment.id)" v-if="$store.state.isLogged.id == comment.fb_id")
              i(class="fa fa-times")
              ="REMOVE YOUR COMMENT"
      .comment__feature--noComments(v-else)
        h3="No comments yet"
      .comment__feature--newComment(v-if="this.$store.state.isLogged")
        p(v-if="errors.length")
          ul
            li(v-for="error in errors") {{ error }}
        form(@submit.prevent="checkForm")
            input(type="text" v-model="incomingNewComment" placeholder="Your reply to this meme" maxlength="100")
            button(class="post__comment")
                i(class='fas fa-comment')
      .comment__feature--newComment(v-else)
        p="Please login to post comments! :)"
</template>

<script>
import moment from "moment";
import admintools from './admin-tools.vue';
export default {
  data: function() {
    return {
      errors: [],
      incomingNewComment: '',
      comments: null,
      commentsAmount: 0,
    }
  },
  components: {
    'admin-tools': admintools
  },
  mounted: async function () {
    await this.loadComments();
  },
  watch: {
    commentsAmount: async function(){
      await this.loadComments();
    }
  },
  methods: {
    checkAvatar: function(id){
      try{
        return require(`~/assets/img/avatars/${id}.jpg`);
      }catch(err){
        return require(`~/assets/img/avatars/default.jpg`);
      }
    },
    moment: function(date){
        const today = moment();
        const incomingDate = moment(date);
        return " · "+incomingDate.from(today);
    },
    checkForm: function(e){
      this.errors = [];

      if(this.incomingNewComment.length < 1){
        this.errors.push('Missing comment content!')
      }else{
        this.sendComment();
      }

      e.preventDefault();
    },
    loadComments: async function(){
      await this.$axios
        .get(`/api/meme/comments/load/${this.$route.params.id}`)
        .then(({data}) => {
            if(data.data.length) this.comments = [];
            data.data.forEach(comment => {
                this.commentsAmount++;
                this.comments.push(comment)
            }) 
        })
      .catch((error) => {
         console.log(error)
         this.errors.push('Something went wrong! Comments not found!')
      })
    },
    sendComment: async function() {
        await this.$axios({
          method: 'post',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'content': this.incomingNewComment,
          },
          url: `/api/meme/comments/post/${this.$route.params.id}`,
        }).then(({data}) => {
          if(data.data == true) {
            this.incomingNewComment = ''
            return this.commentsAmount++
          }else{
            this.errors.push('Something went wrong! Try to send your comment later!')
          }
        })
    },
    removeComment: async function(getLoggedUserID, commentID) {
        await this.$axios({
          method: 'delete',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'loggedUserID': getLoggedUserID,
            'commentid': commentID
          },
          url: `/api/meme/comments/remove/${this.$route.params.id}`,
        }).then(({data}) => {
          if(data.data == true) {
            this.$toast.success('Comment removed!')
            return this.commentsAmount--
          };
          
          this.errors.push('Something went wrong! Try to remove your comment later!')
        })
    }
  }
}
</script>
