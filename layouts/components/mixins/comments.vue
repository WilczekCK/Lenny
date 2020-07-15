<template lang="pug">
    .comment__feature
      .comment__feature--list(v-if="this.comments")
        h3="Comments:"
        .comment__feature--list__comment(v-for="comment in this.comments")
          .comment__avatar
            img(src="~/assets/img/logo.png")
          .comment__content
            .comment__content__socials
              .comment__content__socials--author {{comment.username}}
              .comment__content__socials--date {{moment(comment.date)}}
            .comment__content--text  {{comment.content}}
            .comment__content--removeButton(v-if="$store.state.isLogged.id == comment.fb_id")
              i(class="fa fa-times")
              ="REMOVE YOUR COMMENT"
      .comment__feature--noComments(v-else)
        h3="No comments yet - be first to do it!"
      .comment__feature--newComment(v-if="this.$store.state.isLogged")
        p(v-if="errors.length")
          ul
            li(v-for="error in errors") {{ error }}
        form(@submit.prevent="checkForm")
            input(type="text" v-model="incomingNewComment" placeholder="Your reply to this meme" maxlength="100")
            button(class="post__comment")
                i(class='fas fa-comment')
</template>

<script>
import moment from "moment";
import axios from 'axios'
export default {
  props: ['commentList'],
  data: function() {
    return {
      errors: [],
      incomingNewComment: '',
      comments: this.commentList
    }
  },
  methods: {
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
    sendComment: async function() {
        await axios({
          method: 'post',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'content': this.incomingNewComment,
          },
          url: `/api/meme/comments/post/${this.$route.params.id}`,
        }).then(({data}) => {
          if(data.data == true) return; //tbc - auth must be done first
          //TODO: Display comment while sending a comment
          else this.errors.push('Something went wrong! Try to send your comment later!')
        })
    }
  }
}
</script>
